using Aplication.Repository;
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

    }
}
