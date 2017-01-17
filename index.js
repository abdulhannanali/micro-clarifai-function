/**
 * micro-clarifai-function
 * 
 * Function in order to provide tags related to an image
 */

const queryParse = require('./queryParse')
const Clarifai = require('clarifai')

const { createError, send } = require('micro')

const NODE_ENV = process.env.NODE_ENV || 'development'

if (NODE_ENV === 'development') {
    require('dotenv').config()
}

const { CLARIFAI_CLIENT_ID, CLARIFAI_CLIENT_SECRET } = process.env

const app = new Clarifai.App(
    CLARIFAI_CLIENT_ID,
    CLARIFAI_CLIENT_SECRET
)


module.exports = function (req, res) {
    const { url } = queryParse(req.url)  

    if (url) {
        return app.models.predict(Clarifai.GENERAL_MODEL, url)
    } else {
        send(res, 200, 'No URL provided to analyze')
    }
    
}
