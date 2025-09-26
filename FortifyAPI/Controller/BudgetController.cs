using System.Security.Claims;
using FortifyAPI.DTO;
using FortifyAPI.Model;
using FortifyAPI.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FortifyAPI.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class BudgetController : ControllerBase
    {
        private readonly IBudgetService _budgetService;
        private readonly UserManager<User> _userManager;

        public BudgetController(IBudgetService budgetService, UserManager<User> userManager)
        {
            _budgetService = budgetService;
            _userManager = userManager;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SetBudget([FromBody] BudgetDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            foreach (var claim in User.Claims)
            {
                Console.WriteLine($"{claim.Type}: {claim.Value}");
            }
            if (userId == null)
            {
                return Unauthorized();
            }

            var budget = await _budgetService.SetBudgetAsync(userId, dto);
            return Ok(budget);
        }

        [HttpGet("{month}/{year}")]
        [Authorize]
        public async Task<IActionResult> GetBudget(int month, int year)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var budget = await _budgetService.GetBudgetAsync(userId, month, year);
            if (budget == null)
            {
                return NotFound();
            }

            return Ok(budget);
        }
    }
}