using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Middleware;
using API.SignalR;
using Application.Interfaces;
using Domain;
using FluentValidation.AspNetCore;
using Infrastructure.MediaUpload;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services
                .AddControllers(opt => 
                {
                    var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();

                    opt.Filters.Add(new AuthorizeFilter(policy));
                })
                .AddFluentValidation(cfg => 
                {
                    cfg.RegisterValidatorsFromAssemblyContaining<Application.Channels.Create>();
                });
                

            services.AddDbContext<DataContext>(x => 
            {
                //x.UseLazyLoadingProxies();  no usaremos en nuestro caso
                x.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            services.AddCors(opt => 
            {
                opt.AddPolicy("CorsPolicy",
                    policy => 
                    {
                        policy
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                    });
            });

            //con que declaremos un servicio de handler que se realiza ya despues al resto lo va a reconocer
            services.AddMediatR(typeof(Application.Channels.List.Handler).Assembly);

            var builder = services.AddIdentityCore<AppUser>();

            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);

            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();      

            
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(
                    opt => 
                    {
                        //cambiamos el compartamientos que esta por default
                        opt.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true, // validamos que nuestro token este firmado
                            IssuerSigningKey = key,
                            ValidateAudience = false, // validacion por donde viene el token, por ahora no lo usamos
                            ValidateIssuer = false, //
                        };

                        opt.Events =
                        new JwtBearerEvents {
                            OnMessageReceived =
                                context =>
                                {
                                    var accessToken =
                                        context.Request.Query["access_token"];

                                    var path = context.HttpContext.Request.Path;

                                    if (
                                        !string.IsNullOrEmpty(accessToken) &&
                                        path.StartsWithSegments("/chat")
                                    )
                                    {
                                        context.Token = accessToken;
                                    }

                                    return Task.CompletedTask;
                                }
                        };
                    }
                );

            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();

            services.AddAutoMapper(typeof (Application.Channels.Details));

            services.Configure<CloudinarySettings>(Configuration.GetSection("Cloudinary"));

            services.AddScoped<IMediaUpload, MediaUpload>();

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMidleware>();


            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage(); usaremos el nuestro
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
            });
        }
    }
}
