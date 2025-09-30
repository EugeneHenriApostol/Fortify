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
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        private string GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var userId = GetUserId();
            var transactions = await _transactionService.GetAllAsync(userId);
            return Ok(transactions); // List<TransactionResponseDto>
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userId = GetUserId();
            var transaction = await _transactionService.GetByIdAsync(id, userId);
            return transaction != null ? Ok(transaction) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TransactionCreateDto dto)
        {
            var userId = GetUserId();
            var created = await _transactionService.AddAsync(dto, userId);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TransactionUpdateDto dto)
        {
            var userId = GetUserId();
            if (id != dto.Id)
            {
                return BadRequest("Transaction ID mismatch.");
            }

            var updated = await _transactionService.UpdateAsync(dto, userId);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetUserId();
            var deleted = await _transactionService.DeleteAsync(id, userId);
            return deleted ? NoContent() : NotFound();
        }
    }
}