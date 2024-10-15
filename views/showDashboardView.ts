const htmlDashboard = (productCards) =>{ 
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/public/styles.css">
        <title>Dashboard - Productos</title>
    </head>
    <body>
        <h1>Dashboard de Productos</h1>
        <nav>
        <a href="/products/categoria/Camisetas">Camisetas</a>
        <a href="/products/categoria/Pantalones">Pantalones</a>
        <a href="/products/categoria/Zapatos">Zapatos</a>
        <a href="/products/categoria/Accesorios">Accesorios</a>
        <a href="/dashboard">Dashboard</a></li>
        <a href="/dashboard/new">Subir Producto</a>
        </nav>
        ${productCards}
    </body>
    </html>
    `
}

module.exports = htmlDashboard ;