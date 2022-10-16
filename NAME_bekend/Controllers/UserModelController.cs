using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NAME_bekend.Database;
using NAME_bekend.Models;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace NAME_bekend.Controllers
{
    [ApiController]
    [EnableCors("CorsPolicy")]
    [Route("[controller]")]
    public class UserModelController : ControllerBase
    {

        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public UserModelController(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        // GET: /userModels
        [HttpGet(Name = "usermodels")]
        public IEnumerable<UserModel> GetUserModels()
        {

            //treba uzet token i pozvati ValidateToken, ako je validan nastaviti, a ako ne samo nek preskoci da vrati bad result
            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);

            if (ValidateToken(token) != null)
            {
                var data = _context.UserModels.AsNoTracking().ToArray();
                Console.WriteLine("OVO POGLEDAJ" + data);
                return data;
            }

            return Enumerable.Empty<UserModel>();


        }


        [HttpPost(Name = "user/{id}")]
        public async Task<ActionResult<UserModel>> GetUser(int id)
        {

            UserModel user = await _context.UserModels.Where(u => u.Id == id).FirstOrDefaultAsync();

            if (user == null)
                return BadRequest();

            return user;

        }


        protected JwtSecurityToken ValidateToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            TokenValidationParameters validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };
            try
            {
                handler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                return jwtToken;
            }
            catch
            {
                return null;
            }
        }

    }
}
