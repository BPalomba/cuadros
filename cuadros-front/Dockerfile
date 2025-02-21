# Usa una imagen oficial de Nginx
FROM nginx:alpine

# Elimina la configuración por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos estáticos al contenedor
COPY . /usr/share/nginx/html/

# Exponer el puerto 80 (default de Nginx)
EXPOSE 80

# Comando para iniciar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]