using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CourseManagement.Business.Services
{
    public class JwtTokenService
    {
        private readonly IConfiguration _configuration;

        public JwtTokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(Guid userId, string userName, string email, string Role, bool isAccessToken)
        {
            try
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]!));
                var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, userName),
                    new Claim("UserId",userId.ToString()),
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimTypes.Role,Role)
                };

                string expiryDuration = isAccessToken ? "AccessTokenExpiryTime" : "RefreshTokenExpiryTime";

                if (int.TryParse(_configuration[$"JwtSettings:{expiryDuration}"], out int expiryTime))
                {
                    var token = new JwtSecurityToken(
                     issuer: _configuration["JwtSettings:Issuer"],
                     audience: _configuration["JwtSettings:Audience"],
                     claims: claims,
                     signingCredentials: cred,
                     expires: isAccessToken ? DateTime.UtcNow.AddMinutes(expiryTime) : DateTime.UtcNow.AddDays(expiryTime)
                     );

                    return new JwtSecurityTokenHandler().WriteToken(token);
                }
                else
                {
                    throw new ArgumentException("Invalid token duration");
                }
            }
            catch (ArgumentException e)
            {
                Console.WriteLine(e.ToString());
                return null;
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
                return null;
            }
        }


        public ClaimsPrincipal? ValidateToken(string refreshToken)
        {
            try
            {
                var tokenValidations = new TokenValidationParameters
                {
                    ValidAudience = _configuration["JwtSettings:Audience"],
                    ValidIssuer = _configuration["JwtSettings:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"])),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };


                var principal = new JwtSecurityTokenHandler().ValidateToken(refreshToken, tokenValidations, out SecurityToken validatedToken);

                return principal;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return null;
            }
        }
    }
}
