using Aplication.Repository;
using DataBase.Contexts;

namespace Aplication.Services
{
    public class SerieService
    {
        private readonly SerieRepository _serieRepository;

        public SerieService(StreamingAppContext dbContext )
        {
            _serieRepository = new (dbContext);
        }

    }
}
