using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Business.Dto.ResponseDto
{
    public class AdminCourseDto
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public int CourseDuration { get; set; }
        public int MinimumAgeRequired { get; set; }
        public int enrolledCount { get; set; }
    }
}
