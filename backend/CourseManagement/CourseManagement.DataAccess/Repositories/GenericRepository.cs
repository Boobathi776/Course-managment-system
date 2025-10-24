using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using CourseManagement.DataAccess.Context;
using CourseManagement.DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;

namespace CourseManagement.DataAccess.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly CoursedbContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(CoursedbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        //public async Task<T> GetByIdAsync(Tkey id ,params Expression<Func<T,object>>[] includes)
        //{
        //    IQueryable<T> query = _dbSet;

        //    foreach(var include in includes)
        //    {
        //       query = query.Include(include);
        //    }

        //    var result =  await query.FirstOrDefault(e=>EF.Property<Tkey>(e,"Id") == id);
        //    return result;
        //}

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync(params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet;

            foreach(var include in includes)
            {
                query = query.Include(include);
            }

            return await query.AsNoTracking().ToListAsync();
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
            var rowsAffected =  await _context.SaveChangesAsync();
            return rowsAffected>0 ? entity : null;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            _dbSet.Remove(_dbSet.Find(id));
            var rowsAffected =  await _context.SaveChangesAsync(); 
            return rowsAffected > 0;
        }

    }
}
