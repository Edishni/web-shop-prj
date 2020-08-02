using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace web_shop.Models
{
    public class OrdersDetail
    {
        [Key]
        public int id { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string name { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string phone { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string city { get; set; }

        [Required]
        [Column(TypeName = "text")]
        public string address { get; set; }    

        [Required]
        [Column(TypeName = "text")]
        public string email { get; set; }

        [Required]
        [Column(TypeName = "float")]
        public float sum { get; set; }

        [Required]
        [Column(TypeName = "bit")]
        public bool delivery { get; set; }

        [Required]
        [Column(TypeName = "bit")]
        public bool orderstatus { get; set; }

        
        [Column(TypeName = "text")]
        public string wishes { get; set; }

       
        [Column(TypeName = "text")]
        public string notes { get; set; }
    }
}