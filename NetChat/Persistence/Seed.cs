using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "1",
                        UserName="cjzilman",
                        Email="christianzilman@gmail.com",
                    },
                    new AppUser
                    {
                        Id="2",
                        UserName="julio",
                        Email="julio@gmail.com",
                    },
                    new AppUser
                    {
                        Id="3",
                        UserName="christian",
                        Email="christian@gmail.com",
                    }
                };

                foreach(var user in users)
                {
                    await userManager.CreateAsync(user, "Testeo123@");
                }
            }
        }
    }
}