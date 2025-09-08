// tareas.js - Lógica para la aplicación de gestión de tareas

// Asegurarse de que la API esté disponible
if (typeof obtenerDatos === 'undefined' || typeof guardarDatos === 'undefined') {
    console.error('API no disponible. Asegúrate de incluir api.js antes de este archivo.');
}

// Función para cargar la lista de tareas desde el "archivo JSON"
function cargarListaTareas() {
    const lista = obtenerDatos('data/tareas.json');
    const ul = document.getElementById('listaTareas');
    
    // Limpiar lista
    ul.innerHTML = '';
    
    if (lista.length === 0) {
        ul.innerHTML = '<li class="list-group-item text-center">No hay tareas registradas aún.</li>';
        return;
    }
    
    // Ordenar tareas: pendientes primero, luego completadas, ambas ordenadas por fecha de vencimiento
    lista.sort((a, b) => {
        // Si una está completada y la otra no, la no completada va primero
        if (a.completada && !b.completada) return 1;
        if (!a.completada && b.completada) return -1;
        
        // Si ambas tienen el mismo estado de completado, ordenar por fecha de vencimiento
        const fechaA = a.fechaVencimiento ? new Date(a.fechaVencimiento) : new Date(8640000000000000); // Max date if null
        const fechaB = b.fechaVencimiento ? new Date(b.fechaVencimiento) : new Date(8640000000000000);
        return fechaA - fechaB;
    });
    
    // Agregar tareas a la lista
    lista.forEach((tarea) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        
        // Determinar clase de prioridad
        let prioridadClass = '';
        switch(tarea.prioridad) {
            case 'Alta':
                prioridadClass = 'bg-danger text-white';
                break;
            case 'Media':
                prioridadClass = 'bg-warning text-dark';
                break;
            case 'Baja':
                prioridadClass = 'bg-success text-white';
                break;
        }
        
        li.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <input type="checkbox" id="tarea-${tarea.id}" ${tarea.completada ? 'checked' : ''}>
                    <label for="tarea-${tarea.id}" class="${tarea.completada ? 'text-decoration-line-through text-muted' : ''}">
                        ${tarea.descripcion}
                    </label>
                </div>
                <span class="badge ${prioridadClass}">${tarea.prioridad}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2">
                <small class="${!tarea.completada && tarea.fechaVencimiento && new Date(tarea.fechaVencimiento) < new Date() ? 'text-danger' : 'text-muted'}">
                    ${tarea.fechaVencimiento ? `Vence: ${tarea.fechaVencimiento}` : 'Sin fecha de vencimiento'}
                </small>
                <button class="btn btn-sm btn-danger" onclick="eliminarTarea(${tarea.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        ul.appendChild(li);
        
        // Agregar event listener al checkbox
        const checkbox = li.querySelector(`#tarea-${tarea.id}`);
        checkbox.addEventListener('change', function() {
            marcarComoCompletada(tarea.id, this.checked);
        });
    });
}

// Función para añadir una nueva tarea
function anadirTarea(event) {
    event.preventDefault();
    
    const descripcion = document.getElementById('descripcionTarea').value;
    const fechaVencimiento = document.getElementById('fechaVencimiento').value;
    const prioridad = document.getElementById('prioridadTarea').value;
    
    if (!descripcion) {
        alert('Por favor, ingrese la descripción de la tarea.');
        return;
    }
    
    // Obtener lista actual
    let lista = obtenerDatos('data/tareas.json');
    
    // Generar un ID único para la nueva tarea
    const nuevoId = lista.length > 0 ? Math.max(...lista.map(tarea => tarea.id)) + 1 : 1;
    
    // Agregar nueva tarea
    lista.push({
        id: nuevoId,
        descripcion: descripcion,
        fechaVencimiento: fechaVencimiento,
        prioridad: prioridad,
        completada: false
    });
    
    // Guardar en el "archivo JSON"
    guardarDatos('data/tareas.json', lista);
    
    // Limpiar formulario
    document.getElementById('tareasForm').reset();
    
    // Recargar lista
    cargarListaTareas();
    
    // Actualizar dashboard
    actualizarDashboardTareas();
}

// Función para marcar una tarea como completada
function marcarComoCompletada(id, completada) {
    let lista = obtenerDatos('data/tareas.json');
    const tarea = lista.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.completada = completada;
        guardarDatos('data/tareas.json', lista);
        cargarListaTareas();
        actualizarDashboardTareas();
    }
}

// Función para eliminar una tarea
function eliminarTarea(id) {
    if (confirm('¿Está seguro de que desea eliminar esta tarea?')) {
        let lista = obtenerDatos('data/tareas.json');
        lista = lista.filter(tarea => tarea.id !== id);
        guardarDatos('data/tareas.json', lista);
        cargarListaTareas();
        actualizarDashboardTareas();
    }
}

// Función para actualizar el dashboard con el número de tareas pendientes
function actualizarDashboardTareas() {
    const lista = obtenerDatos('data/tareas.json');
    const pendientes = lista.filter(tarea => !tarea.completada).length;
    const dashboardElement = document.querySelector('#dashboard .card-body .row .col-md-4:nth-child(3) .card-text');
    
    if (dashboardElement) {
        dashboardElement.textContent = `${pendientes}`;
    }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listener al formulario
    const form = document.getElementById('tareasForm');
    if (form) {
        form.addEventListener('submit', anadirTarea);
    }
    
    // Cargar lista inicial
    cargarListaTareas();
    
    // Actualizar dashboard inicial
    actualizarDashboardTareas();
});