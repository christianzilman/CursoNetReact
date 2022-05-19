using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Messages.TypingNotification
{
    public class Delete
    {
        public class Command : IRequest<TypingNotificationDTO> { }

        public class Handler : IRequestHandler<Command, TypingNotificationDTO>
        {
            private readonly DataContext _context;

            private readonly IUserAccessor _userAccessor;

            private readonly IMapper _mapper;

            public Handler(
                DataContext context,
                IUserAccessor userAccessor,
                IMapper mapper
            )
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<TypingNotificationDTO>
            Handle(Command request, CancellationToken cancellationToken)
            {
                var user =
                    await _context
                        .Users
                        .SingleOrDefaultAsync(x =>
                            x.UserName == _userAccessor.GetCurrentUserName());

                var typing =
                    await _context.TypingNotifications.FindAsync(user.Id);

                if (typing == null) return null;

                _context.Remove (typing);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    return _mapper
                        .Map
                        <Domain.TypingNotification, TypingNotificationDTO
                        >(typing);
                }
                throw new Exception("There was an error saving data");
            }
        }
    }
}