using Microsoft.EntityFrameworkCore;
using OdontoServer.Domain.Entities;

namespace OdontoServer.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Banner> Banners { get; set; }
        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<BlogBanner> BlogBanners { get; set; }
        public DbSet<MapEmbed> MapEmbeds { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();

            modelBuilder.Entity<Service>().HasData(
                new Service { Id = 1, Name = "terapias físicas" },
                new Service { Id = 2, Name = "nutrición" },
                new Service { Id = 3, Name = "mindfulness" }
            );

            modelBuilder.Entity<Banner>().HasData(
                new Banner {
                    Id = 1,
                    Title = "Servicios",
                    Subtitle = "Descubre nuestros servicios disponibles para tu bienestar integral."
                }
            );

            modelBuilder.Entity<BlogBanner>().HasData(
                new BlogBanner {
                    Id = 1,
                    Title = "Blog",
                    Subtitle = "Lee nuestros últimos artículos y novedades."
                }
            );

            modelBuilder.Entity<BlogPost>().HasData(
                new BlogPost {
                    Id = 1,
                    Image = "https://placehold.co/600x400",
                    Title = "Bienvenido a nuestro Blog",
                    Details = "Aquí encontrarás artículos y novedades para tu bienestar integral."
                }
            );

            modelBuilder.Entity<MapEmbed>().HasData(
                new MapEmbed {
                    Id = 1,
                    Embed = ""
                }
            );
        }
    }
}
