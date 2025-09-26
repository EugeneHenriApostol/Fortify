using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using FortifyAPI.Model;
using FortifyAPI.DTO;

namespace FortifyAPI.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class SignUpController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        public SignUpController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody] SignUpDto dto)
        {
            // check if email is already taken
            if (await _userManager.FindByEmailAsync(dto.Email) != null)
            {
                return BadRequest(new { message = "Email already registered." });
            }

            // create user object
            var user = new User
            {
                UserName = dto.Email,
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
            };

            // create user with hashed password
            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return CreatedAtAction(nameof(SignUp), new { id = user.Id }, new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email
            });
        }
    }
}