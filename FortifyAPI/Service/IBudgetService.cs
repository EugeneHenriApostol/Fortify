using FortifyAPI.DTO;
using FortifyAPI.Model;

namespace FortifyAPI.Service
{
    public interface IBudgetService
    {
        Task<Budget> SetBudgetAsync(string userId, BudgetDto dto);
        Task<Budget?> GetBudgetAsync(string userId, int month, int year);
    }
}