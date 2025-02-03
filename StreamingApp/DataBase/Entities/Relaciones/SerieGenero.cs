using DataBase.Entities.Genero;
using DataBase.Entities.Series;

namespace DataBase.Entities.Relaciones
{
    public class SerieGenero
    {
        public int IdSerie { get; set; }
        public int IdGenero { get; set; }

        //Navigation Property
        public required Serie Serie { get; set; }
        public required Generos Genero { get; set; }
    }
}
