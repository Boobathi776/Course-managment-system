using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Business.Dto.RequestDto
{
    public class RegisterUserDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        //[RegularExpression("^$",ErrorMessage ="Password should be difficult")]
        public string Password { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActive { get; set; }
    }
}
