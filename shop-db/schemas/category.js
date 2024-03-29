export default {
    name: 'category',
    title: 'Categorías',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Título',
            type: 'string',
            description: 'Nombre de la categoría',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            description: 'Código único asignado a la categoría',
        },
        {
            name: 'parents',
            title: 'Categoría padre',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'category' }],
                },
            ],
        },
    ],
};
