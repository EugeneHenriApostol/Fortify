using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FortifyAPI.DTO
{
    public class TransactionUpdateDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string Description { get; set; } = string.Empty;
        public int CategoryId { get; set; }
    }
}