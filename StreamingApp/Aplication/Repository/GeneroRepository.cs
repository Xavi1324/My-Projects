using DataBase.Contexts;
using DataBase.Entities.Genero;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Repository
{
    public class GeneroRepository
    {
        private readonly StreamingAppContext _dbContext;
        public GeneroRepository(StreamingAppContext dbContext)
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
