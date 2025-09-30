using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.Model;
using FortifyAPI.DTO;
using FortifyAPI.Repository;

namespace FortifyAPI.Service
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepo;
        private readonly ICategoryRepository _categoryRepo;

        public TransactionService(ITransactionRepository transactionRepo, ICategoryRepository categoryRepo)
        {
            _transactionRepo = transactionRepo;
            _categoryRepo = categoryRepo;
        }

        public async Task<IEnumerable<TransactionResponseDto>> GetAllAsync(string userId)
        {
            var transactions = await _transactionRepo.GetAllAsync(userId);
            return transactions.Select(t => new TransactionResponseDto
            {
                Id = t.Id,
                Amount = t.Amount,
                Type = t.Type,
                Date = t.Date,
                Description = t.Description,
                CategoryId = t.CategoryId,
                CategoryName = t.Category!.Name
            });
        }

        public async Task<TransactionResponseDto?> GetByIdAsync(int id, string userId)
        {
            var t = await _transactionRepo.GetByIdAsync(id, userId);
            if (t == null) return null;

            return new TransactionResponseDto
            {
                Id = t.Id,
                Amount = t.Amount,
                Type = t.Type,
                Date = t.Date,
                Description = t.Description,
                CategoryId = t.CategoryId,
                CategoryName = t.Category!.Name
            };
        }

        public async Task<TransactionResponseDto> AddAsync(TransactionCreateDto dto, string userId)
        {
            var category = await _categoryRepo.GetByIdAsync(dto.CategoryId, userId);
            if (category == null) throw new Exception("Invalid category.");

            var transaction = new Transaction
            {
                UserId = userId,
                Amount = dto.Amount,
                Type = dto.Type,
                Date = dto.Date,
                Description = dto.Description,
                CategoryId = dto.CategoryId
            };

            var saved = await _transactionRepo.AddAsync(transaction);

            return new TransactionResponseDto
            {
                Id = saved.Id,
                Amount = saved.Amount,
                Type = saved.Type,
                Date = saved.Date,
                Description = saved.Description,
                CategoryId = saved.CategoryId,
                CategoryName = category.Name
            };
        }

        public async Task<TransactionResponseDto> UpdateAsync(TransactionUpdateDto dto, string userId)
        {
            var existing = await _transactionRepo.GetByIdAsync(dto.Id, userId);
            if (existing == null) throw new Exception("Transaction not found.");

            var category = await _categoryRepo.GetByIdAsync(dto.CategoryId, userId);
            if (category == null) throw new Exception("Invalid category.");

            existing.Amount = dto.Amount;
            existing.Type = dto.Type;
            existing.Date = dto.Date;
            existing.Description = dto.Description;
            existing.CategoryId = dto.CategoryId;

            var updated = await _transactionRepo.UpdateAsync(existing);

            return new TransactionResponseDto
            {
                Id = updated.Id,
                Amount = updated.Amount,
                Type = updated.Type,
                Date = updated.Date,
                Description = updated.Description,
                CategoryId = updated.CategoryId,
                CategoryName = category.Name
            };
        }

        public async Task<bool> DeleteAsync(int id, string userId)
        {
            return await _transactionRepo.DeleteAsync(id, userId);
        }

        public async Task<IEnumerable<TransactionResponseDto>> GetByMonthAsync(string userId, int month, int year)
        {
            var transactions = await _transactionRepo.GetByMonthAsync(userId, month, year);
            return transactions.Select(t => new TransactionResponseDto
            {
                Id = t.Id,
                Amount = t.Amount,
                Type = t.Type,
                Date = t.Date,
                Description = t.Description,
                CategoryId = t.CategoryId,
                CategoryName = t.Category!.Name
            });
        }
    }
}