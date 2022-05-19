using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<UserDTO>
        {
            public string Email { get; set; }
            public string UserName { get; set; }
            public string Password { get; set; }    
            public string Avatar { get; set; }        
        }

        
        public class CommandValidator : AbstractValidator<Command>
        {
            private readonly UserManager<AppUser> _userManager;

            public CommandValidator(UserManager<AppUser> userManager)
            {
                _userManager = userManager;

                RuleFor(x => x.UserName)
                    .NotEmpty()
                    .MustAsync(async (username, cancellation) => 
                        (await _userManager.FindByNameAsync(username) == null)).WithMessage("Username already exists");

                RuleFor(x => x.Email)
                    .NotEmpty()
                    .EmailAddress()
                    .MustAsync(async (email, cancellation) => 
                        (await _userManager.FindByEmailAsync(email) == null)).WithMessage("Email already exists");

                RuleFor(x => x.Password).Password();                
            }
        }

        public class Handler : IRequestHandler<Command, UserDTO>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<UserDTO> Handle(Command request, CancellationToken cancellationToken)
            {
                // if(await _userManager.FindByEmailAsync(request.Email) != null)
                // {
                //     throw new RestException(System.Net.HttpStatusCode.BadRequest, new { Email = "Email already exists"});
                // }

                // lo pasamos a fluen validation
                // if(await _userManager.FindByNameAsync(request.UserName) != null)
                // {
                //     throw new RestException(System.Net.HttpStatusCode.BadRequest, new { UserName = "UserName already exists"});
                // }

                var user = new AppUser
                {
                    Email = request.Email,
                    UserName = request.UserName,
                    Avatar = request.Avatar,
                };


                var result = await _userManager.CreateAsync(user, request.Password);

                if(result.Succeeded)
                {
                    return new UserDTO
                    {
                        UserName = user.UserName,
                        Email = user.Email,
                        Token = _jwtGenerator.CreateToken(user),
                        Avatar = user.Avatar,
                    };
                }

                throw new System.Exception("Error registering user");
            }
        }
    }
}