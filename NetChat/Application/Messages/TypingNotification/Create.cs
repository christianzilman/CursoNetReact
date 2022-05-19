using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Messages.TypingNotification
{
    public class Create
    {
        public class Command : IRequest<TypingNotificationDTO>
        {
            public Guid ChannelId { get; set; }
            
        }

        public class Handler : IRequestHandler<Command, TypingNotificationDTO>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<TypingNotificationDTO> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                var channel = await _context.Channels.SingleOrDefaultAsync(x => x.Id == request.ChannelId);

                if(channel == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound, new { channel= "Channel not found" });

                var typing = new Domain.TypingNotification 
                {
                    Channel = channel,
                    Sender = user,
                };


                var typingSaving = await _context.TypingNotifications.FirstOrDefaultAsync((x) => x.Sender.Id == user.Id && x.ChannelId == channel.Id);

                if(typingSaving != null){

                    return _mapper.Map<Domain.TypingNotification, TypingNotificationDTO>(typingSaving);
                }


                _context.TypingNotifications.Add(typing);
                
                if(await _context.SaveChangesAsync() > 0)
                {
                    return _mapper.Map<Domain.TypingNotification, TypingNotificationDTO>(typing);
                }

                throw new Exception("There was an error saving data");
            }
        }
    }
}