using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.DTO;

namespace FortifyAPI.Service
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync(string userId);
        Task<CategoryDto?> GetByIdAsync(int id, string userId);
        Task<CategoryDto> AddAsync(CreateCategoryDto dto, string userId);
        Task<CategoryDto?> UpdateAsync(int id, CreateCategoryDto dto, string userId);
        Task<bool> DeleteAsync(int id, string userId);
    }
}