using CourseManagement.DataAccess.Context;
using CourseManagement.DataAccess.Interfaces;
using CourseManagement.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.DataAccess.Repositories
{
    public class CourseRepository : MyGenericRepository<Course>, ICourseRepository
    {
        private readonly CoursedbContext _courseDbContext;
        public CourseRepository(CoursedbContext courseDbContext) : base(courseDbContext) 
        {
            _courseDbContext = courseDbContext;
        }



    }
}
