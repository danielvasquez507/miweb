// api.js - Simulación de API para manejo de archivos JSON

// Función para obtener datos de un "archivo JSON"
function obtenerDatos(archivo) {
    // En una implementación real, esto sería una llamada fetch a un endpoint
    // Por ahora, simulamos leyendo de localStorage
    const datos = localStorage.getItem(archivo);
    return datos ? JSON.parse(datos) : [];
}

// Función para guardar datos en un "archivo JSON"
function guardarDatos(archivo, datos) {
    // En una implementación real, esto sería una llamada fetch POST/PUT a un endpoint
    // Por ahora, simulamos guardando en localStorage
    localStorage.setItem(archivo, JSON.stringify(datos));
}

// Función para inicializar datos de ejemplo si no existen
function inicializarDatos() {
    // Verificar si ya hay datos de kilovatios
    if (!localStorage.getItem('data/kilovatios.json')) {
        const historialEjemplo = [
            { fecha: '2023-05-01', lectura: 1200.50 },
            { fecha: '2023-05-15', lectura: 1250.75 },
            { fecha: '2023-06-01', lectura: 1300.25 },
            { fecha: '2023-06-15', lectura: 1360.00 }
        ];
        guardarDatos('data/kilovatios.json', historialEjemplo);
    }
    
    // Verificar si ya hay datos de lista de compras
    if (!localStorage.getItem('data/compras.json')) {
        const listaEjemplo = [
            { id: 1, nombre: 'Leche', categoria: 'Alimentos', cantidad: 2, comprado: false },
            { id: 2, nombre: 'Pan', categoria: 'Alimentos', cantidad: 1, comprado: true },
            { id: 3, nombre: 'Jabón', categoria: 'Limpieza', cantidad: 3, comprado: false }
        ];
        guardarDatos('data/compras.json', listaEjemplo);
    }
    
    // Verificar si ya hay datos de tareas
    if (!localStorage.getItem('data/tareas.json')) {
        const tareasEjemplo = [
            { id: 1, descripcion: 'Preparar presentación', fechaVencimiento: '2023-06-30', prioridad: 'Alta', completada: false },
            { id: 2, descripcion: 'Comprar regalo', fechaVencimiento: '2023-07-05', prioridad: 'Media', completada: false },
            { id: 3, descripcion: 'Llamar al médico', fechaVencimiento: '2023-06-20', prioridad: 'Baja', completada: true }
        ];
        guardarDatos('data/tareas.json', tareasEjemplo);
    }
}