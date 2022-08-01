import React from 'react';

export default {
    name: 'colors',
    title: 'Colores',
    type: 'document',
    preview: {
        select: {
            name: 'name',
            code: 'code',
        },
        prepare(selection) {
            const { name, code } = selection;

            return {
                title: name,
                subtitle: code.hex,
                media: (
                    <span style={{ color: code.hex, backgroundColor: code.hex, height: '32px', width: '32px' }}>
                        {}
                    </span>
                ),
            };
        },
    },
    fields: [
        { name: 'name', title: 'Nombre del color', type: 'string' },
        {
            name: 'code',
            title: 'Seleccionador de color',
            type: 'color',
            options: {
                disableAlpha: true,
            },
        },
    ],
};
