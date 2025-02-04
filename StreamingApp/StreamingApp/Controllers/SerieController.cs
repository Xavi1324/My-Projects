using Aplication.Services;
using DataBase.Contexts;
using Microsoft.AspNetCore.Mvc;

namespace StreamingApp.Controllers
{
    public class SerieController : Controller
    {
        private readonly SerieService _serieService;

        public SerieController(StreamingAppContext dbContext)
        {
            _serieService = new(dbContext);
        }
        public async Task<IActionResult> SerieView()
        {
            return View(await _serieService.GetSerieViewModel());
        }
        
    }
}
