const { OfficeBranch } = require('server/office-branch/office-branch.model');

module.exports = {
    get,
    create,
};

function get() {
    return OfficeBranch.findAll();
}

function create(branch) {
    return OfficeBranch.create({
        name: branch.name,
        codeName: branch.name.toLowerCase().split(' ').join('_'),
        address: branch.address,
    });
}
