using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FortifyAPI.DTO
{
    public class TransactionDto
    {
        public decimal Amount { get; set; }
        public required string Description { get; set; }
        public DateTime Date { get; set; }
        public int CategoryId { get; set; }
    }
}