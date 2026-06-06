// ==========================================
//  Animación de tarjetas 
// ==========================================
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('destacada');
    });

    card.addEventListener('mouseleave', () => {
        card.classList.remove('destacada');
    });
});

// ==========================================
// Función de Alertas Personalizadas 
// ==========================================
function mostrarAlerta(mensaje, tipo) {
    const alerta = document.getElementById('alerta');
    alerta.textContent = mensaje;
    alerta.className = 'alerta ' + tipo;
    alerta.classList.add('visible');

    setTimeout(() => {
        alerta.classList.remove('visible');
    }, 3000);
}

// ==========================================
//  VALIDACIÓN Y ENVÍO CON FETCH 
// ==========================================
const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // Captura de datos eliminando espacios vacíos (.trim())
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validaciones del lado del cliente
        if (nombre.length < 3) {
            mostrarAlerta('El nombre debe tener al menos 3 caracteres', 'error');
            return;
        }

        if (!email.includes('@')) {
            mostrarAlerta('Ingresa un correo válido', 'error');
            return;
        }

        if (mensaje.length < 10) {
            mostrarAlerta('El mensaje debe tener al menos 10 caracteres', 'error');
            return;
        }

        try {
            // Envío de datos al backend en formato JSON
            const respuesta = await fetch('/api/contacto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, mensaje })
            });

            const data = await respuesta.json();

            // Muestra la alerta según la respuesta que dé el servidor
            mostrarAlerta(data.msg, data.ok ? 'exito' : 'error');

            if (data.ok) {
                form.reset(); // Si se envió bien, limpia los campos
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            mostrarAlerta('Hubo un error al conectar con el servidor', 'error');
        }
    });
}