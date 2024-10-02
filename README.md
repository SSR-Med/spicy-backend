# Spicy Backend

## Descripción

Spicy Backend es un proyecto de backend desarrollado en Node.js que maneja la lógica de negocio para un sistema de cartas de usuario. Este proyecto incluye servicios para gestionar cartas, usuarios y elementos asociados. Utiliza una base de datos PostgreSQL y JWT para la autenticación.

## Instalación

Para instalar y ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/spicy-backend.git
    ```

2. Navega al directorio del proyecto:
    ```sh
    cd spicy-backend
    ```

3. Instala las dependencias:
    ```sh
    npm install
    ```

4. Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:
    ```properties
    PORT=3000

    DATABASE_HOST=ep-ancient-hall-a5tsokx0.us-east-2.aws.neon.tech
    DATABASE_NAME='spicy'
    DATABASE_USER='spicy_owner'
    DATABASE_PASSWORD='2C8yzJWfbsov'
    DATABASE_PORT=5432
    ENDPOINT_DATABASE='ep-ancient-hall-a5tsokx0'

    JWT_KEY=oiHwYHLV0zfxvRQVFyLCK4U6jsHJr++fPNwjAkm3dcA8L++oxH3iyFIyE6MIHcAgEBBEIwdlOtzbTsAqybXA1P9YFKCOhgYkDgYYABAEIY0NQdJswhOJ1jG1d5YXhpPyLtEwd4EEAvSwT/Ju/u760qsz5UbAnq6rWYrOtWjMUONxVp1lQfBBpWrYty0DAugB07eMmjx9ngHDMOtPl/M2WdO/Jl0wA2VpWfW7UFxARM+kfxGY3nQrLNE9p7m195e8FCPZYWlzbveHGmtRFOahzu7sSMzc77NxCI/ZW8gNFA==
    JWT_EXPIRES_IN=1d

    SALT=8
    ```

5. Inicia el servidor:
    ```sh
    npm run dev
    ```
