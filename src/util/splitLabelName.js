module.exports = function(name) {
    return name.split(':').join(',').split('/').join(',').split('\\').join(',').split(',')
}