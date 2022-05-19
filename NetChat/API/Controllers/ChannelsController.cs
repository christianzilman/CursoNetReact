using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Channels;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ChannelsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Channel>>> List([FromQuery] List.Query query)
        {
                Console.WriteLine("get channel");
                return await Mediator.Send(query);
        }

        [HttpGet("{id}")]
        //[Authorize] // protegemos un endpoint en especifico
        public async Task<ActionResult<Channel>> Details(Guid id)
        {
            Console.WriteLine($"Get By Id {id}");
            var channel = await Mediator.Send(new Details.Query
            {
                Id = id,
            });

            return Ok(channel);
        }


        // es opcional [FromBody]
        [HttpPost]
        public async Task<Unit> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("private/{id}")]
        public async Task<ActionResult<ChannelDTO>> PrivateDatails(string id)
        {
            return await Mediator.Send(new PrivateChannelDetails.Query { UserId = id });
        }

        [HttpPut("{id}")]
        public async Task<Unit> Update(Guid id,Edit.Command command)
        {   
            command.Id = id;
            return await Mediator.Send(command);
        }


        // [HttpGet]
        // public IActionResult Get()
        // {
        //     var channels = new string[] 
        //     {
        //         ".NetCore",
        //         "ReactJs",
        //         "Angular",
        //     };

        //     return Ok(channels);
        // }


        // [HttpGet("{id}")]
        // public IActionResult Get(int id)
        // {
        //     return Ok(".NetCore");
        // }


    }
}