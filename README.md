# UnaHur Anti-Social Net 🌐 - Red Social en React

Aplicación web desarrollada en React y TypeScript para la red social **"UnaHur Anti-Social Net"**. Permite a los usuarios explorar un feed dinámico de publicaciones recientes, registrarse, iniciar sesión mediante autenticación simulada con persistencia, visualizar detalles de posteos, interactuar mediante comentarios, gestionar su perfil y crear nuevas publicaciones con imágenes y etiquetas.

## 🛠️ Tecnologías Utilizadas
- **React + TypeScript** (Componentes funcionales, tipado estricto y Hooks: `useState`, `useEffect`, `useContext`).
- **React Router DOM** (Gestión de rutas, navegación Single Page Application y rutas protegidas).
- **Bootstrap 5 & React-Bootstrap** (Framework CSS para diseño responsivo, tarjetas y componentes visuales modernos).
- **Context API & LocalStorage** (Gestión global y persistencia de la sesión del usuario).
- **Vite** (Entorno de desarrollo y empaquetado rápido).

## ✨ Funcionalidades Principales
1. **Inicio de Sesión y Registro (`/login`, `/register`)**: Autenticación simulada validando usuarios contra la API y contraseña fija (`123456`), con persistencia en `localStorage`. Formulario de registro controlado con validación de campos obligatorios y manejo de errores ante usuarios duplicados.
2. **Feed Principal (Home `/`)**: Banner de bienvenida institucional y listado cronológico de publicaciones recientes mostrando descripción, imágenes asociadas, etiquetas en formato píldora, contador de comentarios y acceso directo al detalle.
3. **Detalle de Publicación (`/post/:id`)**: Vista individual con la descripción completa, imágenes, etiquetas y lista de comentarios visibles. Incluye un formulario controlado con validación para publicar nuevos comentarios.
4. **Perfil de Usuario (`/profile` - Ruta Protegida)**: Acceso exclusivo para usuarios logueados. Muestra el `nickName` del usuario actual, el listado filtrado de sus propias publicaciones y opción para cerrar sesión (*Logout*).
5. **Crear Nueva Publicación (`/create-post` - Ruta Protegida)**: Formulario controlado para redactar posteos (descripción obligatoria), adjuntar una o más URLs de imágenes y seleccionar etiquetas obtenidas dinámicamente desde la API.

## 🔗 API Utilizada
El FrontEnd consume el backend de la materia Estrategias de persistencia:
- **URL / Repositorio de la API:** https://gitea.unahur.edu.ar/Estrategia-de-persistencia-C2-2026/trabajo-practico-2-bugbusters

## 📦 Instrucciones para Instalar y Correr el Proyecto Localmente
Tener instalado [Node.js](https://nodejs.org/) en tu computadora. Luego, ejecutar los siguientes comandos en tu terminal:

1. Clonar este repositorio.
2. Instalar las dependencias del proyecto:
* npm install
3. Correr el proyecto:
* npm run dev

## 👥 Integrantes del grupo
* Díaz Rocío Belén
* Castex Juan Manuel