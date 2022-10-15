using Microsoft.Extensions.Primitives;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NAME_bekend.Models
{
    public class UserModel
    {


        [Key]
        public int Id { get; set; }
        public string? BrojZdravstveneKartice { get; set; }
        [EmailAddress]
        public string? Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Spol { get; set; }
        public string? Password { get; set; }
        public string? Adresa { get; set; }
        public string? Grad { get; set; }
        public string? Opstina { get; set; }
        public int? UstanovaId { get; set; }

        public int? PorodicniDoktorId { get; set; }

        public UserModel(string brojZdravstveneKartice, string? email, string firstName, string lastName, string spol , string password, string? adresa , string? grad, string? opstina, int? ustanovaId , int? porodicniDoktorId)
        {
            BrojZdravstveneKartice = brojZdravstveneKartice;
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            Spol = spol;
            Password = password;
            Adresa = adresa;
            Grad = grad;
            Opstina = opstina;
            UstanovaId = ustanovaId;    
            PorodicniDoktorId = porodicniDoktorId;

         }
    }
}
        
