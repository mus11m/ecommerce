using System.ComponentModel.DataAnnotations.Schema;

namespace ecommerce.Models
{
    public class Cart
    {
        public int Id { get; set; }

        public List<CartItem>? CartItems { get; set; }

        [ForeignKey("User")]
        public string ApplicationUserId { get; set; }

        public ApplicationUser User { get; set; }

    }
}
