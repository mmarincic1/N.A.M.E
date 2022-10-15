using System.ComponentModel.DataAnnotations;

namespace NAME_bekend.Models
{
    public class UslugaModel
    {
        [Key]
        public int Id { get; set; }
        public string Opis { get; set; }
        public int cijena { get; set; }
        public int trajanjeMin { get; set; }

        public UslugaModel(string opis, int cijena, int trajanjeMin)
        {
            Opis = opis;
            this.cijena = cijena;
            this.trajanjeMin = trajanjeMin;
        }
    }
}
