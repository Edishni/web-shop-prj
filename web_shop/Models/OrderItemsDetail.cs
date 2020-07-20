using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace web_shop.Models
{
    public class OrderItemsDetail
    {
        [Key]
        public int id { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int orderID { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int productID { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int quantity { get; set; }

    }
}