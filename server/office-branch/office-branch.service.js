const officeBranch = require('server/office-branch/office-branch.model');

module.exports = {
    get,
};

function get() {
    return officeBranch.OfficeBranch.findAll();
}
