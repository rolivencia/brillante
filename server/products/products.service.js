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
    getFeatured,
};

async function getFeatured() {
    const query = `*[_type == 'featuredProduct']{_id, product->}`;
    const featuredProducts = await sanityConnector.client.fetch(query, {});
    const mappedProducts = featuredProducts.map((featuredProduct) => ({
        id: featuredProduct.product._id,
        name: featuredProduct.product.title,
        price: featuredProduct.product.retailPrice,
        imageUrls: featuredProduct.product.images.map((image) => urlFor(image).url()),
        categories: [],
        manufacturer: featuredProduct.product.manufacturer,
    }));
    return mappedProducts;
}
async function get({ offset, manufacturer, category }) {
    //TODO: Add offset-based selection for query
    const queryOffset = `[${12 * (offset - 1)}...${12 + (offset - 1) * 12}]`;
    let queryManufacturer = '';
    let queryCategory = '';

    if (manufacturer !== 'all') {
        queryManufacturer = ` && references('${manufacturer}')`;
    }
    if (category !== 'all') {
        queryCategory = ` && references('${category}')`;
    }

    const query = `*[_type == 'product'${queryManufacturer}${queryCategory}]${queryOffset}{_id, title, retailPrice, images, manufacturer->}`;
    const countQuery = `count(*[_type == 'product'${queryManufacturer}${queryCategory}])`;
    const count = await sanityConnector.client.fetch(countQuery, {});
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
    return { products: mappedProducts, count: count };
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
