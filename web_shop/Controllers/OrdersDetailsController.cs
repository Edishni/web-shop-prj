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
    public class OrdersDetailsController : ControllerBase
    {
        private readonly OrdersContext _context;

        public OrdersDetailsController(OrdersContext context)
        {
            _context = context;
        }

        // GET: api/OrdersDetails
        [HttpGet]
        public IEnumerable<OrdersDetail> Getorders()
        {
            return _context.orders;
        }

        // GET: api/OrdersDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrdersDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ordersDetail = await _context.orders.FindAsync(id);

            if (ordersDetail == null)
            {
                return NotFound();
            }

            return Ok(ordersDetail);
        }

        // PUT: api/OrdersDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrdersDetail([FromRoute] int id, [FromBody] OrdersDetail ordersDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ordersDetail.id)
            {
                return BadRequest();
            }

            _context.Entry(ordersDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdersDetailExists(id))
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

        // POST: api/OrdersDetails
        [HttpPost]
        public async Task<IActionResult> PostOrdersDetail([FromBody] OrdersDetail ordersDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.orders.Add(ordersDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrdersDetail", new { id = ordersDetail.id }, ordersDetail);
        }

        // DELETE: api/OrdersDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrdersDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ordersDetail = await _context.orders.FindAsync(id);
            if (ordersDetail == null)
            {
                return NotFound();
            }

            _context.orders.Remove(ordersDetail);
            await _context.SaveChangesAsync();

            return Ok(ordersDetail);
        }

        private bool OrdersDetailExists(int id)
        {
            return _context.orders.Any(e => e.id == id);
        }
    }
}