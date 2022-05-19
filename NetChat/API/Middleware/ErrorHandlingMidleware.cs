using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ErrorHandlingMidleware
    {
        public ErrorHandlingMidleware(RequestDelegate next, ILogger<ErrorHandlingMidleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        private RequestDelegate _next { get; }
        private ILogger<ErrorHandlingMidleware> _logger { get; }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }catch(Exception ex)
            {                
               await HanleExceptionAsync(context, ex, _logger);
            }

        }

        private async Task HanleExceptionAsync(HttpContext context, Exception ex, ILogger<ErrorHandlingMidleware> logger)
        {
            object errors = null;

            switch (ex)
            {
                case Application.Errors.RestException re:
                        logger.LogError(ex, "REST Error");   
                        errors = re.Errors;
                        context.Response.StatusCode = (int) re.Code;
                    break;
                case Exception e: 
                        logger.LogError(ex, "Server Error");
                        errors = string.IsNullOrEmpty(e.Message) ? "Error" : e.Message;
                        context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                    break;

            }

            context.Response.ContentType = "application/json";

            if(errors != null)
            {
                var result = JsonSerializer.Serialize(new { errors });
                await context.Response.WriteAsync(result);
            }
        }
    }
}