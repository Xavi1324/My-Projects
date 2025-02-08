using DataBase.Core;
using DataBase.Entities.Serie;

namespace DataBase.Entities.Genero
{
    public class Generos : BaseEntity
    {

        public string NombreGenero { get; set; }
        public List<Series> Series { get; set; }
    }
}
