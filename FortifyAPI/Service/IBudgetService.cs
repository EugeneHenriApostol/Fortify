using FortifyAPI.DTO;
using FortifyAPI.Model;

namespace FortifyAPI.Service
{
    public interface IBudgetService
    {
        Task<BudgetResponseDto> SetBudgetAsync(string userId, BudgetDto dto);
        Task<BudgetResponseDto?> GetBudgetAsync(string userId, int month, int year);
    }
}