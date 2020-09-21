const config = require('../config')

module.exports = function(context) {
    if (context.payload.repository.owner.login === config.myGitHub) {
        return true
    }
    return false
}