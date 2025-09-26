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

        public async Task<Budget> SetBudgetAsync(string userId, BudgetDto dto)
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

            return await _repo.AddBudgetAsync(budget);
        }

        public async Task<Budget?> GetBudgetAsync(string userId, int month, int year)
        {
            return await _repo.GetBudgetAsync(userId, month, year);
        }
    }
}