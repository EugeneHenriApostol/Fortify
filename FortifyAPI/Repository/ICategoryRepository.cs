using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.Data;
using FortifyAPI.Model;

namespace FortifyAPI.Repository
{
    // write operations
    public interface ICategoryWriterRepository
    {
        Task<Category> AddAsync(Category category);
        Task<Category?> UpdateAsync(Category category);
        Task<bool> DeleteAsync(int id, string userId);
    }

    // read-only operations
    public interface ICategoryReaderRepository
    {
        Task<Category?> GetByIdAsync(int id, string userId);
        Task<IEnumerable<Category>> GetAllAsync(string userId);
    }
}