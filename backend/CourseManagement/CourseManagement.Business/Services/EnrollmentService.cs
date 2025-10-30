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
    public class EnrollmentService : IEnrollmentService
    {
        private readonly IEnrollmentRepository _enrollmentRepository;
        public EnrollmentService(IEnrollmentRepository enrollmentRepository)
        {
            _enrollmentRepository = enrollmentRepository; 
        }

        public async Task<GenericResponseDto<IEnumerable<EnrollmentResponseDto>>> GetAllEnrollmentsAsync(Guid userId)
        {
            var result = await _enrollmentRepository.GetEnrollmentsByUserIdAsync(userId);
            var mappedResult = result.Select(e=>new EnrollmentResponseDto { CourseId = e.CourseId,EnrolledOn = e.EnrolledOn }).ToList();
            return new GenericResponseDto<IEnumerable<EnrollmentResponseDto>>
            {
                StatusCode = 200,
                Success = true,
                Message = "successfully get the enrollments",
                Data = mappedResult
            };
        }

        public async Task<GenericResponseDto<int>> DeleteEnrollmentAsync(Guid userId , int courseId)
        {
            var deletedEnrolledCourseId = await _enrollmentRepository.DeleteEnrollmentAsync(userId, courseId);
            return deletedEnrolledCourseId != 0 ? new GenericResponseDto<int>
            {
                StatusCode = 200,
                Success = true,
                Message = "Successfully Deleted the Enrollment",
                Data = deletedEnrolledCourseId
            }
            :
            new GenericResponseDto<int>
            {
                StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                Success = false,
                Message = "Unable to delete the Enrollment",
                Data = 0
            };

        }

        public async Task<GenericResponseDto<EnrollmentResponseDto>> EnrollTheCourseAsync(Guid userId,int courseId)
        {
            try
            {
                var enrollments = await _enrollmentRepository.GetEnrollmentsByUserIdAsync(userId);
                if (enrollments.Any(e => e.CourseId == courseId))
                {
                    return new GenericResponseDto<EnrollmentResponseDto>
                    {
                        StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                        Success = false,
                        Message = "You can't enroll same course again",
                        Data = null!
                    };
                }
                else if(enrollments.Count()>=3)
                {
                    return new GenericResponseDto<EnrollmentResponseDto>
                    {
                        StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                        Success = false,
                        Message = "Already 3 courses have enrolled",
                        Data = null!
                    };
                }
                else
                {
                    var enrollmentCourse = new Enrollment
                    {
                        UserId = userId,
                        CourseId = courseId
                    };

                    var response = await _enrollmentRepository.AddAsync(enrollmentCourse);
                    if (response != null)
                    {
                        return new GenericResponseDto<EnrollmentResponseDto>
                        {
                            StatusCode = HttpStatusCode.OK.GetHashCode(),
                            Success = true,
                            Message = "Successfully enrolled",
                            Data = new EnrollmentResponseDto
                            {
                                CourseId = response.CourseId,
                                EnrolledOn = response.EnrolledOn
                            }
                        };
                    }
                    else
                    {
                        return new GenericResponseDto<EnrollmentResponseDto>
                        {
                            StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                            Success = false,
                            Message = "Unable to enrolle the course",
                            Data = null!
                        };
                    }
                }     
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new GenericResponseDto<EnrollmentResponseDto>
                {
                    StatusCode = HttpStatusCode.BadRequest.GetHashCode(),
                    Success = false,
                    Message = "Something went wrong",
                    Data = null!
                };
            }
        }
    }
}
