let productsListView = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Listado de Productos</title>
          <style>
            nav ul {
              list-style-type: none;
              padding: 0;
              display: flex;
              gap: 15px;
            }
            nav ul li {
              display: inline;
            }
            nav ul li a {
              text-decoration: none;
              color: blue;
              font-weight: bold;
            }
            .product-list {
              display: flex;
              flex-wrap: wrap;
            }
            .product-item {
              margin: 10px;
              border: 1px solid #ccc;
              padding: 10px;
              width: 200px;
            }
            .product-item img {
              max-width: 100%;
            }
          </style>
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
        
          <h1>Productos Disponibles</h1>
          <div class="product-list">
      `;

      module.exports = productsListView;