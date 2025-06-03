using OdontoServer.Application.DTOs;
using OdontoServer.Domain.Entities;
using OdontoServer.Domain.Ports;
using OdontoServer.Infrastructure.Adapters;
using BCrypt.Net;

namespace OdontoServer.Application.Services
{
    public class AuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtTokenService _jwtTokenService;
        public AuthService(IUserRepository userRepository, JwtTokenService jwtTokenService)
        {
            _userRepository = userRepository;
            _jwtTokenService = jwtTokenService;
        }

        public async Task<string?> RegisterAsync(UserRegisterDto dto)
        {
            if (await _userRepository.GetByUsernameAsync(dto.Username) != null ||
                await _userRepository.GetByEmailAsync(dto.Email) != null)
                return null; // User exists
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };
            await _userRepository.AddUserAsync(user);
            return _jwtTokenService.GenerateToken(user);
        }

        public async Task<string?> LoginAsync(UserLoginDto dto)
        {
            var user = await _userRepository.GetByUsernameAsync(dto.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return null;
            return _jwtTokenService.GenerateToken(user);
        }
    }
}
