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
        Task<Budget?> UpdateBudgetAsync(Budget budget);
    }
}