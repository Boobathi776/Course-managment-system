using System;
using System.Collections.Generic;

namespace CourseManagement.DataAccess.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateOnly DateOfBirth { get; set; }

    public string Password { get; set; } = null!;

    public int? RoleId { get; set; }

    public DateTime CreatedOn { get; set; }

    public bool IsActive { get; set; }

    public virtual Role? Role { get; set; }
}
