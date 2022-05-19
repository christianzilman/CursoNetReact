using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Channels
{
    public class List
    {
        
        public class Query : IRequest<List<Channel>>
        {
            public ChannelType ChannelType { get; set; } = ChannelType.Channel;
        }

        public class Handler : IRequestHandler<Query, List<Channel>>
        {
            private DataContext _dataContext;
            private readonly ILogger<List> _logger;

            public Handler(DataContext context, ILogger<List> logger)
            {
                _dataContext = context;
                _logger = logger;
            }
            public async Task<List<Channel>> Handle(Query request, CancellationToken cancellationToken)
            {

                //throw new System.Exception("SERVER ERROR");
                //throw new RestException(System.Net.HttpStatusCode.NotFound, new { channel = "Not Found" });
                return await _dataContext.Channels.Where(x => x.ChannelType == request.ChannelType).ToListAsync();
            }
        }
    }
}