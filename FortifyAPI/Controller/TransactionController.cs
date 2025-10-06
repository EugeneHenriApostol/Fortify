using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.Model;
using FortifyAPI.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using FortifyAPI.DTO;

namespace FortifyAPI.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionWriterService _transactionWriterService;
        private readonly ITransactionReaderService _transactionReaderService;

        public TransactionController(ITransactionWriterService transactionWriterService,
                ITransactionReaderService transactionReaderService)
        {
            _transactionWriterService = transactionWriterService;
            _transactionReaderService = transactionReaderService;
        }

        private string GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var userId = GetUserId();
            var transactions = await _transactionReaderService.GetAllAsync(userId);
            return Ok(transactions); // List<TransactionResponseDto>
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            var userId = GetUserId();
            var transaction = await _transactionReaderService.GetByIdAsync(id, userId);
            return transaction != null ? Ok(transaction) : NotFound();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] TransactionCreateDto dto)
        {
            var userId = GetUserId();
            var created = await _transactionWriterService.AddAsync(dto, userId);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] TransactionUpdateDto dto)
        {
            var userId = GetUserId();
            if (id != dto.Id)
            {
                return BadRequest("Transaction ID mismatch.");
            }

            var updated = await _transactionWriterService.UpdateAsync(dto, userId);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetUserId();
            var deleted = await _transactionWriterService.DeleteAsync(id, userId);
            return deleted ? NoContent() : NotFound();
        }

        [HttpGet("month/{month}/{year}")]
        public async Task<IActionResult> GetByMonth(int month, int year)
        {
            var userId = GetUserId();
            var transactions = await _transactionReaderService.GetByMonthAsync(userId, month, year);
            return Ok(transactions);
        }
    }
}