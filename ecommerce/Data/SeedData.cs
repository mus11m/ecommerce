﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ecommerce.Models;
using System;

namespace ecommerce.Data
{
    public static class SeedData
    {
        private static readonly DateTime StaticOrderDate = new DateTime(2024, 5, 1);
        private static readonly DateTime StaticShipmentDate = new DateTime(2024, 5, 3);
        private static readonly PasswordHasher<ApplicationUser> _passwordHasher = new();

        public static void Initialize(ModelBuilder modelBuilder)
        {
            // Seed Roles
            SeedRoles(modelBuilder);

            // Seed Users
            SeedUsers(modelBuilder);

            // Seed Categories
            SeedCategories(modelBuilder);

            // Seed Products
            SeedProducts(modelBuilder);

            // Seed Carts
            SeedCarts(modelBuilder);

            // Seed CartItems
            SeedCartItems(modelBuilder);

            // Seed Orders
            SeedOrders(modelBuilder);

            // Seed OrderItems
            SeedOrderItems(modelBuilder);

            // Seed Shipments
            SeedShipments(modelBuilder);

            // Seed Comments
            SeedComments(modelBuilder);
        }

        private static void SeedRoles(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = "d7b9a9a0-1b9f-4b3d-9c7a-7a1b9f4b3d9c",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                }
            );
        }

        private static void SeedUsers(ModelBuilder modelBuilder)
        {
            var adminUser = new ApplicationUser
            {
                Id = "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                UserName = "admin@store.com",
                NormalizedUserName = "ADMIN@STORE.COM",
                Email = "admin@store.com",
                NormalizedEmail = "ADMIN@STORE.COM",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                SecurityStamp = "static-security-stamp-1234",
                ConcurrencyStamp = "static-concurrency-stamp-1234"
            };

            adminUser.PasswordHash = "AQAAAAIAAYagAAAAEO199WOzDkPydv/Iqc3a2zez0yi3adJpveTuzV527q7P9pIMRZ7e5m0Sce0fzx4/+w==";

            modelBuilder.Entity<ApplicationUser>().HasData(adminUser);

            // Add user to Admin role
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    UserId = "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                    RoleId = "d7b9a9a0-1b9f-4b3d-9c7a-7a1b9f4b3d9c"
                }
            );
        }

        private static void SeedCategories(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                new Category
                {
                    Id = 1,
                    Name = "Electronics",
                    Description = "Latest electronic gadgets",
                    ImageUrl = "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&auto=format&fit=crop"
                },
                new Category
                {
                    Id = 2,
                    Name = "Books",
                    Description = "Bestselling books",
                    ImageUrl = "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=600&auto=format&fit=crop"
                },
                new Category
                {
                    Id = 3,
                    Name = "Clothing",
                    Description = "Fashionable clothing",
                    ImageUrl = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=600&auto=format&fit=crop"
                }
            );
        }

        private static void SeedProducts(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "Wireless Headphones",
                    Description = "Noise-cancelling Bluetooth headphones",
                    Price = 199.99m,
                    Quantity = 50,
                    Color = "Black",
                    ImageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&auto=format&fit=crop",
                    CategoryId = 1
                },
                new Product
                {
                    Id = 2,
                    Name = "Programming Book",
                    Description = "C# Programming Guide",
                    Price = 49.99m,
                    Quantity = 100,
                    Color = "White",
                    ImageUrl = "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&h=600&auto=format&fit=crop",
                    CategoryId = 2
                },
                new Product
                {
                    Id = 3,
                    Name = "T-Shirt",
                    Description = "Cotton crew-neck t-shirt",
                    Price = 29.99m,
                    Quantity = 200,
                    Color = "Blue",
                    ImageUrl = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&auto=format&fit=crop",
                    CategoryId = 3
                }
            );
        }

        private static void SeedCarts(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cart>().HasData(
                new Cart
                {
                    Id = 1,
                    ApplicationUserId = "a18be9c0-aa65-4af8-bd17-00bd9344e575"
                }
            );
        }

        private static void SeedCartItems(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CartItem>().HasData(
                new CartItem
                {
                    Id = 1,
                    Quantity = 2,
                    ProductId = 1,
                    CartId = 1
                },
                new CartItem
                {
                    Id = 2,
                    Quantity = 1,
                    ProductId = 2,
                    CartId = 1
                }
            );
        }

        private static void SeedOrders(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>().HasData(
                new Order
                {
                    Id = 1,
                    OrderDate = StaticOrderDate,
                    ApplicationUserId = "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                    ShipmentId = 1
                }
            );
        }

        private static void SeedOrderItems(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderItem>().HasData(
                new OrderItem
                {
                    Id = 1,
                    Quantity = 1,
                    ProductId = 1,
                    OrderId = 1
                }
            );
        }

        private static void SeedShipments(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Shipment>().HasData(
                new Shipment
                {
                    Id = 1,
                    Address = "123 Main St",
                    City = "New York",
                    Region = "NY",
                    PostalCode = "10001",
                    Country = "USA",
                    Date = StaticShipmentDate,
                    UserId = "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                    OrderId = 1
                }
            );
        }

        private static void SeedComments(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>().HasData(
                new Comment
                {
                    Id = 1,
                    text = "Great product!",
                    ProductId = 1,
                    UserId = "a18be9c0-aa65-4af8-bd17-00bd9344e575"
                }
            );
        }
    }
}