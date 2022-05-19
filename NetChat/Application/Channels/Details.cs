using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;

namespace Application.Channels
{
    public class Details
    {
        
        public class Query : IRequest<ChannelDTO>
        {
            public Guid Id { get; set; }
        }
     
        public class Handler : IRequestHandler<Query, ChannelDTO>
        {
            private DataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _dataContext = context;
                _mapper = mapper;
            }
            public async Task<ChannelDTO> Handle(Query request, CancellationToken cancellationToken)
            {

                var channel = await _dataContext.Channels
                                        .Include(x => x.Messages) //.OrderBy(p => p.CreatedAt))
                                            .ThenInclude(x => x.Sender)
                                        .FirstOrDefaultAsync(o => o.Id == request.Id);

                if(channel == null)
                    throw new RestException(HttpStatusCode.NotFound, new { channel = "Not Found"});
                
                Console.WriteLine("Cantidad mensajes "+ channel.Messages.Count());

                var channelDTO = _mapper.Map<Channel, ChannelDTO>(channel);

                Console.WriteLine("Cantidad mensajes "+ channelDTO.Messages.Count());

                return channelDTO;
            }
        }
    }
}