module.exports = {
    getAll,
    getById,
};

const products = [
    {
        id: 1,
        name: '3D Samsung S8',
        price: 950,
        description: '',
        imageUrls: ['assets/imagenes-s/productos/productos-imagen-226.png'],
        categories: [{ id: 1, title: 'Templados', link: 'templados' }],
        manufacturer: { id: 7, title: 'Samsung', link: 'samsung' },
    },
    {
        id: 2,
        name: '5D iPhone 7 Plus/8 Plus',
        price: 950,
        description: '',
        imageUrls: ['assets/imagenes-s/productos/productos-imagen-225.png'],
        categories: [{ id: 1, title: 'Templados', link: 'templados' }],
        manufacturer: { id: 1, title: 'Apple', link: 'apple' },
    },
    {
        id: 3,
        name: '5D iPhone 7/8',
        price: 850,
        description: '',
        imageUrls: ['assets/imagenes-s/productos/productos-imagen-224.png'],
        categories: [{ id: 1, title: 'Templados', link: 'templados' }],
        manufacturer: { id: 1, title: 'Apple', link: 'apple' },
    },
];

async function getAll() {
    return products;
}
async function getById(id) {
    return products.filter((product) => product.id === parseInt(id)).pop();
}
