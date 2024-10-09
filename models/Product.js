
/*Nombre
Descripción
Imagen: imagen dentro de una la carpeta public y el archivo images
Categoría
Talla
Precio
La categoría será un string que podrá ser "Camisetas", "Pantalones", "Zapatos", "Accesorios".

La talla será un string que podrá ser "XS", "S", "M", "L", "XL".*/


const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true, maxlength: 100 },
    descripcion: { type: String, required: true, maxlength: 300 },
    imagen: { type: String, required: false },
    categoria: {
        type: String,
        required: true,
        enum: ["Camisetas", "Pantalones", "Zapatos", "Accesorios"],
    },
    talla: {
        type: String,
        required: true,
        enum: ["XS", "S", "M", "L", "XL"],
    },
    precio: { type: Number, required: true } //TODO: set: value => parseFloat(value.toFixed(2)) }
    //he tenido que quitar el tofixed porque daba error
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
