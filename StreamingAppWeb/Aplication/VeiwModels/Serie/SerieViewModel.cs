using DataBase.Entities.Genero;
using DataBase.Entities.Productora;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.VeiwModels.Serie
{
    public class SerieViewModel
    {
        public int IdSerie { get; set; }
        public  string Titulo { get; set; }
        public  string PortadaUrl { get; set; }
        public  string VideoUrl { get; set; }
        public int? IdProductora { get; set; }
        public string NombreProductora { get; set; }
        public int IdGenero { get; set; }
        public int? IdGeneroSec { get; set; }
        public List<string> Generos { get; set; } = new List<string>();

        //public required int IdGenero { get; set; }
        //public string NombreGenero { get; set; }
        //public int? IdGeneroSec { get; set; }
        //public string NombreGeneroSec { get; set; }
    }
}
