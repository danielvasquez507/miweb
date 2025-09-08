# Despliegue de Mi Web Personal en Servidor Linux Debian con Docker Compose

## Descripción
Guía paso a paso para desplegar la aplicación web personal en un servidor Linux Debian utilizando Docker Compose.

## Requisitos Previos
- Servidor Linux Debian con Docker y Docker Compose instalados
- Acceso SSH al servidor
- Permisos suficientes para ejecutar comandos de Docker

## Proceso de Despliegue

### Paso 1: Preparar los archivos localmente

1.1. Navegar al directorio del proyecto:
```bash
cd C:\Users\dany_\Documents\Qwen\mi-web-personal
```

1.2. Crear archivo comprimido de la aplicación:
```bash
tar -czf mi-web-personal.tar.gz *
```

### Paso 2: Transferir archivos al servidor

2.1. Copiar el archivo comprimido al servidor (reemplazar con tus datos):
```bash
scp mi-web-personal.tar.gz usuario@tu-ip-del-servidor:/home/usuario/
```

### Paso 3: Configurar en el servidor

3.1. Conectarse al servidor:
```bash
ssh usuario@tu-ip-del-servidor
```

3.2. Crear directorio para la aplicación:
```bash
sudo mkdir -p /var/www/mi-web-personal
```

3.3. Mover y descomprimir archivos:
```bash
sudo mv mi-web-personal.tar.gz /var/www/mi-web-personal/
cd /var/www/mi-web-personal
sudo tar -xzf mi-web-personal.tar.gz
```

3.4. Establecer permisos adecuados:
```bash
sudo chown -R www-data:www-data /var/www/mi-web-personal
sudo chmod -R 755 /var/www/mi-web-personal
```

### Paso 4: Crear Dockerfile

4.1. Crear archivo Dockerfile:
```bash
sudo nano /var/www/mi-web-personal/Dockerfile
```

4.2. Contenido del Dockerfile:
```dockerfile
FROM nginx:alpine

# Copiar archivos al contenedor
COPY . /usr/share/nginx/html

# Exponer puerto
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
```

### Paso 5: Actualizar docker-compose.yml

5.1. Editar el archivo docker-compose.yml existente:
```bash
sudo nano /ruta/de/tu/docker-compose.yml
```

5.2. Agregar el nuevo servicio al final del archivo:
```yaml
  mi-web-personal:
    build: /var/www/mi-web-personal
    container_name: mi-web-personal
    ports:
      - "8080:80"
    volumes:
      - /var/www/mi-web-personal:/usr/share/nginx/html:ro
    restart: unless-stopped
```

### Paso 6: Reiniciar servicios

6.1. Navegar al directorio donde está docker-compose.yml:
```bash
cd /ruta/de/tu/docker-compose.yml
```

6.2. Detener servicios actuales:
```bash
sudo docker-compose down
```

6.3. Iniciar todos los servicios:
```bash
sudo docker-compose up -d
```

### Paso 7: Verificar el despliegue

7.1. Verificar que el contenedor esté corriendo:
```bash
sudo docker-compose ps
```

7.2. Verificar logs del contenedor:
```bash
sudo docker-compose logs mi-web-personal
```

### Paso 8: Acceder a la aplicación

La aplicación estará disponible en:
- http://tu-ip-del-servidor:8080

## Mantenimiento

### Actualizar la aplicación

1. Repetir los pasos 1 y 2 para transferir nuevos archivos
2. En el servidor, reemplazar los archivos:
```bash
cd /var/www/mi-web-personal
sudo rm -rf *
sudo tar -xzf /home/usuario/mi-web-personal.tar.gz
sudo chown -R www-data:www-data /var/www/mi-web-personal
```

3. Reconstruir y reiniciar el contenedor:
```bash
sudo docker-compose build mi-web-personal
sudo docker-compose up -d mi-web-personal
```

## Solución de Problemas

### Problemas comunes

1. **Permiso denegado**: Asegúrate de usar sudo cuando sea necesario
2. **Puerto ocupado**: Verifica que el puerto 8080 no esté en uso
3. **Contenedor no inicia**: Revisa los logs con `sudo docker-compose logs mi-web-personal`

### Comandos útiles

- Ver contenedores: `sudo docker-compose ps`
- Ver logs: `sudo docker-compose logs`
- Detener servicios: `sudo docker-compose down`
- Iniciar servicios: `sudo docker-compose up -d`