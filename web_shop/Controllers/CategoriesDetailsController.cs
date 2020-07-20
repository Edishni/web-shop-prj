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
    public class CategoriesDetailsController : ControllerBase
    {
        private readonly CategoriesContext _context;

        public CategoriesDetailsController(CategoriesContext context)
        {
            _context = context;
        }

        // GET: api/CategoriesDetails
        [HttpGet]
        public IEnumerable<CategoriesDetail> Getcategories()
        {
            return _context.categories;
        }

        // GET: api/CategoriesDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoriesDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var categoriesDetail = await _context.categories.FindAsync(id);

            if (categoriesDetail == null)
            {
                return NotFound();
            }

            return Ok(categoriesDetail);
        }

        // PUT: api/CategoriesDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoriesDetail([FromRoute] int id, [FromBody] CategoriesDetail categoriesDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != categoriesDetail.id)
            {
                return BadRequest();
            }

            _context.Entry(categoriesDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoriesDetailExists(id))
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

        // POST: api/CategoriesDetails
        [HttpPost]
        public async Task<IActionResult> PostCategoriesDetail([FromBody] CategoriesDetail categoriesDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.categories.Add(categoriesDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategoriesDetail", new { id = categoriesDetail.id }, categoriesDetail);
        }

        // DELETE: api/CategoriesDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoriesDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var categoriesDetail = await _context.categories.FindAsync(id);
            if (categoriesDetail == null)
            {
                return NotFound();
            }

            _context.categories.Remove(categoriesDetail);
            await _context.SaveChangesAsync();

            return Ok(categoriesDetail);
        }

        private bool CategoriesDetailExists(int id)
        {
            return _context.categories.Any(e => e.id == id);
        }
    }
}