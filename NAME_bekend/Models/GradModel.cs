using System.ComponentModel.DataAnnotations;

namespace NAME_bekend.Models
{
    public class GradModel
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string OpstineId { get; set; }

        public GradModel(string naziv, string opstineId)
        {
            Naziv = naziv;
            OpstineId = opstineId;
        }

    }
}
