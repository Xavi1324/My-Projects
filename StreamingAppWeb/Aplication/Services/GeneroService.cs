using Aplication.Repository;
using Aplication.VeiwModels.Genero;
using DataBase.Contexts;
using DataBase.Entities.Genero;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Services
{
    public class GeneroService
    {
        private readonly GeneroRepository _generoRepository;
        public GeneroService(StreamingAppContextWeb dbContext)
        {
            _generoRepository = new(dbContext);
        }
        public async Task<List<GeneroViewModel>> GetAllGenerosAsync()
        {
            var ListGenero = await _generoRepository.GetGenerosAsync();
            return ListGenero.Select(g => new GeneroViewModel
            {
                IdGenero = g.Id,
                NombreGenero = g.NombreGenero
            }).ToList();
        }
        public async Task<GeneroViewModel> GetGeneroByIdAsync(int id)
        {
            var genero = await _generoRepository.GetGeneroByIdAsync(id);
            return new GeneroViewModel
            {
                IdGenero = genero.Id,
                NombreGenero = genero.NombreGenero
            };
        }
        public async Task AddGeneroAsync(GeneroViewModel generoModel)
        {
            Generos genero = new();
            genero.NombreGenero = generoModel.NombreGenero;
            await _generoRepository.AddGeneroAsync(genero);
        }
        public async Task EditGeneroAsync(GeneroViewModel generoModel)
        {
            Generos genero = new();
            genero.Id = generoModel.IdGenero;
            genero.NombreGenero = generoModel.NombreGenero;
            await _generoRepository.EditGeneroAsync(genero);
        }
        public async Task DeleteGeneroAsync(int id)
        {
            var genero = await _generoRepository.GetGeneroByIdAsync(id);
            await _generoRepository.DeleteGeneroAsync(genero);
        }
    }
}
