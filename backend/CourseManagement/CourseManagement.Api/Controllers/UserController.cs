using CourseManagement.Business.Dto.RequestDto;
using CourseManagement.Business.Dto.ResponseDto;
using CourseManagement.Business.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;

namespace CourseManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="Admin")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            var response = await _userService.GetAllUsers();
            return Ok(response);
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<UserDto>> UpdateUser([FromRoute(Name ="id")] Guid userId,[FromBody] UpdateUserDto user)
        {
            Console.WriteLine(user);
            if (userId!=user.Id || user == null)
            {
                return BadRequest(new GenericResponseDto<UserDto>
                {
                    StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                    Success = false,
                    Message = "Updating user cannot be null",
                    Data = null
                });
            }
            else
            {
                var response = await _userService.UpdateUserAsync(user);
                return response.Success ? Ok(response) : BadRequest(response);
            }
        }

        [HttpDelete("deleteUser/{id}")]
        public async Task<ActionResult<GenericResponseDto<Guid>>> DeleteUser([FromRoute(Name ="id")]Guid userId)
        {
            if(userId==null) return BadRequest(new GenericResponseDto<Guid>()
            {
                StatusCode= HttpStatusCode.BadRequest.GetHashCode(),
                Success = false,
                Message = "Invalid user id is sended",
                Data = Guid.Empty
            });

            var response = await _userService.DeletUserAsync(userId);   
            return response.Success ? Ok(response) : NotFound(response);
        }
    }
}
