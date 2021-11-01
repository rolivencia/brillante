export default {
    name: 'highlightedProduct',
    title: 'Productos Destacados',
    type: 'document',
    fields: [
        {
            name: 'product',
            to: [{ type: 'product' }],
            type: 'reference',
            description: 'Producto para destacar',
        },
    ],

    preview: {
        select: {
            title: 'product.title',
            subtitle: 'product.manufacturer.title',
            media: 'product.logo',
        },
    },
};
