import winston from 'winston'
import app from './app'
const port = +process.env.PORT

require('./error-tracking')

const server = app.listen(port, () => {
  winston.info('NODE_ENV: ' + process.env.NODE_ENV)
  winston.info(`Api listening on port ${server.address().port}!`)
})

export default server
