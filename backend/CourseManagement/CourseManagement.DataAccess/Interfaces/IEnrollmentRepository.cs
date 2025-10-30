using CourseManagement.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.DataAccess.Interfaces
{
    public interface IEnrollmentRepository : IGenericRepository<Enrollment> 
    {
        Task<IEnumerable<Enrollment>> GetEnrollmentsByUserIdAsync(Guid userId);
        Task<int> DeleteEnrollmentAsync(Guid userId, int courseId);
    }
}
