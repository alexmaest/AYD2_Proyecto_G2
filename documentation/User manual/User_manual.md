![Net Image](banner.jpg "Banner | RetroMusic")

## Manual de usuario | Fase 1 <img src="https://media.tenor.com/dHk-LfzHrtwAAAAi/linux-computer.gif" alt="drawing" width="30"/>

### _Descripción_

Se requiere desarrollar una aplicación web que permita a los creadores de contenido (artistas) poder registrarse e iniciar sesión, para que puedan acceder a su información como sus canciones o álbumes creados, también deben contar con opción a subir canciones nuevas y crear nuevos álbumes. Debe contar con un usuario administrador que se encargue de regular estos creadores de contenido, debe ser capaz de ver su información y deshabilitar a cualquier creador de contenido si así se requiere.

### _Frameworks y librerías utilizadas_

#### _Frontend_

Para el desarrollo de la aplicación web se utilizaron los siguientes frameworks y librerías:

- Next.js (React): NextJS es un framework de React que permite crear aplicaciones web de forma sencilla y rápida, además de que permite la creación de aplicaciones web con renderizado del lado del servidor (SSR) y del lado del cliente (CSR). Para más información sobre NextJS, se incluye la documentación oficial [documentación oficial](https://nextjs.org/docs/getting-started).

- Tailwind CSS: Tailwind CSS es un framework de CSS que permite la creación de interfaces de usuario de una forma más rápida, esto por medio de clases que se pueden reutilizar y que permiten crear componentes de forma más sencilla. Además que su uso en línea acelera el proceso de desarrollo.

- React Icons: React Icons es una librería que permite la utilización de iconos en React en forma de componentes.

#### _Backend_

Para el desarrollo del backend se utilizaron los siguientes frameworks y librerías:

- Express: Express es un framework de NodeJS que permite la creación de APIs REST.

- MySQL: Se utilizó la librería de MySQL para NodeJS para poder realizar las consultas a la base de datos.

#### _Base de datos_

Para la creación de la base de datos se utilizaron las siguientes herramientas:

- AWS RDS: AWS RDS es un servicio de AWS que permite la creación de bases de datos relacionales en la nube, en este caso se utilizó MySQL.

- MySQL Workbench: MySQL Workbench es una herramienta que permite la administración de bases de datos MySQL, en este caso se utilizó para la creación de la base de datos.

### _Instalación_

#### _Frontend_

Para la instalación del frontend se requiere tener instalado NodeJS y NPM, una vez instalado se debe de clonar el repositorio y ejecutar el siguiente comando en la carpeta del frontend:

```bash
npm install
```

Una vez instaladas las dependencias, se debe de crear un archivo .env.local en la carpeta del frontend, en este archivo se deben de agregar las variables de entorno que le proporcionará el equipo de desarrollo.

#### _Backend_

Para la instalación del backend se requiere tener instalado NodeJS y NPM, una vez instalado se debe de clonar el repositorio y ejecutar el siguiente comando en la carpeta del backend:

```bash
npm install
```

Una vez instaladas las dependencias, se debe de crear un archivo .env en la carpeta del backend, en este archivo se deben de agregar las variables de entorno que le proporcionará el equipo de desarrollo.

### _Ejecución_

#### _Frontend_

Para la ejecución del frontend se debe de ejecutar el siguiente comando en la carpeta del frontend:

```bash
npm run dev
```

#### _Backend_

Para la ejecución del backend se debe de ejecutar el siguiente comando en la carpeta del backend:

```bash
node index.js
```

#### _Base de datos_

El equipo de desarrollo le proporcionará una credencial para poder acceder a la instancia de la base de datos, así como las conexiones hacia la misma.

### _Mockups_

Para la creación de los mockups se utilizó la herramienta de Figma, a continuación se muestra el enlace para poder visualizarlos:

[Mockups](https://www.figma.com/file/mUZaW69b3FZdV4Sk1pS2cA/AYD2?type=design&node-id=1%3A13&mode=design&t=SehCX7bsVXg79aqr-1)

###### _2023 - Laboratorio de Análisis y Diseño de Sistemas 2_

---
