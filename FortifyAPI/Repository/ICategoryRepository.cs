using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.Data;
using FortifyAPI.Model;

namespace FortifyAPI.Repository
{
    public interface ICategoryRepository
    {
        Task<Category?> GetByIdAsync(int id, string userId);
        Task<IEnumerable<Category>> GetAllAsync(string userId);
        Task<Category> AddAsync(Category category);
        Task<Category?> UpdateAsync(Category category);
        Task<bool> DeleteAsync(int id, string userId);
    }
}