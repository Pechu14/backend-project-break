module.exports = {
    paths: {
      '/api/products': {
        get: {
          tags: ['Products'],
          summary: 'Obtener la lista de todos los productos',
          description: 'Este endpoint devuelve una lista de todos los productos disponibles.',
          responses: {
            200: {
              description: 'Lista de productos obtenida exitosamente',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product',
                    },
                  },
                },
              },
            },
            500: {
              description: 'Error al obtener la lista de productos',
            },
          },
        },
        post: {
          tags: ['Products'],
          summary: 'Crear un nuevo producto',
          description: 'Este endpoint permite crear un nuevo producto en la base de datos.',
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    nombre: {
                      type: 'string',
                      description: 'Nombre del producto',
                      example: 'Gorra',
                    },
                    descripcion: {
                      type: 'string',
                      description: 'Descripción del producto',
                      example: 'Gorra negra con visera plana',
                    },
                    categoria: {
                      type: 'string',
                      description: 'Categoría del producto',
                      enum: ["Camisetas", "Pantalones", "Zapatos", "Accesorios"],
                      example: 'Accesorios',
                    },
                    talla: {
                      type: 'string',
                      description: 'Talla del producto',
                      enum: ["XS", "S", "M", "L", "XL"],
                      example: 'M',
                    },
                    precio: {
                      type: 'number',
                      description: 'Precio del producto',
                      example: 19.99,
                    },
                    imagen: {
                      type: 'string',
                      format: 'binary',
                      description: 'Imagen del producto',
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Producto creado exitosamente',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
            500: {
              description: 'Error al crear el producto',
            },
          },
        },
      },
      '/api/products/{id}': {
        get: {
          tags: ['Products'],
          summary: 'Obtener un producto por ID',
          description: 'Devuelve los detalles del producto especificado por su ID.',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID del producto',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'Producto obtenido exitosamente',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
            404: {
              description: 'Producto no encontrado',
            },
            500: {
              description: 'Error al obtener el producto',
            },
          },
        },
        put: {
          tags: ['Products'],
          summary: 'Actualizar un producto por ID',
          description: 'Actualiza los detalles de un producto específico por su ID.',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID del producto',
              schema: {
                type: 'string',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    nombre: {
                      type: 'string',
                      description: 'Nombre del producto',
                    },
                    descripcion: {
                      type: 'string',
                      description: 'Descripción del producto',
                    },
                    categoria: {
                      type: 'string',
                      description: 'Categoría del producto',
                      enum: ["Camisetas", "Pantalones", "Zapatos", "Accesorios"],
                    },
                    talla: {
                      type: 'string',
                      description: 'Talla del producto',
                      enum: ["XS", "S", "M", "L", "XL"],
                    },
                    precio: {
                      type: 'number',
                      description: 'Precio del producto',
                    },
                    imagen: {
                      type: 'string',
                      format: 'binary',
                      description: 'Imagen del producto',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Producto actualizado exitosamente',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
            404: {
              description: 'Producto no encontrado',
            },
            500: {
              description: 'Error al actualizar el producto',
            },
          },
        },
        delete: {
          tags: ['Products'],
          summary: 'Eliminar un producto por ID',
          description: 'Elimina un producto especificado por su ID.',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID del producto',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'Producto eliminado exitosamente',
            },
            404: {
              description: 'Producto no encontrado',
            },
            500: {
              description: 'Error al eliminar el producto',
            },
          },
        },
      },
    },
  };
  