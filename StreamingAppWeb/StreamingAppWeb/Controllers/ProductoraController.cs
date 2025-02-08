using Aplication.Services;
using Aplication.VeiwModels.Productora;
using DataBase.Contexts;
using Microsoft.AspNetCore.Mvc;

namespace StreamingAppWeb.Controllers
{
    public class ProductoraController : Controller
    {
        private readonly ProductoraService _productoraService;
        public ProductoraController(StreamingAppContextWeb dbContex)
        {
            _productoraService = new(dbContex);
        }
        public async Task<IActionResult> ListProductora()
        {
            return View(await _productoraService.GetAllProductorasAsync());
        }
        public IActionResult AddProductora()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> AddProductora(ProductoraViewModel productoraModel)
        {
            if (ModelState.IsValid)
            {
                await _productoraService.AddProductoraAsync(productoraModel);
                return RedirectToAction("ListProductora");
            }
            return View(productoraModel);
        }
        public async Task<IActionResult> EditProductora(int id)
        {
            return View(await _productoraService.GetProductoraByIdAsync(id));
        }
        [HttpPost]
        public async Task<IActionResult> EditProductora(ProductoraViewModel productoraModel)
        {
            if (ModelState.IsValid)
            {
                await _productoraService.EditProductoraAsync(productoraModel);
                return RedirectToAction("ListProductora");
            }
            return View(productoraModel);
        }
        public async Task<IActionResult> DeleteProductora(int id)
        {
            var pro = await _productoraService.GetProductoraByIdAsync(id);
            return View("DeleteProductora", pro);

            
        }
        [HttpPost]
        public async Task<IActionResult> DeleteProductora(int id ,ProductoraViewModel productoraModel)
        {
            await _productoraService.DeleteProductoraAsync(id);
            return RedirectToAction("ListProductora");
        }
    }
}
