using DataBase.Core;
using DataBase.Entities.Genero;
using DataBase.Entities.Productora;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DataBase.Entities.Serie
{
    public class Series : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }
        public  string Titulo { get; set; }
        public  string PortadaUrl { get; set; }
        public  string VideoUrl { get; set; }
        public int? IdProductora { get; set; }
        public  Productoras Productora { get; set; }
        public  int IdGenero { get; set; }
        public  Generos Genero { get; set; }
        public  int? IdGeneroSec { get; set; }
        public  Generos? GeneroSec { get; set; }

    }
}
