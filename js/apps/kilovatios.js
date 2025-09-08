// kilovatios.js - Lógica para la aplicación de registro de kilovatios

// Asegurarse de que la API esté disponible
if (typeof obtenerDatos === 'undefined' || typeof guardarDatos === 'undefined') {
    console.error('API no disponible. Asegúrate de incluir api.js antes de este archivo.');
}

// Función para cargar el historial de lecturas desde el "archivo JSON"
function cargarHistorial() {
    const historial = obtenerDatos('data/kilovatios.json');
    const tbody = document.getElementById('historialKilovatios');
    
    // Limpiar tabla
    tbody.innerHTML = '';
    
    if (historial.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">No hay lecturas registradas aún.</td></tr>';
        return;
    }
    
    // Ordenar historial por fecha (más reciente primero)
    historial.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    // Calcular consumo y agregar filas
    let lecturaAnterior = null;
    historial.forEach((lectura, index) => {
        const row = document.createElement('tr');
        
        // Calcular consumo
        let consumo = 0;
        if (lecturaAnterior !== null) {
            consumo = lectura.lectura - lecturaAnterior;
        }
        
        row.innerHTML = `
            <td>${lectura.fecha}</td>
            <td>${lectura.lectura.toFixed(2)}</td>
            <td>${consumo > 0 ? consumo.toFixed(2) : '--'}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="eliminarLectura(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
        lecturaAnterior = lectura.lectura;
    });
}

// Función para registrar una nueva lectura
function registrarLectura(event) {
    event.preventDefault();
    
    const fecha = document.getElementById('fechaLectura').value;
    const lectura = parseFloat(document.getElementById('lecturaKwh').value);
    
    if (!fecha || isNaN(lectura)) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
    }
    
    // Obtener historial actual
    let historial = obtenerDatos('data/kilovatios.json');
    
    // Agregar nueva lectura
    historial.push({
        fecha: fecha,
        lectura: lectura
    });
    
    // Guardar en el "archivo JSON"
    guardarDatos('data/kilovatios.json', historial);
    
    // Limpiar formulario
    document.getElementById('kilovatiosForm').reset();
    
    // Recargar historial
    cargarHistorial();
    
    // Actualizar dashboard
    actualizarDashboard();
}

// Función para eliminar una lectura
function eliminarLectura(index) {
    if (confirm('¿Está seguro de que desea eliminar esta lectura?')) {
        let historial = obtenerDatos('data/kilovatios.json');
        historial.splice(index, 1);
        guardarDatos('data/kilovatios.json', historial);
        cargarHistorial();
        actualizarDashboard();
    }
}

// Función para actualizar el dashboard con el consumo actual
function actualizarDashboard() {
    const historial = obtenerDatos('data/kilovatios.json');
    const dashboardElement = document.querySelector('#dashboard .card-body .row .col-md-4:first-child .card-text');
    
    if (historial.length === 0) {
        if (dashboardElement) dashboardElement.textContent = '-- kWh';
        return;
    }
    
    // Obtener el primer día del mes actual
    const now = new Date();
    const primerDiaMes = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Filtrar lecturas del mes actual
    const lecturasMesActual = historial.filter(lectura => new Date(lectura.fecha) >= primerDiaMes);
    
    if (lecturasMesActual.length === 0) {
        if (dashboardElement) dashboardElement.textContent = '0.00 kWh';
        return;
    }
    
    // Ordenar por fecha
    lecturasMesActual.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    
    // Calcular consumo total del mes
    let consumoTotal = 0;
    for (let i = 1; i < lecturasMesActual.length; i++) {
        consumoTotal += lecturasMesActual[i].lectura - lecturasMesActual[i-1].lectura;
    }
    
    if (dashboardElement) {
        dashboardElement.textContent = `${consumoTotal.toFixed(2)} kWh`;
    }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listener al formulario
    const form = document.getElementById('kilovatiosForm');
    if (form) {
        form.addEventListener('submit', registrarLectura);
    }
    
    // Cargar historial inicial
    cargarHistorial();
    
    // Actualizar dashboard inicial
    actualizarDashboard();
});