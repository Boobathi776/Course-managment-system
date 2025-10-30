using CourseManagement.Business.Dto.ResponseDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Business.Interfaces
{
    public interface IEnrollmentService
    {
        Task<GenericResponseDto<EnrollmentResponseDto>> EnrollTheCourseAsync(Guid userId, int courseId);
        Task<GenericResponseDto<IEnumerable<EnrollmentResponseDto>>> GetAllEnrollmentsAsync(Guid userId);
        Task<GenericResponseDto<int>> DeleteEnrollmentAsync(Guid userId, int courseId);
    }
}
