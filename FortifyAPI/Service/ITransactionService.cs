using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.Model;
using FortifyAPI.DTO;

namespace FortifyAPI.Service
{
    // write operations
    public interface ITransactionWriterService
    {
        Task<TransactionResponseDto> AddAsync(TransactionCreateDto dto, string userId);
        Task<TransactionResponseDto> UpdateAsync(TransactionUpdateDto dto, string userId);
        Task<bool> DeleteAsync(int id, string userId);
    }

    // read-only operations
    public interface ITransactionReaderService
    {
        Task<IEnumerable<TransactionResponseDto>> GetAllAsync(string userId);
        Task<TransactionResponseDto?> GetByIdAsync(int id, string userId);
        Task<IEnumerable<TransactionResponseDto>> GetByMonthAsync(string userId, int month, int year);
    }
}