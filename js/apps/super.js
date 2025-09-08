// super.js - Lógica para la aplicación de gestión de compras

// Asegurarse de que la API esté disponible
if (typeof obtenerDatos === 'undefined' || typeof guardarDatos === 'undefined') {
    console.error('API no disponible. Asegúrate de incluir api.js antes de este archivo.');
}

// Función para cargar la lista de compras desde el "archivo JSON"
function cargarListaCompras() {
    const lista = obtenerDatos('data/compras.json');
    const ul = document.getElementById('listaCompras');
    
    // Limpiar lista
    ul.innerHTML = '';
    
    if (lista.length === 0) {
        ul.innerHTML = '<li class="list-group-item text-center">No hay ítems en la lista aún.</li>';
        return;
    }
    
    // Agregar ítems a la lista
    lista.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div>
                <input type="checkbox" id="item-${item.id}" ${item.comprado ? 'checked' : ''}>
                <label for="item-${item.id}" class="${item.comprado ? 'text-decoration-line-through text-muted' : ''}">
                    ${item.nombre} (${item.cantidad}) - <small>${item.categoria}</small>
                </label>
            </div>
            <button class="btn btn-sm btn-danger" onclick="eliminarItem(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        ul.appendChild(li);
        
        // Agregar event listener al checkbox
        const checkbox = li.querySelector(`#item-${item.id}`);
        checkbox.addEventListener('change', function() {
            marcarComoComprado(item.id, this.checked);
        });
    });
}

// Función para añadir un nuevo ítem
function anadirItem(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombreItem').value;
    const categoria = document.getElementById('categoriaItem').value;
    const cantidad = parseInt(document.getElementById('cantidadItem').value);
    
    if (!nombre) {
        alert('Por favor, ingrese el nombre del ítem.');
        return;
    }
    
    // Obtener lista actual
    let lista = obtenerDatos('data/compras.json');
    
    // Generar un ID único para el nuevo ítem
    const nuevoId = lista.length > 0 ? Math.max(...lista.map(item => item.id)) + 1 : 1;
    
    // Agregar nuevo ítem
    lista.push({
        id: nuevoId,
        nombre: nombre,
        categoria: categoria,
        cantidad: cantidad,
        comprado: false
    });
    
    // Guardar en el "archivo JSON"
    guardarDatos('data/compras.json', lista);
    
    // Limpiar formulario
    document.getElementById('superForm').reset();
    
    // Recargar lista
    cargarListaCompras();
    
    // Actualizar dashboard
    actualizarDashboardSuper();
}

// Función para marcar un ítem como comprado
function marcarComoComprado(id, comprado) {
    let lista = obtenerDatos('data/compras.json');
    const item = lista.find(item => item.id === id);
    if (item) {
        item.comprado = comprado;
        guardarDatos('data/compras.json', lista);
        cargarListaCompras();
        actualizarDashboardSuper();
    }
}

// Función para eliminar un ítem
function eliminarItem(id) {
    if (confirm('¿Está seguro de que desea eliminar este ítem?')) {
        let lista = obtenerDatos('data/compras.json');
        lista = lista.filter(item => item.id !== id);
        guardarDatos('data/compras.json', lista);
        cargarListaCompras();
        actualizarDashboardSuper();
    }
}

// Función para actualizar el dashboard con el número de ítems pendientes
function actualizarDashboardSuper() {
    const lista = obtenerDatos('data/compras.json');
    const pendientes = lista.filter(item => !item.comprado).length;
    const dashboardElement = document.querySelector('#dashboard .card-body .row .col-md-4:nth-child(2) .card-text');
    
    if (dashboardElement) {
        dashboardElement.textContent = `${pendientes}`;
    }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listener al formulario
    const form = document.getElementById('superForm');
    if (form) {
        form.addEventListener('submit', anadirItem);
    }
    
    // Cargar lista inicial
    cargarListaCompras();
    
    // Actualizar dashboard inicial
    actualizarDashboardSuper();
});