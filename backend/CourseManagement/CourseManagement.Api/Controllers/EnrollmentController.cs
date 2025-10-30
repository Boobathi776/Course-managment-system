using CourseManagement.Business.Dto.RequestDto;
using CourseManagement.Business.Dto.ResponseDto;
using CourseManagement.Business.Interfaces;
using CourseManagement.Business.Services;
using CourseManagement.DataAccess.Context;
using CourseManagement.DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Threading.Tasks;

namespace CourseManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="User")]
    public class EnrollmentController : ControllerBase
    {
        private readonly IEnrollmentService _enrollmentService;
        private readonly ICourseService _courseService;
        public EnrollmentController(IEnrollmentService enrollmentService,ICourseService courseService)
        {
            _enrollmentService = enrollmentService;
            _courseService = courseService;
        }

        [HttpGet("courses")]
        public async Task<ActionResult<IEnumerable<Course>>> GetAll()
        {
            var response = await _courseService.GetAllCoursesForUserAsync();
            return response.Success ? Ok(response) : BadRequest();
        }

        [HttpPost("enroll")]
        public async Task<ActionResult<GenericResponseDto<EnrollmentResponseDto>>> EnrollCourse([FromBody] EnrollmentDto enrollmentDto)
        {
            var userID = User.FindFirst("UserId").Value;
            Guid actualUserId;
            if (Guid.TryParse(userID, out actualUserId))
            {
                var response =  await _enrollmentService.EnrollTheCourseAsync(actualUserId,enrollmentDto.CourseId);
                return response.Success ? Ok(response) : BadRequest(response);
            }
            else
            {
                return new GenericResponseDto<EnrollmentResponseDto>
                {
                    StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                    Success = false,
                    Message = "Invalid token",
                    Data = null!
                };
            }
        }

        [HttpGet("getEnrollments")]
        public async Task<ActionResult<GenericResponseDto<IEnumerable<EnrollmentResponseDto>>>> GetAllEnrollments()
        {
            if(Guid.TryParse(User.FindFirst("UserId").Value,out Guid userId))
            {
                var response = await _enrollmentService.GetAllEnrollmentsAsync(userId);
                return response.Success ? Ok(response) : BadRequest(response) ;
            }
            else
            {
                return new GenericResponseDto<IEnumerable<EnrollmentResponseDto>>
                {
                    StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                    Success = false,
                    Message = "Invalid token",
                    Data = null!
                };
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<GenericResponseDto<int>>> DeleteEnrollment([FromRoute(Name ="id")] int courseId)
        {
            if (Guid.TryParse(User.FindFirst("UserId").Value, out Guid userId))
            {
                var response = await _enrollmentService.DeleteEnrollmentAsync(userId, courseId);
                return response.Success ? Ok(response) : BadRequest(response);
            }
            else
            {
                return new GenericResponseDto<int>
                {
                    StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                    Success = false,
                    Message = "Invalid token",
                    Data =0
                };
            }
        }
    }

}
