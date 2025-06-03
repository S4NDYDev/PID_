using System;

namespace OdontoServer.Domain.Entities
{
    public class Appointment
    {
        public int Id { get; set; }
        public Guid UserId { get; set; } 
        public int ServiceId { get; set; }
        public DateTime DateTime { get; set; }
        public string Status { get; set; } = "Pending";
    }
}
