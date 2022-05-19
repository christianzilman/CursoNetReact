using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class List
    {
        public class Query : IRequest<List<UserDTO>>
        {
            
        }

        public class Handler : IRequestHandler<Query, List<UserDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<UserDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _context.Users.ToListAsync();

                var userToReturn = _mapper.Map<IEnumerable<AppUser>, List<UserDTO>>(users);

                return userToReturn;
            }
        }
    }
}