# Bienvenido al coding-interview-backend-level-3

## Descripción
Este proyecto es una API REST que permite realizar operaciones CRUD sobre una entidad de tipo `Item`.

La entidad tiene 3 campos: `id`, `name` y `price`.

Tu tarea es completar la implementación de toda la funcionalidad de forma tal de que los tests e2e pasen exitosamente.

### Que puedes hacer: 
- ✅ Modificar el código fuente y agregar nuevas clases, métodos, campos, etc.
- ✅ Cambiar dependencias, agregar nuevas, etc.
- ✅ Modificar la estructura del proyecto (/src/** es todo tuyo)
- ✅ Elegir una base de datos
- ✅ Elegir un framework web
- ✅ Cambiar la definición del .devContainer


### Que **no** puedes hacer:
- ❌ No puedes modificar el archivo original /e2e/index.test.ts (pero puedes crear otros e2e test si lo deseas)
- ❌ El proyecto debe usar Typescript 
- ❌ Estresarte 🤗


## Pasos para comenzar
1. Haz un fork usando este repositorio como template
2. Clona el repositorio en tu máquina
3. Realiza los cambios necesarios para que los tests pasen
4. Sube tus cambios a tu repositorio
5. Avísanos que has terminado
6. ???
7. PROFIT

### Cualquier duda contactarme a https://www.linkedin.com/in/andreujuan/


# DEV UPDATE

## Tecnologías utilizadas
- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- Zod
- Jest
- SuperTest

## Estructura del proyecto
La estructura del proyecto sigue un patrón de organización por funcionalidades, donde los archivos relacionados con la entidad `Item` se encuentran en el directorio `src/item`.

- `src/item/controllers`: Controladores para las operaciones CRUD de `Item`.
  - `item.post.ts`: Controlador para crear un nuevo item.
  - `item.update.ts`: Controlador para actualizar un item existente.
  - `items.list.ts`: Controlador para listar todos los items.
- `src/item/item.model.ts`: Modelo de Mongoose para la entidad `Item`.
- `src/item/item.routes.ts`: Rutas de Express para las operaciones CRUD de `Item`.

## Validación de datos
Se utiliza la biblioteca Zod para validar y definir esquemas para los datos de entrada y salida de la API. Los esquemas de validación se definen en los controladores correspondientes.

## Tests
Se utilizan tests de integración (e2e) para verificar el correcto funcionamiento de la API. Los archivos de test se encuentran en el directorio `e2e`.

Los tests utilizan la biblioteca Jest y se configuran en el archivo `jest/jest.setupFileAfterEnv.ts`, donde se realiza la conexión a la base de datos y se inicializa la aplicación antes de ejecutar los tests.

Se utilizan fixtures para los datos de prueba en los tests, definidos en el archivo `jest/fixtures/item.ts`.

## Configuración
La aplicación utiliza variables de entorno para configurar la conexión a la base de datos, las cuales se cargan desde un archivo `.env` utilizando la biblioteca `dotenv`.

Se debe ejecutar docker-compose up -d para levantar la db necesaria para ejecutar los tests

## Middlewares
Se utilizan middlewares como `morgan` para el registro de solicitudes HTTP.

## Dependencias
Las principales dependencias utilizadas en el proyecto son:
- Express
- Mongoose
- Zod
- Jest
- SuperTest

Para más detalles, consulta el archivo `package.json`.