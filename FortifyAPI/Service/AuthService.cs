using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.Model;
using Microsoft.AspNetCore.Identity;
using FortifyAPI.DTO;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace FortifyAPI.Service
{
    public class AuthService : IAuthService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public AuthService(SignInManager<User> signInManager,
                            UserManager<User> userManager,
                            IConfiguration configuration)
        {

            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<(bool Success, string? Token, string? ErrorMessage, object? User)> LoginAsync(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                return (false, null, "Invalid Email or Password", null);
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
            if (!result.Succeeded)
            {
                return (false, null, "Invalid Email or Password", null);
            }

            // generate jwt
            var tokenHandler = new JwtSecurityTokenHandler();
            var secret = _configuration["Jwt:Secret"];
            if (string.IsNullOrEmpty(secret))
            {
                throw new Exception("JWT Secret not configured");
            }
            var key = Encoding.UTF8.GetBytes(secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty)
                }),
                Expires = DateTime.UtcNow.AddHours(6),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            var userInfo = new { user.Id, user.FirstName, user.LastName, user.Email };
            return (true, jwtToken, null, userInfo);
        }

        public async Task<(bool Success, IEnumerable<IdentityError>? Errors, UserResponseDto? User)> SignUpAsync(SignUpDto dto)
        {
            if (await _userManager.FindByEmailAsync(dto.Email) != null)
            {
                return (false, new[] { new IdentityError { Description = "Email already registered" } }, null);
            }

            var user = new User
            {
                UserName = dto.Email,
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            var userInfo = new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };

            return (result.Succeeded, result.Errors, userInfo);
        }
    }
}