const htmlById = (product) => { 
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Detalle del Producto</title>
          <link rel="stylesheet" href="/public/styles.css">
        </head>
        <body>
          <h1>${product.nombre}</h1>
          <img src="http://localhost:8080/public/images/${product.imagen}" alt="${product.nombre}">
          <p>${product.descripcion}</p>
          <p>Precio: ${product.precio}€</p>
          <p>ID: ${product._id}</p>
          <a href="/products">Volver al listado</a>
        </body>
        </html>
      `;
}

module.exports = htmlById

