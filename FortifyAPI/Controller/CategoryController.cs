using FortifyAPI.DTO;
using FortifyAPI.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FortifyAPI.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryWriterService _categoryWriterService;
        private readonly ICategoryReaderService _categoryReaderService;

        public CategoriesController(ICategoryWriterService categoryWriterService,
                    ICategoryReaderService categoryReaderService)
        {
            _categoryWriterService = categoryWriterService;
            _categoryReaderService = categoryReaderService;
        }

        private string GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var userId = GetUserId();
            var categories = await _categoryReaderService.GetAllAsync(userId);
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userId = GetUserId();
            var category = await _categoryReaderService.GetByIdAsync(id, userId);
            return category != null ? Ok(category) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCategoryDto dto)
        {
            var userId = GetUserId();
            var created = await _categoryWriterService.AddAsync(dto, userId);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateCategoryDto dto)
        {
            var userId = GetUserId();
            if (id != dto.Id) return BadRequest("Category ID mismatch.");

            var updated = await _categoryWriterService.UpdateAsync(id, new CreateCategoryDto
            {
                Name = dto.Name,
                Type = dto.Type
            }, userId);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetUserId();
            var deleted = await _categoryWriterService.DeleteAsync(id, userId);
            return deleted ? NoContent() : NotFound();
        }
    }
}
