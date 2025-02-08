using DataBase.Contexts;
using DataBase.Entities.Genero;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplication.Repository
{
    public class GeneroRepository
    {
        private readonly StreamingAppContextWeb _dbContext;
        public GeneroRepository(StreamingAppContextWeb dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddGeneroAsync(Generos genero)
        {
            await _dbContext.Generos.AddAsync(genero);
            await _dbContext.SaveChangesAsync();
        }
        public async Task EditGeneroAsync(Generos genero)
        {
            _dbContext.Entry(genero).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }
        public async Task DeleteGeneroAsync(Generos genero)
        {
            _dbContext.Set<Generos>().Remove(genero);
            await _dbContext.SaveChangesAsync();
        }
        public async Task<List<Generos>> GetGenerosAsync()
        {
            return await _dbContext.Set<Generos>().ToListAsync();
        }
        public async Task<Generos> GetGeneroByIdAsync(int id)
        {
            return await _dbContext.Set<Generos>().FindAsync(id);
        }
    }
}
