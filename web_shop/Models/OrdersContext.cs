using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web_shop.Models
{
    public class OrdersContext :DbContext
    {
        public OrdersContext(DbContextOptions<OrdersContext> options): base(options)
        {

        }
            public DbSet<OrdersDetail> orders { get; set; }
    }

   
}
