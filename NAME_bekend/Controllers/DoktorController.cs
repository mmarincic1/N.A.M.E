using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NAME_bekend.Database;
using NAME_bekend.Models;

namespace NAME_bekend.Controllers
{
    [ApiController]
    [EnableCors("CorsPolicy")]
    [Route("[controller]")]
    public class DoktorController : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public DoktorController(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }


        [HttpPost(Name = "doktor/{id}")]
        public async Task<ActionResult<DoktorModel>> GetDoktor(int id)
        {

            DoktorModel doktor = await _context.DoktorModels.Where(u => u.Id == id).FirstOrDefaultAsync();

            if (doktor == null)
                return BadRequest();

            return doktor;

        }
    }
}
