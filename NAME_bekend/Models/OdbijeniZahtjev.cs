using System.ComponentModel.DataAnnotations;

namespace NAME_bekend.Models
{
    public class OdbijeniZahtjev
    {
        [Key]
        public int Id { get; set; }
        public int PosiljalacId { get; set; }
        public int PrimalacID { get; set; }
        public string Text { get; set; }
        public bool Odbijen { get; set; }

        public OdbijeniZahtjev(int posiljalacId, int primalacID, string text, bool odbijen)
        {
            PosiljalacId = posiljalacId;
            PrimalacID = primalacID;
            Text = text;
            Odbijen = odbijen;
        }
    }
}
