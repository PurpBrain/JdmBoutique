const { APIblogpage, APIsearch } = require ("./BlogController"),
      { addMessage } = require('./HomeController')

module.exports = {
    // // Page Blog
    APIblogpage, APIsearch,

    // Page Home
    addMessage
}