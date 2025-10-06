using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.Data;
using FortifyAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace FortifyAPI.Repository
{
    // write operations
    public interface IBudgetWriterRepository
    {
        Task<Budget> AddBudgetAsync(Budget budget);
        Task<Budget?> GetBudgetAsync(string userId, int month, int year);
        Task<Budget?> UpdateBudgetAsync(Budget budget);
    }

    // read-only operations
    public interface IBudgetReaderRepository
    {
        Task<Budget?> GetBudgetAsync(string userId, int month, int year);
    }
}