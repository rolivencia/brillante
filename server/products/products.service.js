const _ = require('lodash/array');
const sanityConnector = require('../_helpers/sanity-connector');
const imageUrlBuilder = require('@sanity/image-url');

const builder = imageUrlBuilder(sanityConnector.client);

function urlFor(source) {
    return builder.image(source);
}

module.exports = {
    get,
    getById,
    getCategories,
    getManufacturers,
};

async function get({ offset, category, manufacturer } = {}) {
    const query = "*[_type == 'product']{_id, title, retailPrice, images, manufacturer->}";
    const products = await sanityConnector.client.fetch(query, {});
    // return products;
    const mappedProducts = products.map((product) => ({
        id: product._id,
        name: product.title,
        price: product.retailPrice,
        imageUrls: product.images.map((image) => urlFor(image).url()),
        categories: [],
        manufacturer: product.manufacturer,
    }));
    // console.log(mappedProducts);
    return mappedProducts;
}

async function getManufacturers(id = null) {
    const query = "*[_type == 'manufacturer'] | order(title)";
    const manufacturers = await sanityConnector.client.fetch(query, {});
    // console.log(manufacturers);
    return manufacturers.map((manufacturer) => ({
        id: manufacturer._id,
        title: manufacturer.title,
        logo: manufacturer.logo,
    }));
}

async function getById(id) {
    const query = `*[_type == 'product' && _id == '${id}']{_id, title, retailPrice, body, images, manufacturer->}`;
    const product = await sanityConnector.client.fetch(query, {});
    const mappedProduct =
        product.length === 0
            ? null
            : product
                  .map((product) => ({
                      id: product._id,
                      name: product.title,
                      price: product.retailPrice,
                      imageUrls: product.images.map((image) => urlFor(image).url()),
                      categories: [],
                      description: product.body,
                      manufacturer: {
                          id: product.manufacturer._id,
                          title: product.manufacturer.title,
                          logo: urlFor(product.manufacturer.logo).url(),
                      },
                  }))
                  .pop();
    return mappedProduct;
}

async function getCategories(id = null) {
    const query = "*[_type == 'category']{_id, title, parents} | order(title)";
    const categories = await sanityConnector.client.fetch(query, {});
    return categories.map((category) => ({ id: category._id, title: category.title, parents: category.parents }));
}
