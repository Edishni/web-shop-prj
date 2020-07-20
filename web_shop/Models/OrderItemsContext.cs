using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web_shop.Models
{
    public class OrderItemsContext : DbContext
    {
        public OrderItemsContext(DbContextOptions<OrderItemsContext> options) : base(options)
        {

        }
        public DbSet<OrderItemsDetail> order_items { get; set; }
    }
    
    
}
