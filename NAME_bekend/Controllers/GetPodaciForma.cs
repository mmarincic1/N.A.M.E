using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NAME_bekend.Database;
using NAME_bekend.Models;
using System.Linq;
using System.Text;

namespace NAME_bekend.Controllers
{
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class GetPodaciForma : ControllerBase
    {

        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public GetPodaciForma(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet("cities")]
        [EnableCors("CorsPolicy")]
        public IEnumerable<GradModel> getCities()
        {
            Console.WriteLine("GET GRADOVI");
            var data = _context.GradModels.AsNoTracking().ToArray();
            Console.WriteLine("OVO POGLEDAJ" + data);
            return data;
        }

        [HttpGet("county/{id}")]
        [EnableCors("CorsPolicy")]
        public IEnumerable<OpstinaModel> getCountiesInCity(int id)
        {
            Console.WriteLine("GET OPSTINE ZA GRAD " + id);
            var grad = _context.GradModels.Where(u => u.Id.Equals(id)).FirstOrDefaultAsync();

            var listaOpstina = grad.Result.OpstineId;

            var data = _context.OpstinaModels.AsNoTracking().ToArray();

            var rez = new List<OpstinaModel>();
            foreach (var opcina in data)
                if (listaOpstina.Contains(opcina.Id.ToString()))
                    rez.Add(opcina);
            Console.WriteLine("OVO POGLEDAJ" + rez);
            return rez;
        }

        [HttpGet("hospitalsCounties/{id}")]
        [EnableCors("CorsPolicy")]
        public IEnumerable<UstanovaModel> getHospitalsInCounties(int id)
        {
            Console.WriteLine("GET USTANOVE ZA OPSTINU " + id);
            var opstina = _context.OpstinaModels.Where(u => u.Id.Equals(id)).FirstOrDefaultAsync();

            var listaUstanova = opstina.Result.UstanoveId;

            var data = _context.UstanovaModels.AsNoTracking().ToArray();

            var rez = new List<UstanovaModel>();
            foreach (var ustanova in data)
                if (listaUstanova.Contains(ustanova.Id.ToString()))
                    rez.Add(ustanova);
            Console.WriteLine("OVO POGLEDAJ" + rez);
            return rez;
        }

        [HttpGet("doctorsHospitals/{id}")]
        [EnableCors("CorsPolicy")]
        public IEnumerable<DoktorModel> getDoctorsInHospitals(int id)
        {
            Console.WriteLine("GET DOKTORE ZA USTANOVU " + id);

            var data = _context.DoktorModels.AsNoTracking().ToArray();

            var rez = new List<DoktorModel>();
            foreach (var doktor in data)
                if (doktor.UstanovaId == id)
                    rez.Add(doktor);
            Console.WriteLine("OVO POGLEDAJ" + rez);
            return rez;
        }




        private bool postojiId(string lista, int id)
        {
            var lista1 = lista.Split(',');
            foreach (var broj in lista1)
                if (int.Parse(broj) == id)
                    return true;
            return false;
        }

    }
}
