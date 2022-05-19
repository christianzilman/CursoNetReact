using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Channels
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }   
            public ChannelType ChannelType {get;set;} = ChannelType.Channel;
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var channel = new Channel
                {
                    Id = request.Id,
                    Name = request.Name,
                    Description = request.Description,   
                    ChannelType = request.ChannelType,                
                };

                _dataContext.Channels.Add(channel);
                var success = await _dataContext.SaveChangesAsync() > 0;

                if(success)
                    return Unit.Value;

                throw new Exception("Ocurrió un problema al guardar los datos de channel");
            }
        }
    }
}