using Aplication.Services;
using DataBase.Contexts;
using Microsoft.AspNetCore.Mvc;

namespace StreamingApp.Controllers
{
    public class HomeController : Controller
    {
        
        private readonly SerieService _serieService;

        public HomeController(StreamingAppContext dbContext)
        {
            _serieService = new (dbContext);
        }

        public async Task<IActionResult> HomeView()
        {

            return View(await _serieService.GetSerieViewModel());
        }


    }
}
