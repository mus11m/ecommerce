﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using ecommerce.Models;

namespace ecommerce.ViewModels.Product
{
    public class ProductWithListOfCatesViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [DisplayFormat(NullDisplayText = "No Description yet")]
        public string? Description { get; set; }

        public string ImageUrl { get; set; } = "wwwroot/images/sfdsdf";  // default image

        [NotMapped]
        public IFormFile image { get; set; }


        [Column(TypeName = "Money")]
        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public string Color { get; set; }

        public int MyProperty { get; set; }

        [DisplayFormat(NullDisplayText = "No Rating yet")]
        [Column(TypeName = "Money")]

        public decimal? Rating { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        public List<ecommerce.Models.Category>? categories { get; set; }

    }
}
