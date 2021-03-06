/**
 * Contents DB operations for shortening URL.
 */

// Include mongoose.
const mongoose = require('mongoose')

// Connect to DB
mongoose.connect('mongodb://localhost/url-shorten-rest', {
  useMongoClient: true
})

// Import the URL shorten controller.
var shortenController = require('../controllers/urlShortenController')

// Create the schema.
var urlSchema = new mongoose.Schema({
  url: String,
  hash: String,
  createdAt: Date
})

// Create the model.
var Url = mongoose.model('Url', urlSchema)

/**
 * Inserts the url into db and returns the ID of that URL.
 */
exports.insertUrl = function (originalUrl) {
  // Asign values to the single url instance.
  var shortUrl = new Url({
    url: originalUrl,
    createdAt: new Date()
  })

  // Save the record in database.
  shortUrl.save(function (err, url) {
    if (err) {
      return err
    } else {
      // Hash the URL id.
      shortenController.hashUrlId(url._id)
    }
  })
}