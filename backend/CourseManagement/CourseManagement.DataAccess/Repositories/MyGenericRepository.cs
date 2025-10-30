using CourseManagement.DataAccess.Context;
using CourseManagement.DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.DataAccess.Repositories
{
    public class MyGenericRepository<T> :IMyIGenericRepository<T> where T : class
    {
        private readonly CourseDbContext _context;
        private readonly DbSet<T> _dbSet;
        public MyGenericRepository(CourseDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }


        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.AsNoTracking().ToListAsync();   
        }

        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<T> UpdateAsync(T entity)
        {
             _dbSet.Update(entity);
            var rowsAffected = await _context.SaveChangesAsync();
            return rowsAffected > 0 ? entity : null;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            _dbSet.Remove(_dbSet.Find(id));
            var rowsAffected = await _context.SaveChangesAsync();
            return rowsAffected > 0;
        }
    }
}
