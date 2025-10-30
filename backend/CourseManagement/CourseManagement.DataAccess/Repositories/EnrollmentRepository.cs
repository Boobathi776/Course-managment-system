using CourseManagement.DataAccess.Context;
using CourseManagement.DataAccess.Interfaces;
using CourseManagement.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.DataAccess.Repositories
{
    public class EnrollmentRepository : GenericRepository<Enrollment> ,IEnrollmentRepository
    {
        private readonly CourseDbContext _context;
        public EnrollmentRepository(CourseDbContext context) : base(context) 
        {
            _context = context;
        }

        public async Task<IEnumerable<Enrollment>> GetEnrollmentsByUserIdAsync(Guid userId)
        {
            return await _context.Enrollments.Include(e => e.Course).AsNoTracking().Where(e=>e.UserId==userId).ToListAsync();
        }

        public async Task<int> DeleteEnrollmentAsync(Guid userId, int courseId)
        {
            var enrolledCourse = await _context.Enrollments.Where(e => e.UserId == userId && e.CourseId == courseId).FirstOrDefaultAsync();
            if (enrolledCourse != null)
            {
                _context.Enrollments.Remove(enrolledCourse);
                var rowsAffected =  await _context.SaveChangesAsync();
                return rowsAffected > 0 ? courseId : 0;
            }
            else
            {
                return 0;
            }
        }

    }
}
