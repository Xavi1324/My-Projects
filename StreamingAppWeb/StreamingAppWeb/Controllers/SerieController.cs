using Aplication.Services;
using Aplication.VeiwModels.Serie;
using DataBase.Contexts;
using Microsoft.AspNetCore.Mvc;

namespace StreamingAppWeb.Controllers
{
    public class SerieController : Controller
    {
        private readonly SerieService _serieService;
        private readonly ProductoraService _productoraService;
        private readonly GeneroService _generoService;
        public SerieController(StreamingAppContextWeb dbContext)
        {
            _serieService = new SerieService (dbContext);
            _productoraService = new ProductoraService(dbContext);
            _generoService = new GeneroService(dbContext);
        }

        public async Task<IActionResult> ListSerie()
        {
            return View(await _serieService.GetAllSeriesAsync());
        }
        public async Task<IActionResult> AddSerie()
        {
            ViewBag.Productoras = await _productoraService.GetAllProductorasAsync();
            ViewBag.Generos = await _generoService.GetAllGenerosAsync();
            return View("AddSerie", new SerieAddViewModel());
        }

        [HttpPost]
        public async Task<IActionResult> AddSerie(SerieAddViewModel model)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Productoras = await _productoraService.GetAllProductorasAsync();
                ViewBag.Generos = await _generoService.GetAllGenerosAsync();
                return View("AddSerie",model); // Devuelve la vista con los datos ingresados y errores de validación
            }

                await _serieService.AddSerieAsync(model);
                return RedirectToAction("ListSerie"); // Redirige a la lista de series o a donde prefieras
            
        }

        public async Task<IActionResult> EditSerie(int id)
        {
            var serie = await _serieService.GetSerieByIdAsync(id);
            ViewBag.Productoras = await _productoraService.GetAllProductorasAsync();
            ViewBag.Generos = await _generoService.GetAllGenerosAsync();
            
            return View("EditSerie", serie);

        }

        [HttpPost]
        public async Task<IActionResult> EditSerie(SerieAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                ViewBag.Productoras = await _productoraService.GetAllProductorasAsync();
                ViewBag.Generos = await _generoService.GetAllGenerosAsync();
                return View("EditSerie", model);
            }
            await _serieService.EditSerieAsync(model);
            return RedirectToRoute(new { Controller = "Serie", action = "ListSerie" });
        }

        public async Task<IActionResult> DeleteSerie(int id)
        {
            var removeSerie = await _serieService.GetSerieByIdAsync(id);
            return View( removeSerie);
        }
        [HttpPost]
        public async Task<IActionResult> DeletePost(int id )
        {
            await _serieService.DeleteSerieAsync(id);
            return RedirectToAction("ListSerie");
        }









    }
}
