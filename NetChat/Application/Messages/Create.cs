using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Messages
{
    public class Create
    {
        public class Command : IRequest<MessageDTO>
        {
            public string Content { get; set; }
            public Guid ChannelId { get; set; }
            public MessageType MessageType { get; set; } = MessageType.Text;

            public IFormFile File { get; set; }
        }


        public class Handler : IRequestHandler<Command, MessageDTO>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMediaUpload _mediaUpload;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor,
            IMapper mapper,
            IMediaUpload mediaUpload)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
                _mediaUpload = mediaUpload;
            }
            

            public async Task<MessageDTO> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .SingleOrDefaultAsync(x=> x.UserName ==  _userAccessor.GetCurrentUserName());

                var channel = await _context.Channels
                        .SingleOrDefaultAsync(x => x.Id == request.ChannelId);

                if(channel == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, new { channel = "Channel not found" });                    
                }

                var message = new Message
                {
                    Content = request.MessageType == MessageType.Text ? request.Content : 
                        _mediaUpload.UploadMedia(request.File).Url,
                    Channel = channel,
                    Sender = user,
                    CreatedAt = DateTime.Now,
                    MessageType = request.MessageType,                    
                };

                _context.Messages.Add(message);

                if(await _context.SaveChangesAsync() > 0)
                {
                    return new MessageDTO
                    {
                        Sender = new User.UserDTO
                        {
                            UserName = user.UserName,
                            Avatar = user.Avatar,
                        },
                        Content = message.Content,
                        CreatedAt = message.CreatedAt,
                        MessageType = message.MessageType,
                        ChannelId = request.ChannelId,
                    };
                }

                throw new Exception("Thre was a problem inserting the message");
            }
        }
    }
}