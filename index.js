/**
 * micro-clarifai-function
 * 
 * Function in order to provide tags related to an image
 */

const queryParse = require('./queryParse')
const Clarifai = require('clarifai')
const config = require('config')

const { createError, send } = require('micro')

const NODE_ENV = process.env.NODE_ENV || 'development'

const { client_id, client_secret } = config.clarifai

const app = new Clarifai.App(
    client_id,
    client_secret
)


module.exports = function (req, res) {
    const { url } = queryParse(req.url)  

    if (url) {
        return app.models.predict(Clarifai.GENERAL_MODEL, url)
    } else {
        send(res, 200, 'No URL provided to analyze')
    }
    
}
