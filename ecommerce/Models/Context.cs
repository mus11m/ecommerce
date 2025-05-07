using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity; // Add this using statement

namespace ecommerce.Models
{
    public class Context : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Category> Category { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<CartItem> CartItem { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderItem> OrderItem { get; set; }
        public DbSet<Shipment> Shipment { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public Context() : base() { }

        public Context(DbContextOptions<Context> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Seed the "Admin" role with a static GUID
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = "d7b9a9a0-1b9f-4b3d-9c7a-7a1b9f4b3d9c", // Replace with your own GUID
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                }
            );

            // Unique index for ApplicationUser's Email
            builder.Entity<ApplicationUser>().HasIndex(appUser => appUser.Email)
                .IsUnique();
        }
    }
}