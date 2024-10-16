Pasos para la instalación:
 1-Clona el repositorio

 2-Instala las dependencias con npm install:
    dotenv: Para cargar variables de entorno desde un archivo .env.
    express: Framework web para manejar rutas y middleware.
    method-override: Permite el uso de verbos HTTP como PUT o DELETE en navegadores que no los soportan.
    mongodb: Controlador oficial de MongoDB para Node.js.
    mongoose: Herramienta para modelar objetos y gestionar esquemas en MongoDB.
    multer: Middleware para la carga de archivos.
    swagger-jsdoc: Generador de documentación Swagger a partir de comentarios en el código.
    swagger-ui-express: Interfaz visual de Swagger para la documentación de la API.

3-Crea un archivo .env con las variables de entorno:
    MONGO_URI
    PORT
    HOST

4-Inincia con npm start.

5-Ya puedes acceder a las rutas desde el navegador,con Postamn o ver la documentacion.


Rutas de la API con las siguientes operaciones:

GET /api/products: Obtiene una lista de todos los productos.
GET /api/products/:_id: Obtiene un producto por su ID.
POST /api/products/:_id: Crea un nuevo producto.
PUT /api/products/:_id: Actualiza un producto existente por su ID.
DELETE /api/products/:_id: Elimina un producto por su ID.


Controladores de Productos

showNewProduct: Muestra un formulario para crear un nuevo producto.
createProduct: Crea un nuevo producto en la base de datos.
showProducts: Muestra una lista de todos los productos en formato HTML.
showProductById: Muestra los detalles de un producto específico según su ID.
deleteProduct: Elimina un producto de la base de datos.
showDashboard: Muestra un dashboard con todos los productos en formato HTML.
showEditProduct: Muestra un formulario para editar un producto existente.
updateProduct: Actualiza los datos de un producto existente en la base de datos.
showProductsByCategory: Muestra los productos filtrados por categoría.


Configuración de Multer
Para manejar la carga de imágenes, se utiliza Multer.


El modelo de producto (PRODUCT) tiene los siguientes campos:
    nombre: Nombre del producto (string, requerido).
    descripcion: Descripción del producto (string, requerido).
    imagen: URL de la imagen del producto (string, opcional).
    categoria: Categoría del producto (enum: "Camisetas", "Pantalones", "Zapatos", "Accesorios").
    talla: Talla del producto (enum: "XS", "S", "M", "L", "XL").
    precio: Precio del producto (number, requerido).
