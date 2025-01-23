using System.Diagnostics;
using Cajero_Automatico.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cajero_Automatico.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Retiro()
        {
            // Recupera el modo de dispensaci�n previamente seleccionado, o usa el "Eficiente" por defecto
            ViewData["ModoActual"] = HttpContext.Session.GetString("ModoDispensacion") ?? "Eficiente";
            return View();
        }

        // Procesar el retiro de dinero
        [HttpPost]
        public IActionResult ProcesarRetiro(string modoDispensacion, int monto)
        {
            if (monto % 100 != 0)
            {
                ViewData["Resultado"] = "El monto debe ser un n�mero m�ltiplo de 100.";
                return View("Retiro");
            }

            // Guardar el modo de dispensaci�n seleccionado en la sesi�n
            HttpContext.Session.SetString("ModoDispensacion", modoDispensacion);

            // Calcular la cantidad de billetes seg�n el modo seleccionado
            var resultado = CalcularBilletes(modoDispensacion, monto);

            // Mostrar el resultado al usuario
            ViewData["Resultado"] = resultado;
            ViewData["ModoActual"] = modoDispensacion;
            return View("Retiro");
        }

        private string CalcularBilletes(string modo, int monto)
        {
            // Lista de denominaciones seg�n el modo
            int[] denominaciones = modo switch
            {
                "200-1000" => new[] { 1000, 200 },
                "100-500" => new[] { 500, 100 },
                "Eficiente" => new[] { 1000, 500, 200, 100 },
                _ => new[] { 1000, 500, 200, 100 }
            };

            // Diccionario para almacenar el resultado
            var resultadoBilletes = new Dictionary<int, int>();

            // Calcular la cantidad de billetes necesarios
            foreach (var denominacion in denominaciones)
            {
                if (monto >= denominacion)
                {
                    resultadoBilletes[denominacion] = monto / denominacion;
                    monto %= denominacion;
                }
            }

            if (monto > 0)
            {
                return $"El monto no puede ser dispensado con el modo seleccionado ({modo}).";
            }

            // Construir el resultado como texto
            var resultadoTexto = "El cajero dispens�:\n";
            foreach (var billete in resultadoBilletes)
            {
                resultadoTexto += $"{billete.Value} billete(s) de {billete.Key}.\n";
            }

            return resultadoTexto;
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
