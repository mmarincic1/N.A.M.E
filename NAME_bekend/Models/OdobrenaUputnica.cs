using System.ComponentModel.DataAnnotations;

namespace NAME_bekend.Models
{
    public class OdobrenaUputnica
    {
        [Key]
        public int Id { get; set; }
        public int pacijentId { get; set; }
        public string Lokacija { get; set; }
        public string Usluga { get; set; }
        public int DoktorId { get; set; }

        public OdobrenaUputnica(int pacijentId, string lokacija, string usluga, int doktorId)
        {
            this.pacijentId = pacijentId;
            Lokacija = lokacija;
            Usluga = usluga;
            DoktorId = doktorId;
        }
    }
}
