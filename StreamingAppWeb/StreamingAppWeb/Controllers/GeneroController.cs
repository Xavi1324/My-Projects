using Aplication.Services;
using Aplication.VeiwModels.Genero;
using DataBase.Contexts;
using Microsoft.AspNetCore.Mvc;

namespace StreamingAppWeb.Controllers
{
    public class GeneroController : Controller
    {
        private readonly GeneroService _generoService;
        public GeneroController(StreamingAppContextWeb dbContext)
        {
            _generoService = new(dbContext);
        }
        public async Task<IActionResult> ListGenero()
        {
            return View(await _generoService.GetAllGenerosAsync());
        }
        public IActionResult AddGenero()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> AddGenero(GeneroViewModel generoModel)
        {
            if (ModelState.IsValid)
            {
                await _generoService.AddGeneroAsync(generoModel);
                return RedirectToAction("ListGenero");
            }
            return View(generoModel);
        }
        public async Task<IActionResult> EditGenero(int id)
        {
            return View(await _generoService.GetGeneroByIdAsync(id));
        }
        [HttpPost]
        public async Task<IActionResult> EditGenero(GeneroViewModel generoModel)
        {
            if (ModelState.IsValid)
            {
                await _generoService.EditGeneroAsync(generoModel);
                return RedirectToAction("ListGenero");
            }
            return View(generoModel);
        }
        public async Task<IActionResult> DeleteGenero(int id)
        {
            var genero = await _generoService.GetGeneroByIdAsync(id);
            return View("DeleteGenero", genero);
        }
        [HttpPost]
        public async Task<IActionResult> DeleteGenero(int id, GeneroViewModel generoModel)
        {
            await _generoService.DeleteGeneroAsync(id);
            return RedirectToAction("ListGenero");
        }
    }
}
