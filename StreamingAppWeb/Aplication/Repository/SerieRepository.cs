using DataBase.Contexts;
using DataBase.Entities.Serie;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Repository
{
    public class SerieRepository
    {
        private readonly StreamingAppContextWeb _dbContext;
        public SerieRepository(StreamingAppContextWeb dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddSerieAsync(Series serie)
        {
            await _dbContext.Set<Series>().AddAsync(serie);
            await _dbContext.SaveChangesAsync();
        }
        public async Task EditSerieAsync(Series serie)
        {
            _dbContext.Entry(serie).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }
        public async Task DeleteSerieAsync(Series serie)
        {
            _dbContext.Set<Series>().Remove(serie);
            await _dbContext.SaveChangesAsync();
        }
        public async Task<List<Series>> GetSeriesAsync()
        {
            return await _dbContext.Series
                .Include(s => s.Productora)
                .Include(s => s.Genero)
                .Include(s => s.GeneroSec)
                .ToListAsync();
        }
        public async Task<Series> GetSerieByIdAsync(int id)
        {
            return await _dbContext.Series
                .Include(s => s.Productora)
                .Include(s => s.Genero)
                .Include(s => s.GeneroSec)
                .FirstOrDefaultAsync(s => s.Id == id);

        }
    }
}
