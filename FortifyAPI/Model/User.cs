using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace FortifyAPI.Model
{
    public class User : IdentityUser
    {
        [Required]
        [MaxLength(50)]
        public required string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public required string LastName { get; set; }

        // navigation properties
        public ICollection<Budget> Budgets { get; set; } = new List<Budget>();
        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
        public ICollection<Category> Categories { get; set; } = new List<Category>();
    }
}