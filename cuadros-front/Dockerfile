# Usa la imagen oficial de Nginx ligera
FROM nginx:alpine

# Directorio de trabajo donde Nginx sirve los archivos
WORKDIR /usr/share/nginx/html

# Borra la configuración por defecto si quieres (opcional)
RUN rm -rf ./*

# Copia todos los archivos de tu proyecto frontend al contenedor
COPY . .


