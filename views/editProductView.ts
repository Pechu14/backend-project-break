const editProductView = (product) => {
        return `
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Editar Producto</title>
            <link rel="stylesheet" href="/public/styles.css">
          </head>
          <body>
              <form action="/dashboard/${product._id}?_method=PUT" method="POST">
                <!-- Nombre del Producto -->
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value="${product.nombre}" maxlength="100" required>
                <br><br>
      
                <!-- Descripción del Producto -->
                <label for="descripcion">Descripción:</label>
                <textarea id="descripcion" name="descripcion" maxlength="300" required>${product.descripcion}</textarea>
                <br><br>
      
                <!-- Categoría del Producto -->
                <label for="categoria">Categoría:</label>
                <select id="categoria" name="categoria" required>
                  <option value="Camisetas" ${product.categoria === "Camisetas" ? "selected" : ""}>Camisetas</option>
                  <option value="Pantalones" ${product.categoria === "Pantalones" ? "selected" : ""}>Pantalones</option>
                  <option value="Zapatos" ${product.categoria === "Zapatos" ? "selected" : ""}>Zapatos</option>
                  <option value="Accesorios" ${product.categoria === "Accesorios" ? "selected" : ""}>Accesorios</option>
                </select>
                <br><br>
      
                <!-- Talla del Producto -->
                <label for="talla">Talla:</label>
                <select id="talla" name="talla" required>
                  <option value="XS" ${product.talla === "XS" ? "selected" : ""}>XS</option>
                  <option value="S" ${product.talla === "S" ? "selected" : ""}>S</option>
                  <option value="M" ${product.talla === "M" ? "selected" : ""}>M</option>
                  <option value="L" ${product.talla === "L" ? "selected" : ""}>L</option>
                  <option value="XL" ${product.talla === "XL" ? "selected" : ""}>XL</option>
                </select>
                <br><br>
      
                <!-- Precio del Producto -->
                <label for="precio">Precio:</label>
                <input type="number" id="precio" name="precio" value="${product.precio}" step="0.01" min="0" required>
                <br><br>
      
                <!-- Botón de enviar -->
                <button type="submit">Actualizar Producto</button>
              </form>
      
              <!-- Formulario para eliminar el producto -->
              <form action="/dashboard/${product._id}/delete" method="POST">
                <input type="hidden" name="_method" value="DELETE">
                <button type="submit">Eliminar Producto</button>
              </form>
            
              <a href="/dashboard">Volver al dashboard</a>
          </body>
          </html>
        `;
      }
      
      module.exports = editProductView;
      