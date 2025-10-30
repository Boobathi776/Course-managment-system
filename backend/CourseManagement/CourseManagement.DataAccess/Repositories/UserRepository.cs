using CourseManagement.DataAccess.Context;
using CourseManagement.DataAccess.Interfaces;
using CourseManagement.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.DataAccess.Repositories
{
    public class UserRepository:GenericRepository<User> , IUserRepository
    {
        private readonly CourseDbContext _context;
        public UserRepository(CourseDbContext context) : base(context)
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

        public async Task<User> GetUserByGuid(Guid id)
        {
            var matchedUser = await _context.Users.AsNoTracking().Where(u=>u.Id==id).FirstOrDefaultAsync();
            return matchedUser;
        }

        public async Task<User> UpdateUser(User user)
        {
            _context.Users.Update(user);
            var rowsAffected = await _context.SaveChangesAsync();
            return rowsAffected>0 ? user: null;
        }

        public async Task<Guid> DeleteUserAsync(Guid userId)
        {
            var matchedUser = await GetUserByGuid(userId);
            int rowsAffected = 0;
            if(matchedUser != null)
            {
                _context.Users.Remove(matchedUser); 
                rowsAffected = await _context.SaveChangesAsync();
            }
            else
            {
                rowsAffected = 0;   
            }

            return rowsAffected > 0 ? userId : Guid.Empty;
        }

    }
}
