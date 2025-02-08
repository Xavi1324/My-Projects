using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.VeiwModels.Serie
{
    public class SerieAddViewModel
    {
        public int IdSerie { get; set; }
        public string Titulo { get; set; }
        public string PortadaUrl { get; set; }
        public string VideoUrl { get; set; }
        public int IdProductora { get; set; }
        public int IdGenero { get; set; }
        public int? IdGeneroSec { get; set; }
    }
}
