using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FortifyAPI.DTO
{
    public class BudgetResponseDto
    {
        public int Id { get; set; }
        public decimal LimitAmount { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}