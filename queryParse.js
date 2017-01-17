const urlParse = require('url').parse
const queryParse = require('querystring').parse

module.exports = function (url) {
    return queryParse(urlParse(url).query)
}