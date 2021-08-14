export default {
    name: 'manufacturer',
    title: 'Marcas',
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
            name: 'logo',
            title: 'logo',
            type: 'image',
        },
        {
            name: 'description',
            title: 'Descripción',
            description: 'Historia, detalles, comentarios sobre la marca en cuestión',
            type: 'blockContent',
        },
        {
            name: 'parents',
            title: 'Marca padre',
            description:
                'Marca con la que está relacionada la actual. Por ejemplo, cuando se tienen cargadores o accesorios que no son Apple pero están autorizados. Dejar en blanco si no tiene marca vinculada.',
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
