// dashboard.js - Lógica para el dashboard

// Asegurarse de que la API esté disponible
if (typeof obtenerDatos === 'undefined') {
    console.error('API no disponible. Asegúrate de incluir api.js antes de este archivo.');
}

// Función para actualizar todos los elementos del dashboard
function actualizarDashboard() {
    // Actualizar consumo de energía
    const historialKilovatios = obtenerDatos('data/kilovatios.json');
    const consumoElement = document.querySelector('#dashboard .card-body .row .col-md-4:first-child .card-text');
    
    if (historialKilovatios.length > 0) {
        // Obtener el primer día del mes actual
        const now = new Date();
        const primerDiaMes = new Date(now.getFullYear(), now.getMonth(), 1);
        
        // Filtrar lecturas del mes actual
        const lecturasMesActual = historialKilovatios.filter(lectura => new Date(lectura.fecha) >= primerDiaMes);
        
        if (lecturasMesActual.length > 0) {
            // Ordenar por fecha
            lecturasMesActual.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            
            // Calcular consumo total del mes
            let consumoTotal = 0;
            for (let i = 1; i < lecturasMesActual.length; i++) {
                consumoTotal += lecturasMesActual[i].lectura - lecturasMesActual[i-1].lectura;
            }
            
            if (consumoElement) {
                consumoElement.textContent = `${consumoTotal.toFixed(2)} kWh`;
            }
        } else {
            if (consumoElement) consumoElement.textContent = '0.00 kWh';
        }
    } else {
        if (consumoElement) consumoElement.textContent = '-- kWh';
    }
    
    // Actualizar lista de compras
    const listaCompras = obtenerDatos('data/compras.json');
    const pendientesSuper = listaCompras.filter(item => !item.comprado).length;
    const superElement = document.querySelector('#dashboard .card-body .row .col-md-4:nth-child(2) .card-text');
    
    if (superElement) {
        superElement.textContent = `${pendientesSuper}`;
    }
    
    // Actualizar tareas pendientes
    const listaTareas = obtenerDatos('data/tareas.json');
    const pendientesTareas = listaTareas.filter(tarea => !tarea.completada).length;
    const tareasElement = document.querySelector('#dashboard .card-body .row .col-md-4:nth-child(3) .card-text');
    
    if (tareasElement) {
        tareasElement.textContent = `${pendientesTareas}`;
    }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar datos de ejemplo si no existen
    inicializarDatos();
    
    // Actualizar dashboard
    actualizarDashboard();
    
    // Configurar actualización periódica cada 30 segundos
    setInterval(actualizarDashboard, 30000);
});