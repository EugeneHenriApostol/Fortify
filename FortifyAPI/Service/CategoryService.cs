using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.Repository;
using FortifyAPI.DTO;
using FortifyAPI.Model;

namespace FortifyAPI.Service
{
public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repo;

        public CategoryService(ICategoryRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync(string userId)
        {
            var categories = await _repo.GetAllAsync(userId);
            return categories.Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                Type = c.Type
            });
        }

        public async Task<CategoryDto?> GetByIdAsync(int id, string userId)
        {
            var category = await _repo.GetByIdAsync(id, userId);
            return category == null ? null : new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                Type = category.Type
            };
        }

        public async Task<CategoryDto> AddAsync(CreateCategoryDto dto, string userId)
        {
            var category = new Category
            {
                Name = dto.Name,
                Type = dto.Type,
                UserId = userId
            };

            var created = await _repo.AddAsync(category);
            return new CategoryDto
            {
                Id = created.Id,
                Name = created.Name,
                Type = created.Type
            };
        }

        public async Task<CategoryDto?> UpdateAsync(int id, CreateCategoryDto dto, string userId)
        {
            var category = new Category
            {
                Id = id,
                Name = dto.Name,
                Type = dto.Type,
                UserId = userId
            };

            var updated = await _repo.UpdateAsync(category);
            return updated == null ? null : new CategoryDto
            {
                Id = updated.Id,
                Name = updated.Name,
                Type = updated.Type
            };
        }

        public async Task<bool> DeleteAsync(int id, string userId)
        {
            return await _repo.DeleteAsync(id, userId);
        }
    }
}