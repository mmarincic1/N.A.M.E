using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NAME_bekend.Database;
using NAME_bekend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace NAME_bekend.Controllers
{
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public AuthController(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet("add")]
        public async Task<ActionResult<List<UserModel>>> CreateUserTestMethod()
        {
           
            List<UserModel> users = new List<UserModel>();
            var sha = SHA256.Create();
            var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes("password")));

            users.Add(new UserModel("matko@gmail.com", "Matko", "Matko", passwordHash));
            users.Add(new UserModel("emirko@gmail.com", "Emirko", "Emirko", passwordHash));
            users.Add(new UserModel("nejlica@gmail.com", "Nejlica", "Nejlica", passwordHash));
            users.Add(new UserModel("amarko@gmail.com", "Amarko", "Amarko", passwordHash));
            _context.UserModels.AddRange(users);
            await _context.SaveChangesAsync();
            return users;

            // AKO VRATI BAD REQUEST POZOVITE SLIJEDECI GET PRIJE:
            return BadRequest();

        }


        [EnableCors("CorsPolicy")]
        [HttpPost("login")]
        public async Task<ActionResult<TFAModel>> Login(UserDto userDto)
        {

            Console.WriteLine("inside post");
            if (userDto == null) new TFAModel("ERROR");
            UserModel user = await _context.UserModels.Where(u => u.Email.Equals(userDto.Email)).FirstOrDefaultAsync();
            var sha = SHA256.Create();
            var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes(userDto.Password)));
            Console.WriteLine(passwordHash);
            Console.WriteLine(userDto.Password);
            if (user == null || !passwordHash.Equals(user.Password))
            {
                return new TFAModel("ERROR");
            }
            //user.Question = await _context.SecurityQuestionModels.FindAsync(user.QuestionId);
            string token = CreateToken(user);

            CookieOptions cookieOptions = new CookieOptions();
            cookieOptions.Secure = false;
            cookieOptions.HttpOnly = false;
            cookieOptions.Expires = DateTime.UtcNow.AddMinutes(30);
            cookieOptions.SameSite = SameSiteMode.None;
            Response.Cookies.Append("jwt", token, cookieOptions);

            return new TFAModel(token);
        }


        protected string CreateToken(UserModel user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
