using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace web_shop.Models
{
    public class UsersDetail
    {

        [Key]
        public int id { get; set; }

        [Required]
        [Column(TypeName = "text")]
        public string name { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string phone { get; set; }

        [Required]
        [Column(TypeName = "text")]
        public string email { get; set; }
    }
}