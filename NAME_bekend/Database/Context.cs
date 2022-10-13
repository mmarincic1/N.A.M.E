using Microsoft.EntityFrameworkCore;
using NAME_bekend.Models;
using System.Diagnostics.CodeAnalysis;

namespace NAME_bekend.Database
{
    public class Context : DbContext
    {
        //Tabele u bazi
        public virtual DbSet<UserModel> UserModels { get; set; }
        public Context([NotNull] DbContextOptions<Context> options) : base(options) {
            var conn = (Microsoft.Data.SqlClient.SqlConnection)Database.GetDbConnection();
        }

        //Ukoliko zelite da se spojite na lokalnu bazu u DependencyInjection.cs morate promijeniti dbConnString u 'Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=LokalnaBaza;'
        //i u metodi dole isto, nakon toga pratite komentare u metodi ispod

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            //Ovaj dio koda kreira lokalnu bazu

            //var dbConnString = @"Server=set3.database.windows.net;Initial Catalog=Set3Baza;Persist Security Info=False;User ID=set3admin;Password=prir0da#aj;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

            //var dbConnString = @"Server=set3.database.windows.net;Initial Catalog=Set3Baza;Persist Security Info=False;User ID=set3admin;Password=prir0da#aj;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            var dbConnString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=LokalnaBaza;";
            optionsBuilder.UseSqlServer(dbConnString);

            // za globalnu konekciju
            //var dbConnString = @"Server=set3.database.windows.net;Initial Catalog=Set3Baza;Persist Security Info=False;User ID=set3admin;Password=prir0da#aj;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            //optionsBuilder.UseSqlServer(dbConnString);
            //

            //Da vidite gdje vam se nalazi baza:
            //View->Sql server object explorer
            //ima baza (localdb)\Set3 StoreDB je ime lokalnaBaza
        }

        //Ukoliko zelite da se spojite na lokalnu bazu u DependencyInjection.cs morate promijeniti dbConnString u 'Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=LokalnaBaza;'
        //i u metodi dole isto, nakon toga pratite komentare u metodi ispod

        
    }
}
