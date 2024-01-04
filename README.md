# Recruitment Chat Assistant

Recruitment Chat Assistant es un PoC para un proyecto que busca ayudar a las empresas que buscan contratar personal a interactuar, a través de lenguaje natural, con diferentes origenes de datos que incluyen los mejores candidatos a los puestos mas requeridos en técnologia.
Para esta PoC se utiliza una base de candidatos tipo dummy, obtenida desde fuentes publicas. Esta informacion es consumida con el agente IA, que se encarga de interactuar con los usuarios finales a traves de NLP.
Este es un repositorio monorepo que incluye una aplicación de backend en Node.js con Express.js y una aplicación de frontend en ReactJS. 

## Estructura del Repo

El repo está estructurado en dos carpetas principales:

- `backend`: Contiene la aplicación de backend en Node.js y Express.js.
- `frontend`: Contiene la aplicación de frontend en ReactJS.

## Backend

El backend es una aplicación de Node.js que utiliza Express.js para proporcionar un endpoint en `/api/v1/threads`.

Para ejecutar el backend, navega a la carpeta `backend` y ejecuta los siguientes comandos:

```bash
npm install
npm start
```

Frontend
El frontend es una aplicación de React creada con Vite. Incluye una interfaz de chat básica que envía mensajes al endpoint /api/v1/threads del backend.

Para ejecutar el frontend, navega a la carpeta frontend y ejecuta los siguientes comandos:

```bash
npm install
npm run dev
```

Esto iniciará el servidor de desarrollo de Vite en el puerto 5000.

Contribuir
Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para sugerir cambios o mejoras.
