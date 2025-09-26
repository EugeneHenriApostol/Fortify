using Microsoft.AspNetCore.Mvc;
using FortifyAPI.DTO;
using FortifyAPI.Service;

namespace FortifyAPI.Controller
{
    [ApiController]
    [Route("api/[Controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService _authService;

        public LoginController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var (Success, Token, ErrorMessage, User) = await _authService.LoginAsync(dto);

            if (!Success)
            {
                return Unauthorized(new { message = ErrorMessage });
            }

            return Ok(new { token = Token, user = User });
        }
    }

}