using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.DTO;

namespace FortifyAPI.Service
{
    // write operations
    public interface ICategoryWriterService
    {
        Task<CategoryDto> AddAsync(CreateCategoryDto dto, string userId);
        Task<CategoryDto?> UpdateAsync(int id, CreateCategoryDto dto, string userId);
        Task<bool> DeleteAsync(int id, string userId);
    }

    // read-only operations
    public interface ICategoryReaderService
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync(string userId);
        Task<CategoryDto?> GetByIdAsync(int id, string userId);
    }
}