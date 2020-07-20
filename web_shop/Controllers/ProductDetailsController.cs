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
    public class ProductDetailsController : ControllerBase
    {
        private readonly ProductContext _context;

        public ProductDetailsController(ProductContext context)
        {
            _context = context;
        }

        // GET: api/ProductDetails
        [HttpGet]
        public IEnumerable<ProductDetail> Getproducts()
        {
            return _context.products;
        }

        // GET: api/ProductDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productDetail = await _context.products.FindAsync(id);

            if (productDetail == null)
            {
                return NotFound();
            }

            return Ok(productDetail);
        }

        // PUT: api/ProductDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductDetail([FromRoute] int id, [FromBody] ProductDetail productDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productDetail.id)
            {
                return BadRequest();
            }

            _context.Entry(productDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductDetailExists(id))
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

        // POST: api/ProductDetails
        [HttpPost]
        public async Task<IActionResult> PostProductDetail([FromBody] ProductDetail productDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.products.Add(productDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductDetail", new { id = productDetail.id }, productDetail);
        }

        // DELETE: api/ProductDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productDetail = await _context.products.FindAsync(id);
            if (productDetail == null)
            {
                return NotFound();
            }

            _context.products.Remove(productDetail);
            await _context.SaveChangesAsync();

            return Ok(productDetail);
        }

        private bool ProductDetailExists(int id)
        {
            return _context.products.Any(e => e.id == id);
        }
    }
}