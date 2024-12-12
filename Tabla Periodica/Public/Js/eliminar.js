document.addEventListener('DOMContentLoaded', function() {
    // Seleccionamos todos los botones de la tabla periódica
    const botones = document.querySelectorAll('.tabla-periodica button');

    // Recorremos todos los botones y les añadimos un evento de click
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            // Mostrar ventana emergente para confirmar eliminación
            const confirmar = confirm("¿Estás seguro de que deseas eliminar este elemento?");
            if (confirmar) {
                // Crear un nuevo elemento div para el espacio vacío
                const espacioVacio = document.createElement('div');
                espacioVacio.className = 'espacio-vacio'; // Clase para el espacio vacío
                espacioVacio.style.backgroundColor = 'gray'; // Color de fondo gris
                espacioVacio.style.width = boton.offsetWidth + 'px'; // Ancho del espacio vacío
                espacioVacio.style.height = boton.offsetHeight + 'px'; // Altura del espacio vacío
                espacioVacio.style.gridColumn = getComputedStyle(boton).gridColumn; // Mantiene la misma columna
                espacioVacio.style.gridRow = getComputedStyle(boton).gridRow; // Mantiene la misma fila

                // Insertar el espacio vacío en lugar del botón
                boton.parentNode.replaceChild(espacioVacio, boton);
            }
        });
    });
});
