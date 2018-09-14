const express = require('express')
const router = express.Router()
const fs = require('fs')
const routesPath = `${__dirname}/`

/*
 * Load routes statically and/or dynamically
 */

// Load Auth route
router.use('/', require('./auth'))

// Loop routes path and loads every file as a route except this file and Auth route
fs.readdirSync(routesPath).filter(file => {
  // Take filename and remove last part (extension)
  const routeFile = file.split('.').slice(0, -1).join('.').toString()
  // Prevents loading of this file and auth file
  return (routeFile !== 'index' && routeFile !== 'auth') ? router.use(`/${routeFile}`, require(`./${routeFile}`)) : ''
})

/*
 * Setup routes for index
 */
router.get('/', (req, res) => {
  res.send('API Home')
})

/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'NOT_FOUND'
    }
  })
})

module.exports = router