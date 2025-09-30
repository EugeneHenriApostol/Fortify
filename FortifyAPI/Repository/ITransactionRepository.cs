using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.Model;

namespace FortifyAPI.Repository
{
    public interface ITransactionRepository
    {
        Task<Transaction?> GetByIdAsync(int id, string userId);
        Task<IEnumerable<Transaction>> GetAllAsync(string userId);
        Task<Transaction> AddAsync(Transaction transaction);
        Task<Transaction> UpdateAsync(Transaction transaction);
        Task<bool> DeleteAsync(int id, string userId);
        Task<IEnumerable<Transaction>> GetByMonthAsync(string userId, int month, int year);
    }
}