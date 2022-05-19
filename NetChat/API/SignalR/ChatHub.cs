using Microsoft.AspNetCore.SignalR;
using Application.Messages;
using System.Threading.Tasks;
using MediatR;
using System;

namespace API.SignalR
{
    public class ChatHub: Hub
    {
        private readonly IMediator _mediator;

        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendMessage(Create.Command command)
        {

            var message = await _mediator.Send(command);

            await Clients.All.SendAsync("ReceiveMessage", message);
        }

        public async Task SendTypingNotification(Application.Messages.TypingNotification.Create.Command command)
        {

            var typing = await _mediator.Send(command);

            await Clients.All.SendAsync("ReceiveTypingNotification", typing);
        }

        public async Task DeleteTypingNotification()
        {
            var typing = await _mediator.Send(new Application.Messages.TypingNotification.Delete.Command());

            await Clients.All.SendAsync("ReceiveDeleteTypingNotification", typing);
        }
    }
}