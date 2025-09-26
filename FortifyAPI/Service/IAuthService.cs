using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using FortifyAPI.DTO;

namespace FortifyAPI.Service
{
    public interface IAuthService
    {
        Task<(bool Success, string? Token, string? ErrorMessage, object? User)> LoginAsync(LoginDto dto);
        Task<(bool Success, IEnumerable<IdentityError>? Errors, object? User)> SignUpAsync(SignUpDto dto);
    }
}