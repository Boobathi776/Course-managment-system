using CourseManagement.Business.Dto.RequestDto;
using CourseManagement.Business.Dto.ResponseDto;
using CourseManagement.Business.Interfaces;
using CourseManagement.DataAccess.Interfaces;
using CourseManagement.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Business.Services
{
    public class CourseService : ICourseService
    {
        private readonly IGenericRepository<Course> _genericRepository;
        private readonly ICourseRepository _courseRepository;
        public CourseService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }


        public async Task<Course> GetById(int id)
        {
           var course = await _genericRepository.GetByIdAsync(id);
            return course != null ? course : null;
        }

        public  async Task<GenericResponseDto<IEnumerable<Course>>> GetAllCoursesAsync()
        {
            var courses = await _courseRepository.GetAllAsync();
            return new GenericResponseDto<IEnumerable<Course>>
            {
                StatusCode = 200,
                Success = true,
                Message = "All courses find",
                Data = courses
            };
        }

        public async Task<GenericResponseDto<Course>> AddNewCourse(CourseDto newCourse)
        {
            var response = await _courseRepository.AddAsync(new Course
            {
                Name = newCourse.Name,
                StartDate = newCourse.StartDate,
                CourseDuration =(short)newCourse.CourseDuration,
                MinimumAgeRequired = (short)newCourse.MinimumAgeRequired,
            });

            return new GenericResponseDto<Course>
            {
                  StatusCode =HttpStatusCode.Created.GetHashCode(),
                  Success = true,
                  Message = "Created successfully",
                  Data = response   
            };
        }

        public async Task<GenericResponseDto<Course>> UpdateCourseAsync(Course course)
        {
            var response = await _courseRepository.UpdateAsync(course);
            return new GenericResponseDto<Course>
            {
                StatusCode = 200,
                Success = true,
                Message = "Updated Successfully",
                Data = response
            };
        }
    }
}
