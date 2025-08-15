module.exports = {
    get,
    getById,
    getCategories,
    getManufacturers,
    getFeatured,
};

async function getFeatured() {
    return [];
}
async function get({ offset, manufacturer, category, searchText }) {
    return { products: [], count: 0 };
}

async function getManufacturers(id = null) {
    return [];
}

async function getById(id) {
    return null;
}

async function getCategories(id = null) {
    return [];
}
