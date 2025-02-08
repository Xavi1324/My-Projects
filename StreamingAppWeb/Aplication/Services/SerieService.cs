using Aplication.Repository;
using Aplication.VeiwModels.Serie;
using DataBase.Contexts;
using DataBase.Entities.Genero;
using DataBase.Entities.Productora;
using DataBase.Entities.Serie;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Services
{
    public class SerieService
    {
        private readonly SerieRepository _serieRepository;
        public SerieService(StreamingAppContextWeb dbContext)
        {
            _serieRepository = new(dbContext);
        }
        #region GetSeries y GetSerieById
        public async Task<List<SerieViewModel>> GetAllSeriesAsync()
        {
            var ListSerie = await _serieRepository.GetSeriesAsync();
            return ListSerie.Select(s => new SerieViewModel
            {
                IdSerie = s.Id,
                Titulo = s.Titulo,
                PortadaUrl = s.PortadaUrl,
                VideoUrl = s.VideoUrl,
                IdProductora = s.IdProductora,
                NombreProductora = s.Productora?.NombreProductora ?? "No Disponible",

                Generos = new List<string>
                {
                    s.Genero?.NombreGenero,
                    s.GeneroSec?.NombreGenero
                }.Where(g => !string.IsNullOrEmpty(g)).ToList()

            }).ToList();
        }
        public async Task<SerieViewModel> GetSerieByIdAsync(int id)
        {
            var serie = await _serieRepository.GetSerieByIdAsync(id);
            return new SerieViewModel
            {
                IdSerie = serie.Id,
                Titulo = serie.Titulo,
                PortadaUrl = serie.PortadaUrl,
                VideoUrl = serie.VideoUrl,
                IdProductora = serie.IdProductora,
                NombreProductora = serie.Productora?.NombreProductora ?? "No Disponible",

                Generos = new List<string>
                {
                    serie.Genero?.NombreGenero,
                    serie.GeneroSec?.NombreGenero
                }.Where(g => !string.IsNullOrEmpty(g)).ToList()
            };
        }
        #endregion


        public async Task AddSerieAsync(SerieAddViewModel model)
        {
            Series series = new();
            series.Titulo = model.Titulo;
            series.PortadaUrl = model.PortadaUrl;
            series.VideoUrl = model.VideoUrl;
            series.IdProductora = model.IdProductora;
            series.IdGenero = model.IdGenero;
            series.IdGeneroSec = model.IdGeneroSec;

            await _serieRepository.AddSerieAsync(series);


        }

        public async Task EditSerieAsync(SerieAddViewModel model)
        {
            Series serie = new();
            serie.Id = model.IdSerie;
            serie.Titulo = model.Titulo;
            serie.PortadaUrl = model.PortadaUrl;
            serie.VideoUrl = model.VideoUrl;
            serie.IdProductora = model.IdProductora;
            serie.IdGenero = model.IdGenero;
            serie.IdGeneroSec = model.IdGeneroSec;

            await _serieRepository.EditSerieAsync(serie);
        }
        public async Task DeleteSerieAsync(int id)
        {
            var serie = await _serieRepository.GetSerieByIdAsync(id);
            await _serieRepository.DeleteSerieAsync(serie);

        }
    }
}
