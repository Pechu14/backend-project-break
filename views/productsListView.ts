let productsListView = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Listado de Productos</title>
          <link rel="stylesheet" href="/public/styles.css">
        </head>
        <body>
          <nav>
            <ul>
              <li><a href="/products/categoria/Camisetas">Camisetas</a></li>
              <li><a href="/products/categoria/Pantalones">Pantalones</a></li>
              <li><a href="/products/categoria/Zapatos">Zapatos</a></li>
              <li><a href="/products/categoria/Accesorios">Accesorios</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
            </ul>
        </nav>
        
          <h1>Productos de nuestra tienda</h1>
          <div class="product-list">
      `;

      module.exports = productsListView;