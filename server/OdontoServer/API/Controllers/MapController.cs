using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OdontoServer.Infrastructure.Data;
using OdontoServer.Domain.Entities;

namespace OdontoServer.API.Controllers
{
    [ApiController]
    [Route("api/map/embed")]
    public class MapController : ControllerBase
    {
        private readonly AppDbContext _context;
        public MapController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/map/embed
        [HttpGet]
        public async Task<ActionResult<MapEmbed>> GetMapEmbed()
        {
            var map = await _context.MapEmbeds.FirstOrDefaultAsync(m => m.Id == 1);
            if (map == null) return NotFound();
            return map;
        }

        // PUT: api/map/embed
        [HttpPut]
        public async Task<IActionResult> UpdateMapEmbed([FromBody] MapEmbed updatedMap)
        {
            var map = await _context.MapEmbeds.FirstOrDefaultAsync(m => m.Id == 1);
            if (map == null) return NotFound();
            map.Embed = updatedMap.Embed;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
