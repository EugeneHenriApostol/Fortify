using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.Data;
using FortifyAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace FortifyAPI.Repository
{
    public class BudgetRepository : IBudgetReaderRepository, IBudgetWriterRepository
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

        public async Task<Budget?> GetBudgetAsync(string userId, int month, int year)
        {
            return await _context.Budgets.FirstOrDefaultAsync(b => b.UserId == userId && b.Month == month && b.Year == year);
        }

        public async Task<Budget?> UpdateBudgetAsync(Budget budget)
        {
            _context.Budgets.Update(budget);
            await _context.SaveChangesAsync();
            return budget;
        }
    }
}