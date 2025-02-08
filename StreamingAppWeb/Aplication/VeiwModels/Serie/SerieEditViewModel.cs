using Aplication.VeiwModels.Genero;
using Aplication.VeiwModels.Productora;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.VeiwModels.Serie
{
    public class SerieEditViewModel
    {
        public int Id { get; set; } // Id de la serie para identificarla
        public string Nombre { get; set; } // Nombre de la serie
        public int IdProductora { get; set; } // Id de la productora seleccionada
        public int IdGenero { get; set; } // Id del genero seleccionado
        public int IdGeneroSec { get; set; } // Id del segundo genero (si aplica)

        // Listas para mostrar en los dropdowns (SelectList en la vista)
        public List<ProductoraViewModel> Productoras { get; set; }
        public List<GeneroViewModel> Generos { get; set; }
    }
}
