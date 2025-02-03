using Aplication.Repository;
using DataBase.Contexts;

namespace Aplication.Services
{
    public class ProductoraService
    {
        private readonly ProductoraRepository _productoraRepository;

        public ProductoraService(StreamingAppContext dbContext)
        {
            _productoraRepository = new(dbContext);
        }
    }
}
