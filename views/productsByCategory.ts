const htmlCategory = (category) =>{
    return `
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Productos en la categoría ${category}</title>
            <link rel="stylesheet" href="/public/styles.css">
          </head>
          <body>
            <nav>
              <a href="/products">Volver a products</a>
              <a href="/products/categoria/Camisetas">Camisetas</a>
              <a href="/products/categoria/Pantalones">Pantalones</a>
              <a href="/products/categoria/Zapatos">Zapatos</a>
              <a href="/products/categoria/Accesorios">Accesorios</a>
              <a href="/dashboard">Dashboard</a></li>
              <a href="/dashboard/new">Subir Producto</a>
            </nav>
            <h1>${category}</h1>
            <ul>`
}

module.exports = htmlCategory;