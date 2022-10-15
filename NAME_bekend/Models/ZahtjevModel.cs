using System.ComponentModel.DataAnnotations;

namespace NAME_bekend.Models
{
    public class ZahtjevModel
    {
        [Key]
        public int Id { get; set; }
        public int PosiljalacId { get; set; }
        public int PrimalacID { get; set; }

        public string Text { get; set; }

        public ZahtjevModel(int posiljalacId, int primalacID, string text)
        {
            PosiljalacId = posiljalacId;
            PrimalacID = primalacID;
            Text = text;
        }
    }
}
