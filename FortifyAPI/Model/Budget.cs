using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace FortifyAPI.Model
{
    public class Budget : BaseEntity
    {
        [Required]
        public decimal LimitAmount { get; set; }
        [Required]
        public int Month { get; set; }
        [Required]
        public int Year { get; set; }

        // foreign keys
        public required string UserId { get; set; }
        public required User User { get; set; }

        public int CategoryId { get; set; }
        public required Category Category { get; set; }
    }
}