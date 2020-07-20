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
    public class UsersDetailsController : ControllerBase
    {
        private readonly UsersContext _context;

        public UsersDetailsController(UsersContext context)
        {
            _context = context;
        }

        // GET: api/UsersDetails
        [HttpGet]
        public IEnumerable<UsersDetail> Getuser()
        {
            return _context.user;
        }

        // GET: api/UsersDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsersDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var usersDetail = await _context.user.FindAsync(id);

            if (usersDetail == null)
            {
                return NotFound();
            }

            return Ok(usersDetail);
        }

        // PUT: api/UsersDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsersDetail([FromRoute] int id, [FromBody] UsersDetail usersDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != usersDetail.id)
            {
                return BadRequest();
            }

            _context.Entry(usersDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersDetailExists(id))
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

        // POST: api/UsersDetails
        [HttpPost]
        public async Task<IActionResult> PostUsersDetail([FromBody] UsersDetail usersDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.user.Add(usersDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsersDetail", new { id = usersDetail.id }, usersDetail);
        }

        // DELETE: api/UsersDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsersDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var usersDetail = await _context.user.FindAsync(id);
            if (usersDetail == null)
            {
                return NotFound();
            }

            _context.user.Remove(usersDetail);
            await _context.SaveChangesAsync();

            return Ok(usersDetail);
        }

        private bool UsersDetailExists(int id)
        {
            return _context.user.Any(e => e.id == id);
        }
    }
}