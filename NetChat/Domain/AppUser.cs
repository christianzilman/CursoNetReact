using System.Collections.Generic;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser: IdentityUser
    {        
        public string Avatar { get; set; }

//virtual
        [JsonIgnore]
        public ICollection<Message> Messages { get; set; }

        public bool IsOnline { get; set; }

        [JsonIgnore]

        public TypingNotification TypingNotification { get; set; }

        public string PrimaryAppColor { get; set; }

        public string SecondaryAppColor { get; set; }

    }
}