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
    public class CourseRepository : MyGenericRepository<Course>, ICourseRepository
    {
        private readonly CourseDbContext _courseDbContext;
        public CourseRepository(CourseDbContext courseDbContext) : base(courseDbContext) 
        {
            _courseDbContext = courseDbContext;
        }

        public async Task<IEnumerable<Course>> GetAllCoursesAync()
        {
            return await _courseDbContext.Courses.Include(c => c.Enrollments).ToListAsync();
        }

    }
}
