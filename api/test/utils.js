import app from '../src/app'
import nfetch from 'node-fetch'
import querystring from 'querystring'
import http from 'http'
import db from '../src/db'

const integrationTests = !!process.env.TEST_INTEGRATION

let server = null

export const integration = integrationTests ? global.it : global.it.skip

export const appUnit = integrationTests ? global.it.skip : global.it

export const fetch = (path, options) => {
  const port = integrationTests ? +process.env.PORT : server.address().port
  const baseURL = `http://127.0.0.1:${port}`
  const body = options && options.body
  if (Object.prototype.toString.call(body) === '[object Object]') {
    options.body = querystring.stringify(body)
    options.headers = Object.assign(options.headers || {}, {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }
  return nfetch(baseURL + path, options)
}

export const initResources = async() => {
  if (integrationTests) return
  return new Promise((resolve, reject) => {
    server = http.createServer(app)
    server.listen(0, err => (err ? reject(err) : resolve()))
  })
}

export const closeResources = () =>
  Promise.all([server && server.close(), db.close()])
