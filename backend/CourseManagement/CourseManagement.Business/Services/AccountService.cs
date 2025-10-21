using AutoMapper;
using CourseManagement.Business.Dto.RequestDto;
using CourseManagement.Business.Dto.ResponseDto;
using CourseManagement.Business.Interfaces;
using CourseManagement.DataAccess.Interfaces;
using CourseManagement.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Business.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly JwtTokenService jwtTokenService;
        public AccountService(IUserRepository userRepository,IMapper mapper, JwtTokenService jwtTokenService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            this.jwtTokenService = jwtTokenService;
        }

        public async Task<GenericResponseDto<RegisteredUserDto>> RegisterNewUserAsync(RegisterUserDto newUser)
        {
            try
            {
                if (await _userRepository.IsAlreadyExistingMailIdAsync(newUser.Email))
                {
                    return new GenericResponseDto<RegisteredUserDto>
                    {
                        StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                        Success = false,
                        Message = "Invalid Email id entered",
                        Data = null
                    };
                }
                else
                {
                    var actualUser = _mapper.Map<User>(newUser);
                    var storedUser = await _userRepository.AddAsync(actualUser);
                    var responseUser = _mapper.Map<RegisteredUserDto>(storedUser);
                    return new GenericResponseDto<RegisteredUserDto>
                    {
                        StatusCode = HttpStatusCode.OK.GetHashCode(),
                        Success = true,
                        Message = "Successfully registered",
                        Data = responseUser
                    };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new GenericResponseDto<RegisteredUserDto>
                {
                    StatusCode = HttpStatusCode.InternalServerError.GetHashCode(),
                    Success = false,
                    Message = "Something went wrong",
                    Data = null
                };
            }
        }

        public async Task<GenericResponseDto<TokenDto>> LoginUserAsync(LoginDto loginCredentials)
        {
            try
            {
                var user = await _userRepository.GetUserByEmailAsync(loginCredentials.Email);
                if(user!=null && user.Role!=null)
                {
                    var accessToken = jwtTokenService.GenerateToken(user.Id, user.Name, user.Email, user.Role.RoleName, true);
                    var refreshToken = jwtTokenService.GenerateToken(user.Id, user.Name, user.Email, user.Role.RoleName, false);
                    return new GenericResponseDto<TokenDto>
                    {
                        StatusCode = HttpStatusCode.OK.GetHashCode(),
                        Success =true,
                        Message = "Successfully login",
                        Data = new TokenDto
                        {
                            AccessToken = accessToken,
                            RefreshToken = refreshToken
                        }
                    };
                }
                else
                {
                    return new GenericResponseDto<TokenDto>
                    {
                        StatusCode = HttpStatusCode.NotFound.GetHashCode(),
                        Success = false,
                        Message = "Invalid username and password or Role not exist",
                        Data = null
                    };
                }
            }
            catch(Exception ex)
            {
                return new GenericResponseDto<TokenDto>
                {
                    StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                    Success = false,
                    Message = "Something went wrong",
                    Data = null
                };
            }
        }


        public async Task<GenericResponseDto<TokenDto>> RefreshTheTokenAsync(string refreshToken)
        {
            try
            {
                var principle = jwtTokenService.ValidateToken(refreshToken);
                if(principle==null) 
                    return new GenericResponseDto<TokenDto>
                {
                    StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                    Success = false,
                    Message = "Invalid refresh token",
                    Data = null
                };

                var email = principle.FindFirst(p => p.Type == ClaimTypes.Email).Value;
                var user = email!=null ? await _userRepository.GetUserByEmailAsync(email) : null;

                if (user != null && user.Role != null)
                {
                    var accessToken = jwtTokenService.GenerateToken(user.Id, user.Name, user.Email, user.Role.RoleName, true);
                    var newRefreshToken = jwtTokenService.GenerateToken(user.Id, user.Name, user.Email, user.Role.RoleName, false);
                    return new GenericResponseDto<TokenDto>
                    {
                        StatusCode = HttpStatusCode.OK.GetHashCode(),
                        Success = true,
                        Message = "Successfully new tokens generated using refresh token",
                        Data = new TokenDto
                        {
                            AccessToken = accessToken,
                            RefreshToken = newRefreshToken
                        }
                    };
                }
                else
                {
                    return new GenericResponseDto<TokenDto>
                    {
                        StatusCode = HttpStatusCode.NotFound.GetHashCode(),
                        Success = false,
                        Message = "Invalid refresh token user credentials",
                        Data = null
                    };
                }
            }
            catch(Exception e)
            {
                Console.WriteLine(e.ToString());
                return null;
            }
        }
    }
}
