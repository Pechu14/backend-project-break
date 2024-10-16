module.exports = {
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: "Product identification number",
              example: "6201064b0028de7866e2b2c4"
            },
            nombre: {
              type: 'string',
              description: "Name of the product",
              example: "Gorra"
            },
            descripcion: {
              type: 'string',
              description: "Description of the product",
              example: "Gorra negra con visera plana"
            },
            imagen: {
              type: 'string',
              description: "Image URL or path of the product",
              example: "http://example.com/images/gorra.jpg"
            },
            categoria: {
              type: 'string',
              description: "Category of the product",
              enum: ["Camisetas", "Pantalones", "Zapatos", "Accesorios"],
              example: "Accesorios"
            },
            talla: {
              type: 'string',
              description: "Size of the product",
              enum: ["XS", "S", "M", "L", "XL"],
              example: "M"
            },
            precio: {
              type: 'number',
              description: "Price of the product",
              example: 19.99
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: "Date when the product was created",
              example: "2024-09-30T08:14:00.665Z"
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: "Date when the product was last updated",
              example: "2024-09-30T19:03:26.148Z"
            },
            __v: {
              type: 'integer',
              description: "Version key, used for concurrency control",
              example: 0
            }
          }
        },
        ProductBody: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
              description: "Name of the product",
              example: "Gorra"
            },
            descripcion: {
              type: 'string',
              description: "Description of the product",
              example: "Gorra negra con visera plana"
            },
            imagen: {
              type: 'string',
              description: "Image URL or path of the product",
              example: "http://example.com/images/gorra.jpg"
            },
            categoria: {
              type: 'string',
              description: "Category of the product",
              enum: ["Camisetas", "Pantalones", "Zapatos", "Accesorios"],
              example: "Accesorios"
            },
            talla: {
              type: 'string',
              description: "Size of the product",
              enum: ["XS", "S", "M", "L", "XL"],
              example: "M"
            },
            precio: {
              type: 'number',
              description: "Price of the product",
              example: 19.99
            }
          }
        },
        ProductId: {
          type: 'string',
          description: "ID of the product",
          example: "6201064b0028de7866e2b2c4"
        }
      }
    }
  };
  