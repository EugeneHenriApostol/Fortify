using FortifyAPI.Repository;
using FortifyAPI.Model;
using FortifyAPI.DTO;

namespace FortifyAPI.Service
{
    public class BudgetService : IBudgetService
    {
        private readonly IBudgetRepository _repo;

        public BudgetService(IBudgetRepository repo)
        {
            _repo = repo;
        }

        public async Task<BudgetResponseDto> SetBudgetAsync(string userId, BudgetDto dto)
        {
            var existing = await _repo.GetBudgetAsync(userId, dto.Month, dto.Year);
            if (existing != null) throw new Exception("Budget already exists for this month");

            var budget = new Budget
            {
                UserId = userId,
                LimitAmount = dto.Amount,
                Month = dto.Month,
                Year = dto.Year,
                CategoryId = dto.CategoryId
            };

            budget = await _repo.AddBudgetAsync(budget);

            return new BudgetResponseDto
            {
                Id = budget.Id,
                LimitAmount = budget.LimitAmount,
                Month = budget.Month,
                Year = budget.Year,
                CategoryId = budget.CategoryId,
                CategoryName = budget.Category?.Name,
                CreatedAt = budget.CreatedAt
            };
        }

        public async Task<BudgetResponseDto?> GetBudgetAsync(string userId, int month, int year)
        {
            var budget = await _repo.GetBudgetAsync(userId, month, year);

            if (budget == null) return null;

            return new BudgetResponseDto
            {
                Id = budget.Id,
                LimitAmount = budget.LimitAmount,
                Month = budget.Month,
                Year = budget.Year,
                CategoryId = budget.CategoryId,
                CategoryName = budget.Category?.Name,
                CreatedAt = budget.CreatedAt
            };
        }
    }
}