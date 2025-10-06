using FortifyAPI.Repository;
using FortifyAPI.Model;
using FortifyAPI.DTO;

namespace FortifyAPI.Service
{
    public class BudgetService : IBudgetWriterService, IBudgetReaderService
    {
        private readonly IBudgetWriterRepository _budgetWriterRepo;
        private readonly IBudgetReaderRepository _budgetReaderRepo;

        public BudgetService(IBudgetWriterRepository budgetWriterRepo,
                IBudgetReaderRepository budgetReaderRepo)
        {
            _budgetWriterRepo = budgetWriterRepo;
            _budgetReaderRepo = budgetReaderRepo;
        }

        public async Task<BudgetResponseDto> SetBudgetAsync(string userId, BudgetDto dto)
        {
            var existing = await _budgetReaderRepo.GetBudgetAsync(userId, dto.Month, dto.Year);
            if (existing != null) throw new Exception("Budget already exists for this month");

            var budget = new Budget
            {
                UserId = userId,
                LimitAmount = dto.Amount,
                Month = dto.Month,
                Year = dto.Year,
            };

            budget = await _budgetWriterRepo.AddBudgetAsync(budget);

            return new BudgetResponseDto
            {
                Id = budget.Id,
                LimitAmount = budget.LimitAmount,
                Month = budget.Month,
                Year = budget.Year,
                CreatedAt = budget.CreatedAt
            };
        }

        public async Task<BudgetResponseDto?> GetBudgetAsync(string userId, int month, int year)
        {
            var budget = await _budgetReaderRepo.GetBudgetAsync(userId, month, year);

            if (budget == null) return null;

            return new BudgetResponseDto
            {
                Id = budget.Id,
                LimitAmount = budget.LimitAmount,
                Month = budget.Month,
                Year = budget.Year,
                CreatedAt = budget.CreatedAt
            };
        }

        public async Task<BudgetResponseDto?> UpdateBudgetAsync(string userId, BudgetDto dto)
        {
            var existing = await _budgetReaderRepo.GetBudgetAsync(userId, dto.Month, dto.Year);
            if (existing == null)
            {
                return null;
            }

            existing.LimitAmount = dto.Amount;
            existing.UpdatedAt = DateTime.UtcNow;

            var update = await _budgetWriterRepo.UpdateBudgetAsync(existing);
            if (update == null)
            {
                return null;
            }

            return new BudgetResponseDto
            {
                Id = update.Id,
                LimitAmount = update.LimitAmount,
                Month = update.Month,
                Year = update.Year,
                CreatedAt = update.CreatedAt
            };
        }
    }
}