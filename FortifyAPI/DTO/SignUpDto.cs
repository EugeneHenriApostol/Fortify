using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace FortifyAPI.DTO
{
    public class SignUpDto
    {
        [Required, EmailAddress]
        public required string Email { get; set; }

        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Password { get; set; }
    }
}