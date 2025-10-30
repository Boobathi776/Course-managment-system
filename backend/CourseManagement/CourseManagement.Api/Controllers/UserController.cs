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
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize(Roles = "User,Admin")]
        [HttpGet("singleUser")]
        public async Task<ActionResult<GenericResponseDto<UserDto>>> Get()
        {
            var userId = User.FindFirst("UserId")?.Value;
           Guid.TryParse(userId, out Guid actualId);

            var response = await _userService.GetUserByGuid(actualId);
            return response.Success ? Ok(response) : BadRequest(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            var response = await _userService.GetAllUsers();
            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
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

        [Authorize(Roles = "Admin")]
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
