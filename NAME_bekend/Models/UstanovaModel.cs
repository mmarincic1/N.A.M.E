using System.ComponentModel.DataAnnotations;
using System.Security.Policy;

namespace NAME_bekend.Models
{
    public class UstanovaModel
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
        public bool Javna { get; set; }
        public string Adresa { get; set; }
        public string OdjeljenjaId { get; set; }

        public UstanovaModel(string naziv , bool javna, string adresa, string odjeljenjaId)
        {
            Naziv = naziv;
            Javna = javna;
            Adresa = adresa;
            OdjeljenjaId = odjeljenjaId;
        }
    }
}
