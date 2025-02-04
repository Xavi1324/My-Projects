namespace Aplication.ViewModels.Serie
{
    public class SerieViewModel
    {
        public  int Id { get; set; }
        public required string Titulo { get; set; }
        public required string PortadaUrl { get; set; }
        public string ProductoraNombre { get; set; } = "No disponible";  // Nombre de la productora
        public List<string> Generos { get; set; } = new();


    }
}
