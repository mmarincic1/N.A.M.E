using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NAME_bekend.Database;
using NAME_bekend.Models;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

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
            List<UslugaModel> usluge = new List<UslugaModel>();
            List<OdjeljenjeModel> odjeljenja = new List<OdjeljenjeModel>();
            List<UstanovaModel> ustanove = new List<UstanovaModel>();
            List<OpstinaModel> opstine = new List<OpstinaModel>();
            List<GradModel> gradovi = new List<GradModel>();
            List<DoktorModel> doktori = new List<DoktorModel>();

            usluge.Add(new UslugaModel("Ultrazvuk abdomena", 50, 30));
            usluge.Add(new UslugaModel("CT glave", 100, 45));
            usluge.Add(new UslugaModel("Rengen ruke", 50, 10));
            usluge.Add(new UslugaModel("Operacija bruha", 250, 120));


            odjeljenja.Add(new OdjeljenjeModel("Radiologija", "1,2,3"));
            odjeljenja.Add(new OdjeljenjeModel("Ortopedija", "3,4" ));

            ustanove.Add(new UstanovaModel("KUM", true, "Sarajevska 5", "1,2"));
            ustanove.Add(new UstanovaModel("CUM", true, "Sarajevska 15", "1,2"));
            ustanove.Add(new UstanovaModel("MKUM", true, "Mostarska 5", "1,2"));
            ustanove.Add(new UstanovaModel("MCUM", true, "Mostarska 15", "1,2"));

            opstine.Add(new OpstinaModel("Novo Sarajevo", "1,2"));
            opstine.Add(new OpstinaModel("Centar", "1,2"));
            opstine.Add(new OpstinaModel("Novi Mostar", "3,4"));
            opstine.Add(new OpstinaModel("Stari Mostar", "3,4"));

            gradovi.Add(new GradModel("Sarajevo", "1,2"));
            gradovi.Add(new GradModel("Mostar", "3,4"));

            var sha = SHA256.Create();
            var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes("password")));

            doktori.Add(new DoktorModel("doktor1@gmail.com", "Doktor1", "Doktorcic1", passwordHash, false, 1, 1, "1,2"));
            doktori.Add(new DoktorModel("doktor2@gmail.com", "Doktor2", "Doktorcic2", passwordHash, false, 1, 2, "3,4"));
            doktori.Add(new DoktorModel("doktor3@gmail.com", "Doktor3", "Doktorcic3", passwordHash, false, 2, 1, "1,2"));
            doktori.Add(new DoktorModel("doktor4@gmail.com", "Doktor4", "Doktorcic4", passwordHash, false, 2, 2, "3,4"));

            users.Add(new UserModel("BR123", null, "Matko", "Matko", "M" , null, "Paromlinska", null, null, null, null));
            users.Add(new UserModel("BR124", null, "Emirko", "Emirko", "M" , null, "Grbavička 1", null, null, null, null));
            users.Add(new UserModel("BR125", null, "Nejlica", "Nejlica", "Z" , null, "Dobrinjska", null, null, null, null));
            users.Add(new UserModel("BR126", null, "Amarko", "Amarko", "M" , null, "Grbavička 2", null, null, null, null));

            _context.UserModels.AddRange(users);
            _context.UslugaModels.AddRange(usluge);
            _context.OdjeljenjeModels.AddRange(odjeljenja);
            _context.UstanovaModels.AddRange(ustanove);
            _context.OpstinaModels.AddRange(opstine);
            _context.GradModels.AddRange(gradovi);
            _context.DoktorModels.AddRange(doktori);

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

        [EnableCors("CorsPolicy")]
        [HttpGet("userExists")]
        public async Task<ActionResult<UserModel>> UserExist(UserModelRegister userModelRegister)
        {
            if (userModelRegister == null) new TFAModel("ERROR");
            UserModel user = await _context.UserModels.Where(u => 
            u.BrojZdravstveneKartice.Equals(userModelRegister.BrojZdravstveneKartice) && u.FirstName.Equals(userModelRegister.Ime)
            && u.LastName.Equals(userModelRegister.Prezime))
                .FirstOrDefaultAsync();

            if (user == null)
                return BadRequest();

            return user;
        }

        [EnableCors("CorsPolicy")]
        [HttpPost("registerUser")]
        public async Task<IActionResult> RegisterUserModel(UserModel userModel)
        {

            var sha = SHA256.Create();
            var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes(userModel.Password)));

            userModel.Password = passwordHash;

            _context.Update(userModel);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return NoContent();
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
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private bool UserModelExists(int id)
        {
            return _context.UserModels.Any(e => e.Id == id);
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
