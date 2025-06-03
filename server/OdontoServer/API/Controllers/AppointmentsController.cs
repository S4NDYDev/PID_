using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OdontoServer.Infrastructure.Data;
using OdontoServer.Domain.Entities;
using System.Security.Claims;

namespace OdontoServer.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AppointmentsController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/appointments
        [HttpPost]
        public async Task<IActionResult> CreateAppointment([FromBody] Appointment appointment)
        {
            // Get user id from JWT as GUID
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            appointment.UserId = userId;
            appointment.Status = "Pending";
            // Ensure DateTime is UTC
            if (appointment.DateTime.Kind == DateTimeKind.Unspecified)
            {
                appointment.DateTime = DateTime.SpecifyKind(appointment.DateTime, DateTimeKind.Utc);
            }
            else
            {
                appointment.DateTime = appointment.DateTime.ToUniversalTime();
            }
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();
            return Ok(appointment);
        }

        // GET: api/appointments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetUserAppointments()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var appointments = await _context.Appointments
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.DateTime)
                .ToListAsync();
            return Ok(appointments);
        }
    }
}
