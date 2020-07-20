using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web_shop.Models;

namespace web_shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemsDetailsController : ControllerBase
    {
        private readonly OrderItemsContext _context;

        public OrderItemsDetailsController(OrderItemsContext context)
        {
            _context = context;
        }

        //// GET: api/OrderItemsDetails
        //[HttpGet]
        //public IEnumerable<OrderItemsDetail> Getorder_items()
        //{
        //    return _context.order_items;
        //}

        // GET: api/OrderItemsDetails?orderID = 2 <<< NEW
        [HttpGet]
        public IEnumerable<OrderItemsDetail> GetOrderItemsByOrderID([FromQuery] int orderID)
        {
            if (orderID > 0)
            {
                return _context.order_items.Where(e => e.orderID == orderID);
            }
            return _context.order_items;
        }

        // GET: api/OrderItemsDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderItemsDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orderItemsDetail = await _context.order_items.FindAsync(id);

            if (orderItemsDetail == null)
            {
                return NotFound();
            }

            return Ok(orderItemsDetail);
        }

        // PUT: api/OrderItemsDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderItemsDetail([FromRoute] int id, [FromBody] OrderItemsDetail orderItemsDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orderItemsDetail.id)
            {
                return BadRequest();
            }

            _context.Entry(orderItemsDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderItemsDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OrderItemsDetails
        [HttpPost]
        public async Task<IActionResult> PostOrderItemsDetail([FromBody] OrderItemsDetail orderItemsDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.order_items.Add(orderItemsDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderItemsDetail", new { id = orderItemsDetail.id }, orderItemsDetail);
        }

        // DELETE: api/OrderItemsDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderItemsDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orderItemsDetail = await _context.order_items.FindAsync(id);
            if (orderItemsDetail == null)
            {
                return NotFound();
            }

            _context.order_items.Remove(orderItemsDetail);
            await _context.SaveChangesAsync();

            return Ok(orderItemsDetail);
        }

        private bool OrderItemsDetailExists(int id)
        {
            return _context.order_items.Any(e => e.id == id);
        }
    }
}