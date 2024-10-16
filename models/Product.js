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
    precio: { type: Number, required: true } 
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
