using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.Model;
using FortifyAPI.DTO;
using FortifyAPI.Repository;

namespace FortifyAPI.Service
{
    public class TransactionService : ITransactionWriterService, ITransactionReaderService
    {
        private readonly ITransactionReaderRepository _transactionReaderRepo;
        private readonly ITransactionWriterRepository _transactionWriterRepo;
        private readonly ICategoryReaderRepository _categoryReaderRepo;

        public TransactionService(ITransactionReaderRepository transactionReaderRepo,
                ITransactionWriterRepository transactionWriterRepo,
                ICategoryReaderRepository categoryReaderRepo)
        {
            _transactionReaderRepo = transactionReaderRepo;
            _transactionWriterRepo = transactionWriterRepo;
            _categoryReaderRepo = categoryReaderRepo;
        }

        public async Task<IEnumerable<TransactionResponseDto>> GetAllAsync(string userId)
        {
            var transactions = await _transactionReaderRepo.GetAllAsync(userId);
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
            var t = await _transactionReaderRepo.GetByIdAsync(id, userId);
            if (t == null)
            {
                return null;
            }

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
            var category = await _categoryReaderRepo.GetByIdAsync(dto.CategoryId, userId);
            if (category == null)
            {
                throw new Exception("Invalid category.");
            }

            var transaction = new Transaction
            {
                UserId = userId,
                Amount = dto.Amount,
                Type = dto.Type,
                Date = dto.Date,
                Description = dto.Description,
                CategoryId = dto.CategoryId
            };

            var saved = await _transactionWriterRepo.AddAsync(transaction);

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
            var existing = await _transactionReaderRepo.GetByIdAsync(dto.Id, userId);
            if (existing == null)
            {
                throw new Exception("Transaction not found.");
            }

            var category = await _categoryReaderRepo.GetByIdAsync(dto.CategoryId, userId);
            if (category == null)
            {
                throw new Exception("Invalid category.");

            }

            existing.Amount = dto.Amount;
            existing.Type = dto.Type;
            existing.Date = dto.Date;
            existing.Description = dto.Description;
            existing.CategoryId = dto.CategoryId;

            var updated = await _transactionWriterRepo.UpdateAsync(existing);

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
            return await _transactionWriterRepo.DeleteAsync(id, userId);
        }

        public async Task<IEnumerable<TransactionResponseDto>> GetByMonthAsync(string userId, int month, int year)
        {
            var transactions = await _transactionReaderRepo.GetByMonthAsync(userId, month, year);
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