using Microsoft.AspNetCore.Mvc;
using OdontoServer.Infrastructure.Data;
using OdontoServer.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace OdontoServer.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ContactsController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/contacts
        [HttpPost]
        public async Task<IActionResult> PostContact([FromBody] ContactMessage message)
        {
            message.CreatedAt = DateTime.UtcNow;
            _context.ContactMessages.Add(message);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // GET: api/contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactMessage>>> GetContacts()
        {
            var contacts = await _context.ContactMessages.OrderByDescending(c => c.CreatedAt).ToListAsync();
            return Ok(contacts);
        }
    }
}
