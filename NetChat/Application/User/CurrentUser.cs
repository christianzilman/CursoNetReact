using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query: IRequest<UserDTO>
        {
            
        }


        public class Handler : IRequestHandler<Query, UserDTO>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(IUserAccessor userAccessor, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _userAccessor = userAccessor;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<UserDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var userName = _userAccessor.GetCurrentUserName();

                if(string.IsNullOrEmpty( userName))
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, new {CurrectUser = "No existe ningun user"});


                var user = await _userManager.FindByNameAsync(userName);

                return new UserDTO
                {
                    Email = user.Email,
                    UserName = user.UserName,
                    Token = _jwtGenerator.CreateToken(user),
                    Id = user.Id,
                    Avatar = user.Avatar,
                    PrimaryAppColor = user.PrimaryAppColor,
                    SecondaryAppColor = user.SecondaryAppColor,
                };
            }
        }
    }
}