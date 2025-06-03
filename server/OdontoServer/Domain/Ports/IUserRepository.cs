using OdontoServer.Domain.Entities;
using System.Threading.Tasks;

namespace OdontoServer.Domain.Ports
{
    public interface IUserRepository
    {
        Task<User?> GetByUsernameAsync(string username);
        Task<User?> GetByEmailAsync(string email);
        Task AddUserAsync(User user);
    }
}
