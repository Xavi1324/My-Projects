using DataBase.Core;
using DataBase.Entities.Series;
namespace DataBase.Entities.Productora
{
    public class Productoras : CommonEntity
    {
        //Navigation Property 
        //Relacion 1:N, una productora puede tener muchas series
        public required ICollection<Serie> Series { get; set; }
    }
}
