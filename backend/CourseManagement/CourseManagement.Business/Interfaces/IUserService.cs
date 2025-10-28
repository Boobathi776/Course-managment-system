using CourseManagement.Business.Dto.RequestDto;
using CourseManagement.Business.Dto.ResponseDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Business.Interfaces
{
    public interface IUserService
    {
        Task<GenericResponseDto<UserDto>> GetUserByGuid(Guid id);
        Task<IEnumerable<UserDto>> GetAllUsers();
        Task<GenericResponseDto<UserDto>> UpdateUserAsync(UpdateUserDto user);
        Task<GenericResponseDto<Guid>> DeletUserAsync(Guid userId);
    }
}
