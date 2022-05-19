

using Application.Channels;
using Application.User;

namespace Application.Messages.TypingNotification
{
    public class TypingNotificationDTO
    {            
        public UserDTO Sender { get; set; }
        public ChannelDTO Channel { get; set; }
    }
}