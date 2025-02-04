using Aplication.Repository;
using Aplication.ViewModels.Serie;
using DataBase.Contexts;
using DataBase.Entities.Series;

namespace Aplication.Services
{
    public class SerieService
    {
        private readonly SerieRepository _serieRepository;

        public SerieService(StreamingAppContext dbContext )
        {
            _serieRepository = new (dbContext);
        }

        public async Task<List<SerieViewModel>> GetSerieViewModel()
        {
            // Asegurarse de obtener una lista (aunque vacía) en caso de null
            var seriesList = await _serieRepository.GetSeriesAsync() ?? new List<Serie>();

            return seriesList.Select(serie => new SerieViewModel
            {
                Id = serie.Id,
                Titulo = serie.Titulo,
                PortadaUrl = serie.PortadaUrl,
                ProductoraNombre = serie.Productora?.Nombre, // También se puede usar el operador null-coalescente
                Generos = serie.SerieGeneros != null
                    ? serie.SerieGeneros.Select(sg => sg.Genero.Nombre).ToList()
                    : new List<string>()
            }).ToList();
        }
        public async Task<SerieViewModel?> GetSerieByIdAsync(int id)
        {
            var serie = await _serieRepository.GetSerieByIdAsync(id);
            if (serie == null)
                return null;

            return new SerieViewModel
            {
                Id = serie.Id,
                Titulo = serie.Titulo,
                PortadaUrl = serie.PortadaUrl,
                ProductoraNombre = serie.Productora?.Nombre,
                Generos = serie.SerieGeneros?.Select(sg => sg.Genero.Nombre).ToList() ?? new List<string>()
            };
        }

        public async Task AddSerieAsync(Serie serie)
        {
            await _serieRepository.AddSerieAsync(serie);
        }

        public async Task EditSerieAsync(Serie serie)
        {
            await _serieRepository.EditSerieAsync(serie);
        }

        public async Task DeleteSerieAsync(int id)
        {
            var serie = await _serieRepository.GetSerieByIdAsync(id);
            if (serie != null)
            {
                await _serieRepository.DeleteSerieAsync(serie);
            }
        }



    }
}
