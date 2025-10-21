using System;
using System.Collections.Generic;

namespace CourseManagement.DataAccess.Models;

public partial class Course
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public DateTime StartDate { get; set; }

    public short CourseDuration { get; set; }

    public short MinimumAgeRequired { get; set; }

    public DateTime CreatedOn { get; set; }
}
