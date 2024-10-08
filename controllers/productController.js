const Product = require('../models/Product');


const ProductController = {
  //para crear el producto con get
  create: async (req, res) => {
      
      try {
          const bodyProduct = req.body
          const product = await Product.create(bodyProduct) 
          res.status(201).json(product)
      } catch (error) {
          res
          .status(500)
          .json({message:'There was a problem trying to create a post',error:error.message})
      }
  },

  //para traer el formulario,recoger los datos y crear el producto
  getCreateProductFormView:  async (req, res) => {
      
    const htmlForm = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crear un producto nuevo</title>
      </head>
      <body>
          <form id="productForm" onsubmit="submitForm(event)">
            <!-- Nombre del Producto -->
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" maxlength="100" required>
            <br><br>

            <!-- Descripción del Producto -->
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" name="descripcion" maxlength="300" required></textarea>
            <br><br>

            <!-- Imagen del Producto -->
            <label for="imagen">Imagen:</label>
            <input type="file" id="imagen" name="imagen" accept="image/*">
            <br><br>

            <!-- Categoría del Producto -->
            <label for="categoria">Categoría:</label>
            <select id="categoria" name="categoria" required>
              <option value="Camisetas">Camisetas</option>
              <option value="Pantalones">Pantalones</option>
              <option value="Zapatos">Zapatos</option>
              <option value="Accesorios">Accesorios</option>
            </select>
            <br><br>

            <!-- Talla del Producto -->
            <label for="talla">Talla:</label>
            <select id="talla" name="talla" required>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <br><br>

            <!-- Precio del Producto -->
            <label for="precio">Precio:</label>
            <input type="number" id="precio" name="precio" step="0.01" min="0" required>
            <br><br>

            <!-- Botón de enviar -->
            <button type="submit">Subir Producto</button>
          </form>

          <!-- JavaScript embebido para manejar la solicitud del formulario -->
          <script>
            function submitForm(event) {
              event.preventDefault(); // Evitar el envío tradicional del formulario
              // Obtener los valores de los inputs
              const nuevonombre = document.getElementById('nombre').value;
              const nuevadescripcion = document.getElementById('descripcion').value;
              const nuevacategoria = document.getElementById('categoria').value;
              const nuevatalla = document.getElementById('talla').value;
              const nuevoprecio = document.getElementById('precio').value;

              // Obtener la imagen (opcional)
              const imagenInput = document.getElementById('imagen');
              const imagen = imagenInput.files[0]; // Solo se permite seleccionar un archivo

              // Crear el objeto del producto
              const formData = new FormData(); // Usamos FormData para manejar los datos, incluidas las imágenes
              formData.append('nombre', nombre);
              formData.append('descripcion', descripcion);
              formData.append('categoria', categoria);
              formData.append('talla', talla);
              formData.append('precio', precio);
              if (imagen) {
                formData.append('imagen', imagen); // Adjuntar la imagen solo si se ha seleccionado
              }

              // Hacer la petición HTTP con fetch
              fetch('/dashboard', {
                method: 'POST',
                body: formData, // Enviamos el FormData que contiene los datos y la imagen
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Error en la solicitud');
                }
                return response.json(); // O puedes redirigir o hacer otra cosa con la respuesta
              })
              .then(data => {
                console.log('Producto creado:', data);
                alert('Producto creado con éxito');
              })
              .catch(error => {
                console.error('Error:', error);
                alert('Error al crear el producto');
              });
            }
          </script>

      </body>
      </html>
    `;

    
    res.send(htmlForm);

   

},
}





module.exports = ProductController;