using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OdontoServer.Infrastructure.Data;
using OdontoServer.Domain.Entities;

namespace OdontoServer.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogController : ControllerBase
    {
        private readonly AppDbContext _context;
        public BlogController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/blog
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogPost>>> GetBlogPosts()
        {
            return await _context.BlogPosts.ToListAsync();
        }

        // GET: api/blog/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogPost>> GetBlogPost(int id)
        {
            var post = await _context.BlogPosts.FindAsync(id);
            if (post == null) return NotFound();
            return post;
        }

        // POST: api/blog
        [HttpPost]
        public async Task<ActionResult<BlogPost>> CreateBlogPost([FromBody] BlogPost post)
        {
            // Ignore any id from payload
            post.Id = 0;
            _context.BlogPosts.Add(post);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBlogPost), new { id = post.Id }, post);
        }

        // PUT: api/blog/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlogPost(int id, [FromBody] BlogPost updatedPost)
        {
            var post = await _context.BlogPosts.FindAsync(id);
            if (post == null) return NotFound();
            // Only update fields, do not use id from payload
            post.Image = updatedPost.Image;
            post.Title = updatedPost.Title;
            post.Details = updatedPost.Details;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // GET: api/blog/banner
        [HttpGet("banner")]
        public async Task<ActionResult<BlogBanner>> GetBlogBanner()
        {
            var banner = await _context.BlogBanners.FirstOrDefaultAsync(b => b.Id == 1);
            if (banner == null) return NotFound();
            return banner;
        }

        // PUT: api/blog/banner
        [HttpPut("banner")]
        public async Task<IActionResult> UpdateBlogBanner([FromBody] BlogBanner updatedBanner)
        {
            var banner = await _context.BlogBanners.FirstOrDefaultAsync(b => b.Id == 1);
            if (banner == null) return NotFound();
            banner.Title = updatedBanner.Title;
            banner.Subtitle = updatedBanner.Subtitle;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
