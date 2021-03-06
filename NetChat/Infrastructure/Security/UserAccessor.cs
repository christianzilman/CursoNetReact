using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public string GetCurrentUserName()
        {
            var userName = _httpContextAccessor.HttpContext
                .User?
                .Claims?
                .FirstOrDefault(x => x.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?
                .Value;

            return userName??string.Empty;
        }
    }
}