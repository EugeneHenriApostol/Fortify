using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace FortifyAPI.DTO
{
    public class CreateCategoryDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
    }
}