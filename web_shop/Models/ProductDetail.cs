using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace web_shop.Models
{
    public class ProductDetail
    {
        [Key]
        public int id { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string prodname { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string category { get; set; }

        [Required]
        [Column(TypeName = "text")]
        public string urlpicture { get; set; }

        [Required]
        [Column(TypeName = "text")]
        public string description { get; set; }

        [Required]
        [Column(TypeName = "float")]
        public float cost { get; set; }
    }
}