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
    public class UserRepository:GenericRepository<User> , IUserRepository
    {
        private readonly CoursedbContext _context;
        public UserRepository(CoursedbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<bool> IsAlreadyExistingMailIdAsync(string email)
        {
           var isAvialble =  await _context.Users.AnyAsync(u=>u.Email == email);
            return isAvialble;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var matchedUser =await _context.Users.AsNoTracking().Include(u => u.Role).Where(u=>u.Email==email).FirstOrDefaultAsync();
            return matchedUser;
        }


    }
}
