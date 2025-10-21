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
    public interface ICourseService
    {
        Task<Course> GetById(int id);
        Task<GenericResponseDto<IEnumerable<Course>>> GetAllCoursesAsync();
        Task<GenericResponseDto<Course>> AddNewCourse(CourseDto newCourse);
        Task<GenericResponseDto<Course>> UpdateCourseAsync(Course course);

    }
}
