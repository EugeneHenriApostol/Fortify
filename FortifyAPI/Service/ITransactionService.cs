using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.Model;
using FortifyAPI.DTO;

namespace FortifyAPI.Service
{
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionResponseDto>> GetAllAsync(string userId);
        Task<TransactionResponseDto?> GetByIdAsync(int id, string userId);
        Task<TransactionResponseDto> AddAsync(TransactionCreateDto dto, string userId);
        Task<TransactionResponseDto> UpdateAsync(TransactionUpdateDto dto, string userId);
        Task<bool> DeleteAsync(int id, string userId);
    }
}