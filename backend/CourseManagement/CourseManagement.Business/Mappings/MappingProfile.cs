using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CourseManagement.Business.constants;
using CourseManagement.Business.Dto.RequestDto;
using CourseManagement.Business.Dto.ResponseDto;
using CourseManagement.DataAccess.Models;

namespace CourseManagement.Business.Mappings
{
    public class MappingProfile :Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterUserDto,User>().ForMember(des=>des.RoleId , opt => opt.MapFrom(src =>src.IsAdmin ? (int)Roles.Admin : (int)Roles.User ));
            CreateMap<User, UserDto>()
                .ForMember(des=>des.IsAdmin , opt=>opt.MapFrom(src=>src.RoleId == (int)Roles.Admin ? true : false)).ReverseMap();

            CreateMap<UpdateUserDto, User>();
        }
    }
}
