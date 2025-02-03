using DataBase.Core;
using DataBase.Entities.Relaciones;
namespace DataBase.Entities.Genero
{ 
    public class Generos : CommonEntity
    {
        //Navigation Property
        // Relación N:N, Un género puede estar en muchas series y una serie puede tener varios géneros.
        public required ICollection<SerieGenero> SerieGeneros { get; set; }
    }
}
