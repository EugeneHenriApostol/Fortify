using FortifyAPI.DTO;
using FortifyAPI.Model;

namespace FortifyAPI.Service
{
    // write operations
    public interface IBudgetWriterService
    {
        Task<BudgetResponseDto> SetBudgetAsync(string userId, BudgetDto dto);
        Task<BudgetResponseDto?> UpdateBudgetAsync(string userId, BudgetDto dto);
    }

    // read-only operations
    public interface IBudgetReaderService
    {
        Task<BudgetResponseDto?> GetBudgetAsync(string userId, int month, int year);
    }
}