using DataBase.Core;
using DataBase.Entities.Serie;

namespace DataBase.Entities.Productora
{
    public class Productoras : BaseEntity
    {
        public string NombreProductora { get; set; }
        public List<Series> Series { get; set; }
    }
}
