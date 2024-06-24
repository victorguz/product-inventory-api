# 1. Requisitos
 - Nodejs v20.11.0
 - NPM v10.8.1
 - Nestjs v10.3.2
 - Docker Desktop & Docker Compose
 - Git Client
# 2. Instalación
 - Instale Nodejs (incluye por defecto npm) [https://nodejs.org/en/download/prebuilt-installer](https://nodejs.org/en/download/prebuilt-installer)
 - Instale Git Client [https://git-scm.com/downloads](https://git-scm.com/downloads)
 - Descargue este repositorio en la carpeta de su interés con ```git clone https://github.com/victorguz/product-inventory-api.git```
 - Vaya a la raiz del proyecto y ejecute el comando ```npm install``` esto instalará las dependencias necesarias para ejecutar y compilar el sistema.
 - En la raiz del proyecto ejecute el comando ```docker compose up```. Esto creará una base de datos de PostgreSQL accesible en el puerto 7000. Cambielo si encuentra algún conflicto.
 - En otra consola ejecute el comando ```npm run start:dev``` esto ejecutará el aplicativo nest y tendrá disponible su acceso a traves de [http://localhost:3001/](http://localhost:3001/)

