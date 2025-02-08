using DataBase.Contexts;
using DataBase.Entities.Productora;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Repository
{
    public class ProductoraRepository
    {
        private readonly StreamingAppContextWeb _dbContext;

        public ProductoraRepository(StreamingAppContextWeb dbContext)
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
