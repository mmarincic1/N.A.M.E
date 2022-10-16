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
    public class ZahtjeviHendl : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public ZahtjeviHendl(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("odbijZahtjev")]
        public async Task<IActionResult> odbijZahtjev(ZahtjevModel stariZahtjev)
        {
            OdbijeniZahtjev odbijeniZahtjev = new OdbijeniZahtjev(stariZahtjev.PosiljalacId,
                stariZahtjev.PrimalacID, stariZahtjev.Text, true);

            _context.OdbijeniZahtjevs.Add(odbijeniZahtjev);

            _context.ZahtjevModels.Remove(stariZahtjev);

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

        [HttpPost("getOdbijeniZahtjeviPacijent/{id}")]
        [EnableCors("CorsPolicy")]
        public IEnumerable<OdbijeniZahtjev> dajOdbijeneZahtjeveZaPacijenta(int id)
        {
            Console.WriteLine("GET ZAHTJEVI ZA PACIJENTA " + id);
            var data = _context.OdbijeniZahtjevs.AsNoTracking().ToArray();
            var rez = new List<OdbijeniZahtjev>();
            foreach (var zahtjev in data)
                if (zahtjev.PosiljalacId == id)
                    rez.Add(zahtjev);
            Console.WriteLine("OVO POGLEDAJ" + rez);
            return rez;
        }

        [HttpPost("obrisiStariZahtjev")]
        public async Task<IActionResult> obrisiZahtjev(ZahtjevModel stariZahtjev)
        {
            _context.ZahtjevModels.Remove(stariZahtjev);

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

        [HttpPost("prihvatiZahtjev")]
        public async Task<IActionResult> prihvatiZahtjev(OdobrenaUputnica uputnica)
        {
            _context.OdobrenaUputnicas.Add(uputnica);

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

        [HttpPost("getUplatnicePacijent/{id}")]
        [EnableCors("CorsPolicy")]
        public IEnumerable<OdobrenaUputnica> dajUplatnicePacijent(int id)
        {
            Console.WriteLine("GET UPLATNICE ZA PACIJENTA " + id);
            var data = _context.OdobrenaUputnicas.AsNoTracking().ToArray();
            var rez = new List<OdobrenaUputnica>();
            foreach (var uplatnica in data)
                if (uplatnica.pacijentId == id)
                    rez.Add(uplatnica);
            Console.WriteLine("OVO POGLEDAJ" + rez);
            return rez;
        }

        [HttpPost("getUplatniceDoktor/{id}")]
        [EnableCors("CorsPolicy")]
        public IEnumerable<OdobrenaUputnica> dajUplatniceDoktor(int id)
        {
            Console.WriteLine("GET UPLATNICE ZA DOKTORA " + id);
            var data = _context.OdobrenaUputnicas.AsNoTracking().ToArray();
            var rez = new List<OdobrenaUputnica>();
            foreach (var uplatnica in data)
                if (uplatnica.DoktorId == id)
                    rez.Add(uplatnica);
            Console.WriteLine("OVO POGLEDAJ" + rez);
            return rez;
        }

    }
}
