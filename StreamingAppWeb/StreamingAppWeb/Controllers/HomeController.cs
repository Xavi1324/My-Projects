using System.Diagnostics;
using Aplication.Services;
using DataBase.Contexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamingAppWeb.Models;

namespace StreamingAppWeb.Controllers
{
    public class HomeController : Controller
    {

        private readonly SerieService _serieService;
        private readonly ProductoraService _productoraService;
        private readonly GeneroService _generoService;

        public HomeController(StreamingAppContextWeb dbContext)
        {
            _serieService = new SerieService(dbContext);
            _productoraService = new ProductoraService(dbContext);
            _generoService = new GeneroService(dbContext);
        }




        public async Task<IActionResult> HomeView(string searchTerm, int? productoraId, int? generoId, string orderBy)
        {
            var series = await _serieService.GetAllSeriesAsync();

            // Búsqueda por nombre
            if (!string.IsNullOrEmpty(searchTerm))
            {
                series = series.Where(s => s.Titulo.Contains(searchTerm, StringComparison.OrdinalIgnoreCase)).ToList();
                ViewData["SearchTerm"] = searchTerm;  // Para que el término de búsqueda se mantenga en el input
            }

            // Filtrar por Productora
            if (productoraId.HasValue)
            {
                series = series.Where(s => s.IdProductora == productoraId.Value).ToList();
            }

            // Filtrar por Género
            if (generoId.HasValue)
            {
                series = series.Where(s => s.Generos.Contains(generoId.Value.ToString())).ToList();
            }

            // Ordenar
            if (!string.IsNullOrEmpty(orderBy))
            {
                switch (orderBy)
                {
                    case "Nombre":
                        series = series.OrderBy(s => s.Titulo).ToList();
                        break;
                    case "Genero":
                        series = series.OrderBy(s => s.Generos.FirstOrDefault()).ToList(); // Usamos el primer género
                        break;
                    case "Productora":
                        series = series.OrderBy(s => s.NombreProductora).ToList();
                        break;
                }
            }

            ViewBag.Productoras = await _productoraService.GetAllProductorasAsync();
            ViewBag.Generos = await _generoService.GetAllGenerosAsync();

            return View(series);


        }
    }
}
