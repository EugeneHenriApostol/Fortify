using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FortifyAPI.Model;

namespace FortifyAPI.DTO
{
    public class BudgetDto
    {
        public decimal Amount { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
    }
}