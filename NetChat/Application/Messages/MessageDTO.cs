using System;
using Domain;

namespace Application.Messages
{
    public class MessageDTO
    {
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public Application.User.UserDTO Sender { get; set; }
        public MessageType MessageType { get; set; }

        public Guid ChannelId { get; set; }
    }
}