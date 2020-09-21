const config = require('../config')

module.exports = function(context) {
    if (context.payload.sender.login === config.myGitHub) {
        return true
    }
    return false
}