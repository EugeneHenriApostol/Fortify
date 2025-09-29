using Microsoft.AspNetCore.Mvc;
using FortifyAPI.DTO;
using FortifyAPI.Service;
using Microsoft.AspNetCore.Authorization;

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

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(6)
            };

            if (Token == null)
            {
                return Unauthorized(new { message = "Login failed" });
            }

            Response.Cookies.Append("jwt", Token, cookieOptions);

            return Ok(new { token = Token, user = User });
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            return Ok(new { message = "Authenticated" });
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(-1)
            };

            Response.Cookies.Append("jwt", "", cookieOptions);

            return Ok(new { message = "Logged out successfully" });
        }
    }
}