using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OdontoServer.Infrastructure.Data;
using OdontoServer.Domain.Entities;

namespace OdontoServer.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ServicesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Service>>> GetServices()
        {
            return await _context.Services.ToListAsync();
        }

        // GET: api/services/banner
        [HttpGet("banner")]
        public async Task<ActionResult<Banner>> GetBanner()
        {
            var banner = await _context.Banners.FirstOrDefaultAsync(b => b.Id == 1);
            if (banner == null) return NotFound();
            return banner;
        }

        // PUT: api/services/banner
        [HttpPut("banner")]
        public async Task<IActionResult> UpdateBanner([FromBody] Banner updatedBanner)
        {
            var banner = await _context.Banners.FirstOrDefaultAsync(b => b.Id == 1);
            if (banner == null) return NotFound();
            banner.Title = updatedBanner.Title;
            banner.Subtitle = updatedBanner.Subtitle;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
