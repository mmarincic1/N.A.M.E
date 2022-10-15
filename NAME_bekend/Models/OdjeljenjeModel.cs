using System.ComponentModel.DataAnnotations;

namespace NAME_bekend.Models
{
    public class OdjeljenjeModel
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string UslugaId { get; set; }

        public OdjeljenjeModel(string naziv, string uslugaId)
        {
            Naziv = naziv;
            UslugaId = uslugaId;
        }
    }
}
