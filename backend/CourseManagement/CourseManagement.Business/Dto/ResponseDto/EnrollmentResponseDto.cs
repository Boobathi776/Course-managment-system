using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Business.Dto.ResponseDto
{
    public class EnrollmentResponseDto
    {
        public int CourseId { get; set; }
        public DateTime EnrolledOn { get; set; }
    }
}
