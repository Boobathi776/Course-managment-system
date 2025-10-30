using CourseManagement.Business.Dto.RequestDto;
using CourseManagement.Business.Dto.ResponseDto;
using CourseManagement.Business.Interfaces;
using CourseManagement.DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CourseManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="Admin")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet("course/{id}")]
        public async Task<GenericResponseDto<Course>> GetCourse([FromRoute] int id)
        {
            var responseData = await _courseService.GetById(id);
            return new GenericResponseDto<Course>
            {
                StatusCode = 200,
                Success = true,
                Message = "Course founded successfully",
                Data = responseData
            };
        }

        [HttpGet("courses")]
        public async Task<ActionResult<GenericResponseDto<IEnumerable<AdminCourseDto>>>> GetAll()
        {
            var response = await _courseService.GetAllCoursesAsync();
            return response.Success ? Ok(response) : BadRequest();  
        }

        [HttpPost("add")]
        public async Task<ActionResult<GenericResponseDto<Course>>> AddCourseAsync([FromBody] CourseDto newCourse)
        {
            var userId =User.FindFirst("UserId")?.Value;
            if (userId != null)
            {
                if(Guid.TryParse(userId,out Guid MyID))
                {
                    Console.WriteLine(MyID);
                }
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var response = await _courseService.AddNewCourse(newCourse);
            return response.Success ? CreatedAtAction(nameof(GetCourse),new { response.Data.Id }, response) : BadRequest(response);
        }


        [HttpPut("update/{id}")]
        public async Task<ActionResult<GenericResponseDto<Course>>> UpdateCourse([FromBody] Course course)
        {
           var response =  await  _courseService.UpdateCourseAsync(course);
            return response.Success ? Ok(response) : NotFound();
        }

        [HttpDelete("delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GenericResponseDto<bool>>> DeleteCourse([FromRoute] int id)
        {
            var reponse = await _courseService.DeleteCourse(id);
            return reponse.Success ? Ok(reponse) : NotFound();  
        }
    }
}
