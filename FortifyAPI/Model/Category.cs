using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace FortifyAPI.Model
{
    public class Category : BaseEntity
    {
        [Required]
        [MaxLength(50)]
        public required string Name { get; set; }
        [Required]
        public required string Type { get; set; } // income or expense

        // foreign key
        public string? UserId { get; set; }
        public User? User { get; set; }

        // navigation properties
        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}