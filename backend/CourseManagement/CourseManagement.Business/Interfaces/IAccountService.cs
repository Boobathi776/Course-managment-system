using CourseManagement.Business.Dto.RequestDto;
using CourseManagement.Business.Dto.ResponseDto;
using CourseManagement.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Business.Interfaces
{
    public interface IAccountService
    {
        Task<GenericResponseDto<RegisteredUserDto>> RegisterNewUserAsync(RegisterUserDto newUser);
        Task<GenericResponseDto<TokenDto>> LoginUserAsync(LoginDto loginCredentials);
        Task<GenericResponseDto<TokenDto>> RefreshTheTokenAsync(string refreshToken);
    }
}
