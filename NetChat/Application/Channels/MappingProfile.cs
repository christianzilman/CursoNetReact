using Domain;
using AutoMapper;

namespace Application.Channels
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Channel, ChannelDTO>();
        }
    }
}