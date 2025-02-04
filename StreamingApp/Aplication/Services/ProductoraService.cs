using Aplication.Repository;
using Aplication.ViewModels.Productora;
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
        public async Task<List<ProductoraViewModel>> GetProductoraViewModel()
        {
            var productoraList = await _productoraRepository.GetProductorasAsync();
            return productoraList.Select(productora => new ProductoraViewModel
            {
                Id = productora.Id,
                Nombre = productora.Nombre
            }).ToList();
        }
    }
}
