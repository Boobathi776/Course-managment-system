using Azure.Core;
using CourseManagement.Business.Dto.RequestDto;
using CourseManagement.Business.Dto.ResponseDto;
using CourseManagement.Business.Interfaces;
using CourseManagement.Business.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;

namespace CourseManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly JwtTokenService _jwtTokenService;
        private readonly IAccountService _accountService;
        public AuthenticationController(JwtTokenService jwtTokenService,IAccountService accountService)
        {
            _jwtTokenService = jwtTokenService;
            _accountService = accountService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<GenericResponseDto<RegisteredUserDto>>> RegisterUser([FromBody] RegisterUserDto registerUserDto)
        {
           var response =  await _accountService.RegisterNewUserAsync(registerUserDto);
           return response.Success ? Ok(response) : BadRequest(response);
        }

        [HttpPost("login")]
        public async Task<ActionResult<GenericResponseDto<TokenDto>>> LoginUser([FromBody] LoginDto longinUserDto)
        {
            var response = await _accountService.LoginUserAsync(longinUserDto);
            return response.Success ? Ok(response) : BadRequest(response);
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<GenericResponseDto<TokenDto>>> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            if (refreshTokenDto.RefreshToken == null) return new GenericResponseDto<TokenDto>
            {
                StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                Success = false,
                Message = "Refresh token is Empty string",
                Data =null
            };

            var response = await  _accountService.RefreshTheTokenAsync(refreshTokenDto.RefreshToken);
            return response.Success ? Ok(response) : BadRequest(Response);
        }
    }
}
