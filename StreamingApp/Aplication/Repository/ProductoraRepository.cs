using DataBase.Contexts;
using DataBase.Entities.Productora;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Repository
{
    public class ProductoraRepository
    {
        private readonly StreamingAppContext _dbContext;

        public ProductoraRepository(StreamingAppContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddProductoraAsync(Productoras productora)
        {
            await _dbContext.Productoras.AddAsync(productora);
            await _dbContext.SaveChangesAsync();
        }

        public async Task EditProductoraAsync(Productoras productora)
        {
            _dbContext.Entry(productora).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteProductoraAsync(Productoras productora)
        {
            _dbContext.Set<Productoras>().Remove(productora);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Productoras>> GetProductorasAsync()
        {
            return await _dbContext.Set<Productoras>().ToListAsync();
        }
        public async Task<Productoras> GetProductoraByIdAsync(int id)
        {
            return await _dbContext.Set<Productoras>().FindAsync(id);
        }

    }
}
