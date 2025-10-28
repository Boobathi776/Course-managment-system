using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Business.Dto.RequestDto
{
    public class UpdateUserDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActive { get; set; }
    }
}
