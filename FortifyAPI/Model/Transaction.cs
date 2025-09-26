using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace FortifyAPI.Model
{
    public class Transaction : BaseEntity
    {
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public required string Type { get; set; } // income or expense
        [Required]
        public DateTime Date { get; set; } = DateTime.UtcNow;
        [Required]
        public required string Description { get; set; }

        // foreign keys
        public required string UserId { get; set; }
        public required User User { get; set; }

        public int CategoryId { get; set; }
        public required Category Category { get; set; }
    }
}