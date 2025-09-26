using Microsoft.EntityFrameworkCore;
using FortifyAPI.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace FortifyAPI.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) :
            base(options)
        { }
            public DbSet<Budget> Budgets { get; set; }
            public DbSet<Category> Categories { get; set; }
            public DbSet<Transaction> Transactions { get; set; }

            // fluent api
            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);


                // user -> transactions (one to many)
                modelBuilder.Entity<User>()
                    .HasMany(u => u.Transactions)
                    .WithOne(t => t.User)
                    .HasForeignKey(t => t.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                // user -> category (one to many)
                modelBuilder.Entity<User>()
                    .HasMany(u => u.Categories)
                    .WithOne(c => c.User)
                    .HasForeignKey(c => c.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                // user -> budget (one to many)
                modelBuilder.Entity<User>()
                    .HasMany(u => u.Budgets)
                    .WithOne(b => b.User)
                    .HasForeignKey(b => b.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                // category -> transaction (one to many)
                modelBuilder.Entity<Category>()
                    .HasMany(c => c.Transactions)
                    .WithOne(t => t.Category)
                    .HasForeignKey(t => t.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);

                // category -> budget (one to many)
                modelBuilder.Entity<Category>()
                    .HasMany(c => c.Budgets)
                    .WithOne(b => b.Category)
                    .HasForeignKey(b => b.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);

                // set precision for decimals
                modelBuilder.Entity<Budget>()
                    .Property(b => b.LimitAmount)
                    .HasPrecision(18, 2);

                modelBuilder.Entity<Transaction>()
                    .Property(t => t.Amount)
                    .HasPrecision(18, 2);
            }
    }
}