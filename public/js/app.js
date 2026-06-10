// LÓGICA DE NAVEGACIÓN
const enlaces = document.querySelectorAll('nav a');
const paginas = document.querySelectorAll('.page');

enlaces.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        e.preventDefault();
        const paginaDestino = enlace.getAttribute('data-page');

        paginas.forEach(p => p.classList.remove('active'));

        const paginaActual = document.getElementById(paginaDestino);
        if (paginaActual) {
            paginaActual.classList.add('active');
        }
    });
});

//ANIMACIÓN DE LAS TARJETAS DE PROYECTOS( aqui es donde hacemos que tarjetas o botones se elevate u tengan como esa sombrita para que sea animacion)
// Buscamos todas las tarjetas que tengan la clase .project-card en el HTML(las que dije arribita,Como dato el periodo que dura entre que sube y baa es de 0.25 seg, por eso parece animada)
const cards = document.querySelectorAll('.project-card');

// Recorremos cada tarjeta encontrada para asignarle los eventos del mouse (ubi de entrada y salida)
cards.forEach(card => {
    // Cuando el puntero del mouse entra en la tarjeta...
    card.addEventListener('mouseenter', () => {
        card.classList.add('destacada'); // <----- aqui aqui ---Agrega la clase CSS que la eleva y le da sombra
    });

    // Cuando el puntero del mouse sale de la tarjeta...
    card.addEventListener('mouseleave', () => {
        card.classList.remove('destacada'); // Quita la clase para que vuelva a su estado normal (y cerramos la llave del mouseleave )
    });
});


// SISTEMA DE ALERTAS PERSONALIZADAS

// Función reutilizable para mostrar mensajes en pantalla (sin usar el alert feo de Windowsaksjlaks)
function mostrarAlerta(mensaje, tipo) {
    const alerta = document.getElementById('alerta'); // Buscamos el contenedor único del HTML
    if (alerta) {
        alerta.textContent = mensaje;                     // Le inyectamos el texto dinámico
        alerta.className = 'alerta ' + tipo;              
        alerta.classList.add('visible');                  // Le agregamos la clase que la muestra con CSS

        // Usamos un temporizador para que la alerta se oculte sola después de 3 segundos (3000 milisegundos)
        setTimeout(() => {
            alerta.classList.remove('visible');
        }, 3000);
    }
}


// VALIDACIÓN Y ENVÍO ASÍNCRONO CON FETCH

// Buscamos el formulario por su ID exacto del HTML
const form = document.getElementById('contactForm');

// CONTROL DE SEGURIDAD: Solo ejecutamos esto si el formulario existe en la pantalla actual
if (form) {
    // Escuchamos cuándo el usuario hace clic en el botón "Enviar mensaje"
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // EVITA el comportamiento nativo (que la página se recargue y limpie la URL)

        // Capturamos los valores de los inputs y usamos .trim() para borrar espacios vacíos al inicio/final
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // --- VALIDACIONES DEL CLIENTE (FRONTEND) ---
        if (nombre.length < 3) {
            mostrarAlerta('El nombre debe tener al menos 3 caracteres', 'error');
            return; // El "return" frena la ejecución aquí para que no mande nada al servidor
        }

        if (!email.includes('@')) {
            mostrarAlerta('Ingresa un correo válido', 'error');
            return;
        }

        if (mensaje.length < 10) {
            mostrarAlerta('El mensaje debe tener al menos 10 caracteres', 'error');
            return;
        }

        // --- ENVÍO DE DATOS AL BACKEND ---
        try {
            // Usamos fetch de forma asíncrona (await) para enviar los datos a la ruta del servidor
            const respuesta = await fetch('/api/contacto', {
                method: 'POST', // Método HTTP para enviar información
                headers: { 'Content-Type': 'application/json' }, // Le avisamos al servidor que le mandamos JSON
                body: JSON.stringify({ nombre, email, mensaje }) // Convertimos el objeto JS a una cadena de texto JSON
            });

            // Esperamos la respuesta del servidor y la transformamos también en un objeto legible
            const data = await respuesta.json();

            // Mostramos la alerta usando los datos que nos devolvió el backend (data.msg y data.ok)
            mostrarAlerta(data.msg, data.ok ? 'exito' : 'error');

            // Si el servidor nos confirma que guardó todo bien (ok: true), limpiamos el formulario
            if (data.ok) {
                form.reset(); 
            }

        } catch (error) {
            // Si el servidor está apagado o hay un error de red, cae en este bloque
            console.error("Error en la petición Fetch:", error);
            mostrarAlerta('Hubo un error al conectar con el servidor', 'error');
        }
    });
}