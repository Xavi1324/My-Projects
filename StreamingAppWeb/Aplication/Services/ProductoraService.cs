using Aplication.Repository;
using Aplication.VeiwModels.Productora;
using DataBase.Contexts;
using DataBase.Entities.Productora;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Services
{
    public class ProductoraService
    {
        private readonly ProductoraRepository _productoraRepository;
        public ProductoraService(StreamingAppContextWeb dbContext)
        {
            _productoraRepository = new(dbContext);
        }
        public async Task<List<ProductoraViewModel>> GetAllProductorasAsync()
        {
            var ListProductora = await _productoraRepository.GetProductorasAsync();
            return ListProductora.Select(p => new ProductoraViewModel
            {
                IdProductora = p.Id,
                NombreProductora = p.NombreProductora
            }).ToList();
        }
        public async Task<ProductoraViewModel> GetProductoraByIdAsync(int id)
        {
            var productora = await _productoraRepository.GetProductoraByIdAsync(id);
            return new ProductoraViewModel
            {

                IdProductora = productora.Id,
                NombreProductora = productora.NombreProductora
            };
        }
        public async Task AddProductoraAsync(ProductoraViewModel productoraModel)
        {
            Productoras productora = new();
            productora.NombreProductora = productoraModel.NombreProductora;

            await _productoraRepository.AddProductoraAsync(productora);
        }
        public async Task EditProductoraAsync(ProductoraViewModel productoraModel)
        {
            Productoras productora = new();
            productora.Id = productoraModel.IdProductora;
            productora.NombreProductora = productoraModel.NombreProductora;
            await _productoraRepository.EditProductoraAsync(productora);
        }
        public async Task DeleteProductoraAsync(int id)
        {
            var productora = await _productoraRepository.GetProductoraByIdAsync(id);
            await _productoraRepository.DeleteProductoraAsync(productora);
        }
    }
}
