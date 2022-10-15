using System.ComponentModel.DataAnnotations;

namespace NAME_bekend.Models
{
    public class OpstinaModel
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string UstanoveId { get; set; }

        public OpstinaModel(string naziv, string ustanoveId)
        {
            Naziv = naziv;
            UstanoveId = ustanoveId;
        }

    }
}
