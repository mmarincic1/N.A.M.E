using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NAME_bekend.Models
{
    public class UserModel
    {

        
        [Key]
        public int Id { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public UserModel(string email, string firstName, string lastName, string password)
        {
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            Password = password;
        }
    }
}
        
