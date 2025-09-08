// main.js - JavaScript principal

// Función para manejar el desplazamiento suave en enlaces de anclaje
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Solo aplicar desplazamiento suave si el href no es solo "#"
        if (this.getAttribute('href') !== '#' && this.getAttribute('href') !== '#!') {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Si el href comienza con '#', es un anclaje en la misma página
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Ajustar el desplazamiento para considerar la altura del navbar
                    const offsetTop = targetElement.offsetTop - 70; // 70px es un poco más que la altura del navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Si no es un anclaje, permitir el comportamiento predeterminado (navegación)
                window.location.href = targetId;
            }
        }
    });
});

// Función para manejar el envío del formulario de contacto (ejemplo)
function handleContactFormSubmit(event) {
    event.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    // Por ahora, solo mostraremos un mensaje
    alert('Gracias por tu mensaje. Esta es una demostración. En una implementación real, el mensaje se enviaría a un servidor.');
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listener al formulario de contacto si existe
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Cualquier otra inicialización que necesites
    console.log('Página cargada y lista.');
});