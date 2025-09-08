# Documentación de la Aplicación Web Personal

## 1. Descripción General

Esta aplicación web personal es un sitio integral que sirve como presentación profesional y como plataforma para gestionar tareas y métricas personales. Combina una página web tradicional con aplicaciones interactivas que permiten al usuario registrar y monitorear información relevante para su vida diaria.

## 2. Objetivos

*   **Presentación Personal**: Mostrar al usuario como profesional, incluyendo su biografía, proyectos, habilidades y medios de contacto.
*   **Gestión de Tareas**: Proporcionar herramientas para organizar tareas cotidianas como el registro de consumo eléctrico, lista de compras y gestión de tareas generales.
*   **Seguimiento de Métricas**: Ofrecer un dashboard para visualizar resúmenes de las actividades registradas en las diferentes aplicaciones.
*   **Autoalojamiento**: Ser fácil de implementar y mantener en un servidor personal.
*   **Experiencia Visual Mejorada**: Incorporar efectos visuales modernos y partículas para una experiencia de usuario más atractiva.

## 3. Arquitectura

La aplicación sigue una arquitectura cliente-servidor simplificada, donde toda la lógica se ejecuta en el lado del cliente (navegador). Los datos se almacenan en archivos JSON que simulan un sistema de archivos, con la posibilidad de migrar a un backend real en el futuro.

### 3.1. Tecnologías Utilizadas

*   **HTML5**: Para la estructura semántica de las páginas.
*   **CSS3**: Para el diseño y presentación visual.
*   **Bootstrap 5**: Framework CSS para diseño responsivo y componentes predefinidos.
*   **JavaScript (ES6+)**: Para la interactividad y la lógica de las aplicaciones.
*   **LocalStorage**: API del navegador para almacenamiento simulado de archivos JSON.
*   **Font Awesome**: Biblioteca de iconos vectoriales.
*   **Particles.js**: Biblioteca para crear efectos de partículas animadas en el fondo.

### 3.2. Estructura de Carpetas

```
mi-web-personal/
│
├── index.html                 # Página de inicio
├── sobre-mi.html              # Página "Sobre Mí"
├── proyectos.html             # Página de Proyectos
├── conocimiento.html          # Página de Conocimiento/Habilidades
├── contacto.html              # Página de Contacto
├── aplicaciones.html          # Página principal de aplicaciones (menú)
│
├── css/
│   ├── bootstrap.min.css       # Bootstrap CSS
│   ├── styles.css              # CSS personalizado
│   └── effects.css             # CSS para efectos visuales especiales
│
├── js/
│   ├── bootstrap.bundle.min.js # Bootstrap JS
│   ├── main.js                 # JavaScript principal
│   ├── api.js                  # Simulación de API para manejo de archivos JSON
│   ├── effects.js              # JavaScript para efectos visuales y partículas
│   └── apps/                   # Carpeta para JS de aplicaciones
│       ├── kilovatios.js       # Lógica para la app de kilovatios
│       ├── super.js            # Lógica para la app del super
│       ├── tareas.js           # Lógica para la app de tareas
│       └── dashboard.js        # Lógica para el dashboard
│
├── assets/
│   ├── images/                 # Imágenes de perfil, proyectos, etc.
│   │   └── astronaut-profile.svg # Imagen de perfil de astronauta
│   └── icons/                  # Iconos personalizados
│
├── data/                       # Archivos JSON para almacenamiento de datos
│   ├── kilovatios.json         # Datos de lecturas de kilovatios
│   ├── compras.json            # Datos de lista de compras
│   └── tareas.json             # Datos de tareas
│
└── README.md                   # Este documento
```

## 4. Funcionamiento

### 4.1. Navegación

La navegación se realiza a través de una barra de navegación fija en la parte superior que permite acceder a todas las secciones principales del sitio: Inicio, Sobre Mí, Proyectos, Conocimiento, Contacto y Aplicaciones.

### 4.2. Páginas de Contenido

Las páginas de contenido (Sobre Mí, Proyectos, Conocimiento, Contacto) son páginas HTML estáticas con datos e imágenes ficticias que pueden ser reemplazados con información real.

### 4.3. Efectos Visuales

La aplicación incorpora una serie de efectos visuales para mejorar la experiencia del usuario:

*   **Fondo animado con partículas**: Utiliza la biblioteca Particles.js para crear un fondo dinámico e interactivo.
*   **Efecto de tornasol (iris)**: Aplicado a títulos importantes para crear un efecto de brillo cambiante.
*   **Efecto de aparición suave**: Los elementos aparecen gradualmente al cargar la página.
*   **Efecto de pulso**: Botones y elementos importantes tienen un efecto de pulso sutil.
*   **Efecto de brillo**: Imágenes y elementos clave tienen un efecto de brillo.
*   **Partículas interactivas**: Al hacer clic en cualquier parte de la página (excepto en botones), se generan partículas animadas.

### 4.4. Aplicaciones Personales

La sección de aplicaciones (`aplicaciones.html`) contiene formularios interactivos y tablas para gestionar diferentes tipos de datos personales.

#### 4.4.1. Registro de Kilovatios

*   **Funcionalidad**: Permite registrar lecturas del medidor eléctrico con fecha y calcular el consumo entre lecturas.
*   **Componentes**:
    *   Formulario para ingresar fecha y lectura.
    *   Tabla para mostrar el historial de lecturas.
    *   Cálculo automático de consumo entre lecturas.
*   **Almacenamiento**: Los datos se guardan en `data/kilovatios.json`.

#### 4.4.2. Gestión de Compras (Super)

*   **Funcionalidad**: Permite crear y gestionar una lista de compras con categorías y cantidades.
*   **Componentes**:
    *   Formulario para añadir ítems con nombre, categoría y cantidad.
    *   Lista para mostrar los ítems, con opción de marcar como comprados.
*   **Almacenamiento**: Los datos se guardan en `data/compras.json`.

#### 4.4.3. Tareas Varias

*   **Funcionalidad**: Permite crear y gestionar una lista de tareas con fechas de vencimiento y prioridades.
*   **Componentes**:
    *   Formulario para añadir tareas con descripción, fecha de vencimiento y prioridad.
    *   Lista para mostrar las tareas, ordenadas por estado (pendientes primero) y fecha.
*   **Almacenamiento**: Los datos se guardan en `data/tareas.json`.

#### 4.4.4. Dashboard

*   **Funcionalidad**: Muestra un resumen visual de las métricas de las otras aplicaciones.
*   **Componentes**:
    *   Tarjetas con resúmenes numéricos (consumo de energía del mes, ítems por comprar, tareas pendientes).
    *   Espacio reservado para gráficos (en una implementación futura).
*   **Almacenamiento**: No almacena datos propios, sino que lee y procesa los datos de las otras aplicaciones.

### 4.5. Almacenamiento de Datos

Todas las aplicaciones utilizan un sistema de simulación de API (`js/api.js`) que almacena los datos en archivos JSON usando `localStorage` del navegador. Esto permite:

*   Mantener una estructura de archivos clara y organizada.
*   Facilitar una futura migración a un backend real que maneje archivos JSON reales.
*   Los datos persisten entre sesiones del navegador.
*   Los datos están asociados al dominio donde se ejecuta la aplicación.
*   Los datos se pierden si el usuario borra el historial del navegador o si se accede desde un navegador diferente.

## 5. Flujo de Datos

1.  El usuario interactúa con los formularios de las aplicaciones.
2.  El JavaScript correspondiente a cada aplicación captura los datos del formulario.
3.  Los datos se recuperan del archivo JSON simulado, se modifican (añadir, eliminar, actualizar) y se vuelven a guardar en el archivo JSON simulado.
4.  La interfaz se actualiza dinámicamente para reflejar los cambios.
5.  El dashboard periódicamente (cada 30 segundos) lee los datos de todas las aplicaciones y actualiza sus resúmenes.

## 6. Consideraciones de Seguridad

*   **Datos Locales**: Todos los datos se almacenan localmente en el navegador del usuario, por lo que no hay transmisión de datos sensibles a través de la red.
*   **Sin Autenticación**: La aplicación no implementa un sistema de autenticación, por lo que cualquier persona con acceso al sitio puede ver y modificar los datos.
*   **Validación de Entrada**: La aplicación realiza una validación básica de entrada en el lado del cliente, pero no protege contra ataques más sofisticados.

## 7. Optimización de Recursos

Para garantizar un buen rendimiento y no exigir recursos innecesarios:

*   **Configuración optimizada de partículas**: Se han ajustado el número de partículas y la complejidad de las interacciones para mejorar el rendimiento.
*   **Uso eficiente de CSS**: Se utilizan transformaciones y animaciones CSS hardware-accelerated cuando es posible.
*   **Carga diferida**: Los efectos visuales se aplican solo cuando es necesario.
*   **Eventos optimizados**: Los eventos de interacción están optimizados para no bloquear el hilo principal.

## 8. Despliegue

### 8.1. En un Servidor Web

1.  Copiar toda la carpeta `mi-web-personal` al directorio raíz de tu servidor web (por ejemplo, `htdocs` en XAMPP, `www` en WAMP, o el directorio configurado en Apache/Nginx).
2.  Asegurarse de que el servidor esté configurado para servir archivos `.html` correctamente.
3.  Acceder al sitio mediante la URL correspondiente (por ejemplo, `http://tu-ip/mi-web-personal/index.html`).

### 8.2. Consideraciones Adicionales

*   **Sin Backend**: Esta versión no requiere un servidor backend, lo que simplifica el despliegue.
*   **Dominio Personalizado**: Si tienes un dominio, puedes configurar tu servidor para servir el sitio desde ese dominio.
*   **HTTPS**: Para mayor seguridad, especialmente si planeas añadir formularios de contacto que envíen correos, considera configurar HTTPS en tu servidor.

## 9. Mantenimiento y Expansión

*   **Actualizaciones de Contenido**: Para actualizar el contenido estático (textos, imágenes), simplemente modifica los archivos HTML y CSS correspondientes.
*   **Expansión de Funcionalidades**: Para añadir nuevas aplicaciones, sigue la estructura existente: crea una nueva sección en `aplicaciones.html`, añade el JavaScript correspondiente en `js/apps/` y actualiza el dashboard si es necesario.
*   **Mejoras Visuales**: Puedes personalizar el diseño modificando `css/styles.css` o añadiendo nuevas hojas de estilo.
*   **Backend Futuro**: Si en el futuro necesitas sincronización entre dispositivos o almacenamiento en servidor, se podría añadir un backend con Node.js, Python, etc. que maneje archivos JSON reales o una base de datos.

## 10. Cambios Recientes

*   **Creación de páginas faltantes**: Se han creado las páginas `sobre-mi.html`, `proyectos.html`, `conocimiento.html` y `contacto.html` con datos e imágenes ficticias.
*   **Sistema de almacenamiento en JSON**: Se ha implementado un sistema de simulación de API (`js/api.js`) para manejar archivos JSON.
*   **Archivos de datos**: Se han creado archivos JSON en la carpeta `data/` para almacenar los datos de las aplicaciones.
*   **Actualización de JavaScript**: Los archivos JavaScript de las aplicaciones han sido actualizados para usar el nuevo sistema de almacenamiento en JSON.
*   **Integración de efectos visuales**: Se han integrado efectos visuales y partículas animadas de la web de respaldo para mejorar la experiencia del usuario.
*   **Creación de archivos CSS y JS para efectos**: Se han creado `css/effects.css` y `js/effects.js` para manejar los efectos visuales y las partículas.
*   **Optimización de recursos**: Se ha optimizado la configuración de partículas y efectos para no exigir recursos innecesarios.
*   **Color original de "Mi Web Personal"**: Se ha revertido el color del logo en el footer al gradiente original con tonos púrpura.
*   **Imagen de chip minimalista**: Se ha creado una imagen de perfil minimalista de un chip de procesador con fondo transparente, representando la especialidad técnica con un diseño limpio y sencillo sin marcas comerciales.
*   **Texto con efecto metálico refinado**: Se ha restablecido el efecto metálico en el texto "Hola soy Daniel Vasquez" con tonos grises y plata, eliminando completamente el molesto contorno amarillo y reduciendo la expansión de la sombra y animación.
*   **Efecto metálico en todos los títulos**: Se ha aplicado el efecto metálico refinado a todos los títulos (h1, h2, h3) de todas las pantallas para una experiencia cohesiva y consistente.
*   **Texto consistente**: Se ha mantenido el texto "Hola soy Daniel Vasquez" en todas las pantallas.
*   **Barra superior más transparente**: Se ha ajustado la barra de navegación para que sea aún más transparente y permita ver mejor las partículas de fondo.
*   **Estilo metálico original en títulos**: Se han revertido los títulos al estilo metálico original con gradiente púrpura/azul.
*   **Fondos transparentes**: Se han hecho más transparentes las secciones con clase .bg-light para que no interfieran con el fondo de partículas.
*   **Eliminación de efectos amarillos**: Se han eliminado todos los efectos y colores amarillos, reemplazándolos por tonos gris metálico.
*   **Corrección de texto en negro**: Se han corregido los textos que aparecían en negro para que sean blancos.
*   **Estilo minimalista con iconos modernos**: Se ha implementado un diseño minimalista con iconos coloridos y modernos en toda la web.