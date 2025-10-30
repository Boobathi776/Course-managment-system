using System;
using System.Collections.Generic;

namespace CourseManagement.DataAccess.Models;

public partial class FileUpload
{
    public int Id { get; set; }

    public string FileName { get; set; } = null!;

    public string FilePath { get; set; } = null!;

    public int FileSize { get; set; }

    public string ContentType { get; set; } = null!;
}
