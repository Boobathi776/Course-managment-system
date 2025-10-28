using CourseManagement.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.DataAccess.Interfaces
{
    public interface IUserRepository : IMyIGenericRepository<User>
    {
        Task<bool> IsAlreadyExistingMailIdAsync(string email);
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByGuid(Guid id);
        Task<User> UpdateUser(User user);
        Task<Guid> DeleteUserAsync(Guid userId);
    }
}
