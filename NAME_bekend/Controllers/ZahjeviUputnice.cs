using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using NAME_bekend.Database;
using NAME_bekend.Models;

namespace NAME_bekend.Controllers
{
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class ZahjeviUputnice : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public ZahjeviUputnice(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("noviZahtjev")]
        [EnableCors("CorsPolicy")]
        public async Task<ActionResult<ZahtjevModel>> napraviZahtjev(ZahtjevModel uputnica)
        {
            _context.ZahtjevModels.Add(uputnica);
            await _context.SaveChangesAsync();
            return uputnica;
        }

    }
}
