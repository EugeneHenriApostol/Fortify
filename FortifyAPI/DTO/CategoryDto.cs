using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FortifyAPI.DTO
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public required string Name { get; set; } = string.Empty;
        public required string Type { get; set; } = string.Empty;
    }
}