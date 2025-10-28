using AutoMapper;
using CourseManagement.Business.constants;
using CourseManagement.Business.Dto.RequestDto;
using CourseManagement.Business.Dto.ResponseDto;
using CourseManagement.Business.Interfaces;
using CourseManagement.DataAccess.Interfaces;
using CourseManagement.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Business.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserService(IUserRepository userRepository,IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<GenericResponseDto<UserDto>> GetUserByGuid(Guid id)
        {
            var user =  await _userRepository.GetUserByGuid(id);
            if (user == null) 
            {
                return new GenericResponseDto<UserDto>
                {
                    StatusCode = HttpStatusCode.NotFound.GetHashCode(),
                    Success = false,
                    Message = "No user data found",
                    Data = null
                };
            }
            else
            {
                var mappedUser = _mapper.Map<UserDto>(user);
                return new GenericResponseDto<UserDto>
                {
                    StatusCode = HttpStatusCode.OK.GetHashCode(),
                    Success = true,
                    Message = "User data found successfully",
                    Data = mappedUser
                };
            }
        }
        public async Task<IEnumerable<UserDto>> GetAllUsers()
        {
            var users = await _userRepository.GetAllAsync();
            var mappedUsers = _mapper.Map<IEnumerable<UserDto>>(users);
            return mappedUsers;
        }

        public async Task<GenericResponseDto<UserDto>> UpdateUserAsync(UpdateUserDto user)
        {
            var matchedUser = await _userRepository.GetUserByGuid(user.Id);

            if (matchedUser != null)
            {
                matchedUser.Name = user.Name;
                matchedUser.Email = user.Email;
                matchedUser.DateOfBirth = user.DateOfBirth;
                matchedUser.RoleId = user.IsAdmin ? (int)Roles.Admin : (int)Roles.User;
                matchedUser.IsActive = user.IsActive;

                var updatedUser = await _userRepository.UpdateUser(matchedUser);

                if (updatedUser == null)
                {
                    return new GenericResponseDto<UserDto>
                    {
                        StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                        Success = false,
                        Message = "Unable to update the user",
                        Data = null
                    };
                } 
                else
                {
                    var responseUser = _mapper.Map<UserDto>(updatedUser);
                    return new GenericResponseDto<UserDto>
                    {
                        StatusCode = HttpStatusCode.OK.GetHashCode(),
                        Success = true,
                        Message = "User updated successfully",
                        Data = responseUser
                    };
                }
                    
            }
            else
            {
                return new GenericResponseDto<UserDto>
                {
                    StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                    Success = false,
                    Message = "Invalid user Id",
                    Data = null
                };
            }
        }

        public async Task<GenericResponseDto<Guid>> DeletUserAsync(Guid userId)
        {
            var deletedUserId = await _userRepository.DeleteUserAsync(userId);
            if (deletedUserId != Guid.Empty)
            {
                return new GenericResponseDto<Guid>
                {
                    StatusCode = HttpStatusCode.OK.GetHashCode(),
                    Success = true,
                    Message = "User deleted successfully",
                    Data = deletedUserId
                };
            }
            else
            {
                return new GenericResponseDto<Guid>
                {
                    StatusCode = HttpStatusCode.NotFound.GetHashCode(),
                    Success = false,
                    Message = "Unable to delete the user",
                    Data = Guid.Empty
                };
            }
        }
    }
}
