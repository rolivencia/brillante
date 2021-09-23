export default {
    name: 'product',
    title: 'Productos',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Nombre',
            type: 'string',
            description: 'Nombre del producto',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            description: 'Código único asignado al producto. Llenar siempre luego de que un producto se da de alta.',
        },
        {
            title: 'Habilitado',
            name: 'enabled',
            type: 'boolean',
            initialValue: true,
            layout: 'checkbox',
            description: 'Determina si el producto actual se muestra o no en el sistema.',
        },
        {
            name: 'logo',
            title: 'Imagen Principal, para mostrar en grilla. Tamaño obligatorio: 800px * 800px',
            type: 'image',
        },
        {
            name: 'images',
            type: 'array',
            title: 'Galería de imágenes',
            description:
                'Imágenes del producto que se visualizarán en el sitio. Tamaño obligatorio de imágenes: 800px * 800px',
            of: [
                {
                    name: 'image',
                    type: 'image',
                    title: 'Image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                        },
                    ],
                },
            ],
            options: {
                layout: 'grid',
            },
        },
        {
            title: 'Productos relacionados',
            name: 'products',
            type: 'array',
            description:
                'Productos relacionados al actual. Pensar en combo de productos, por ejemplo. Se puede hacer uso de esta característica para vincular productos que van en combo, como un iPhone y los AirPods.',
            of: [
                {
                    title: 'Producto',
                    type: 'product',
                },
            ],
        },
        {
            name: 'manufacturer',
            title: 'Marca',
            type: 'reference',
            description:
                'Marca del producto. Si la marca del producto no existe, debe cargarse en el sistema previamente',
            to: { type: 'manufacturer' },
        },
        {
            name: 'retailPrice',
            title: 'Precio',
            type: 'number',
            description: 'Precio de lista que debe pagar el cliente para adquirir el producto.',
        },
        {
            name: 'blurb',
            title: 'Descripción breve del producto, en pocas palabras.',
            type: 'localeString',
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            description:
                'Categoría del producto. Si la categoría del producto no existe, debe cargarse en el sistema previamente',
            of: [
                {
                    type: 'reference',
                    to: { type: 'category' },
                },
            ],
        },
        {
            name: 'body',
            title: 'Descripción Completa',
            description: 'Descripción del producto en vista de detalle, en varios párrafos.',
            type: 'localeBlockContent',
        },
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'manufacturer.title',
            media: 'logo',
        },
    },
};
