using DataBase.Contexts;
using DataBase.Entities.Series;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Repository
{
    public class SerieRepository
    {
        private readonly StreamingAppContext _dbContext;
        public SerieRepository(StreamingAppContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddSerieAsync(Serie serie)
        {
            await _dbContext.Series.AddAsync(serie);
            await _dbContext.SaveChangesAsync();
        }

        public async Task EditSerieAsync(Serie serie)
        {
            _dbContext.Entry(serie).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteSerieAsync(Serie serie)
        {
            _dbContext.Set<Serie>().Remove(serie);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Serie>> GetSeriesAsync()
        {
            return await _dbContext.Set<Serie>().ToListAsync();
        }
        public async Task<Serie> GetSerieByIdAsync(int id)
        {
            return await _dbContext.Set<Serie>().FindAsync(id);
        }
    }
}
