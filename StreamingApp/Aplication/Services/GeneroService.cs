using Aplication.Repository;
using Aplication.ViewModels.Genero;
using DataBase.Contexts;

namespace Aplication.Services
{
    public class GeneroService
    {
        private readonly GeneroRepository _generoRepository;

        public GeneroService(StreamingAppContext dbContext)
        {
            _generoRepository = new(dbContext);
        }
        public async Task<List<GeneroViewModel>> GetGeneroViewModel()
        {
            var generoList = await _generoRepository.GetGenerosAsync();
            return generoList.Select(genero => new GeneroViewModel
            {
                Id = genero.Id,
                Nombre = genero.Nombre
            }).ToList();
        }

    }
}
