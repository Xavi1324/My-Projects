using DataBase.Core;
using DataBase.Entities.Productora;
using DataBase.Entities.Relaciones;

namespace DataBase.Entities.Series
{
    public class Serie : BaseEntity
    {
        public required string Titulo { get; set; }
        public required string PortadaUrl { get; set; }
        public required string VideoUrl { get; set; }
        public int? IdProductora { get; set; } // FK

        //Navigation Property 
        // Relación 1:N → Una serie tiene una sola productora
        public required Productoras Productora { get; set; }
        // Relación N:N → Una serie puede tener varios géneros
        public required ICollection<SerieGenero> SerieGeneros { get; set; }
    }
}
