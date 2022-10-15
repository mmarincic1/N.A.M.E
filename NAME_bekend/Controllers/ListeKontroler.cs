using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NAME_bekend.Database;
using NAME_bekend.Models;

namespace NAME_bekend.Controllers
{
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class ListeKontroler : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public ListeKontroler(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("getZahtjeviPacijent/{id}")]
        [EnableCors("CorsPolicy")]
        public IEnumerable<ZahtjevModel> dajZahtjeveZaPacijenta(int id)
        {
            Console.WriteLine("GET ZAHTJEVI ZA PACIJENTA " + id);
            var data = _context.ZahtjevModels.AsNoTracking().ToArray();
            var rez = new List<ZahtjevModel>();
            foreach (var zahtjev in data)
                if (zahtjev.PosiljalacId == id)
                    rez.Add(zahtjev);
            Console.WriteLine("OVO POGLEDAJ" + rez);
            return rez;
        }

        [HttpPost("getZahtjeviDoktor/{id}")]
        [EnableCors("CorsPolicy")]
        public IEnumerable<ZahtjevModel> dajZahtjeveZaDoktora(int id)
        {
            Console.WriteLine("GET ZAHTJEVI ZA PACIJENTA " + id);
            var data = _context.ZahtjevModels.AsNoTracking().ToArray();
            var rez = new List<ZahtjevModel>();
            foreach (var zahtjev in data)
                if (zahtjev.PrimalacID == id)
                    rez.Add(zahtjev);
            Console.WriteLine("OVO POGLEDAJ" + rez);
            return rez;
        }

    }
}
