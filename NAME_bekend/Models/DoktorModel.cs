using System.ComponentModel.DataAnnotations;

namespace NAME_bekend.Models
{
    public class DoktorModel
    {
        [Key]
        public int Id { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public bool NaGodisnjem { get; set; }
        public int UstanovaId { get; set; }
        public int OdjeljenjeId { get; set; }
        public string UslugeId { get; set; }

        public DoktorModel(string email, string firstName, string lastName, string password, bool naGodisnjem, int ustanovaId , int odjeljenjeId, string uslugeId)
        {
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            Password = password;
            NaGodisnjem = naGodisnjem;
            UstanovaId = ustanovaId;
            OdjeljenjeId = odjeljenjeId;
            UslugeId = uslugeId;
        }
    }
}
