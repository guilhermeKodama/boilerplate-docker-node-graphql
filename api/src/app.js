import fs from 'fs'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import models from './models'
import express from 'express'
import bodyParser from 'body-parser'
import resolvers from './graphql/resolvers.js'
import { ApolloServer } from 'apollo-server-express'

import { apiErrorHandler } from './utils/errors'

// Routes
import healthz from './routes/healthz'
import robots from './routes/robots'
import index from './routes/index'

// schema
const typeDefs = fs.readFileSync(path.join(__dirname, '/graphql/schemas.graphql'), 'utf8')

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || req.query.token || ''
    // try to retrieve a user with the token
    let user = null
    try {
      user = await models.user.findByToken(token)
    } catch (e) {
      console.log('error:', e)
    }
    // add the user to the context
    return { user }
  }
})

const app = express()

// Security HTTP headers
// See https://helmetjs.github.io/docs/
app.use(helmet())

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
healthz(app)
robots(app)
index(app)

// API routes
const api = express.Router()
apolloServer.applyMiddleware({ app: api })

api.use(apiErrorHandler)
app.use('/api', api)

export default app
