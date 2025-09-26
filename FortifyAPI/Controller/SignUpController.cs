using Microsoft.AspNetCore.Mvc;
using FortifyAPI.DTO;
using FortifyAPI.Service;

namespace FortifyAPI.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class SignUpController : ControllerBase
    {
        private readonly IAuthService _authService;

        public SignUpController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody] SignUpDto dto)
        {
            var (Success, Errors, User) = await _authService.SignUpAsync(dto);

            if (!Success)
            {
                return BadRequest(Errors);
            }

            return CreatedAtAction(nameof(SignUp), new { id = User!.Id }, User);
        }
    }
}