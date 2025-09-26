using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.Data;
using FortifyAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace FortifyAPI.Repository
{
    public interface IBudgetRepository
    {
        Task<Budget> AddBudgetAsync(Budget budget);
        Task<Budget?> GetBudgetAsync(string userId, int month, int year);
    }

    public class BudgetRepository : IBudgetRepository
    {
        private readonly AppDbContext _context;
        public BudgetRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Budget> AddBudgetAsync(Budget budget)
        {
            _context.Budgets.Add(budget);
            await _context.SaveChangesAsync();
            return budget;
        }

        public Task<Budget?> GetBudgetAsync(string userId, int month, int year)
        {
            return _context.Budgets.FirstOrDefaultAsync(b => b.UserId == userId && b.Month == month && b.Year == year);
        }
    }
}