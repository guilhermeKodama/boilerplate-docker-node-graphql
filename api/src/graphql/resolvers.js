import models from '../models'
import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql'
import { validate, generateToken } from '../utils/security'
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server-express'

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return new Date(value) // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always in string format
      }
      return null
    }
  }),
  Query: {
    me: async(parent, args, context) => {
      if (!context.user) return new AuthenticationError('must authenticate')

      return context.user
    },
    users: async(parent, args, context) => {
      if (!context.user) return new AuthenticationError('must authenticate')
      if (context.user.role !== 'admin') return new ForbiddenError('you must be an admin')
      const users = await models.user.findAll()

      return users
    },
    user: async(parent, { id }, context) => {
      if (!context.user) return new AuthenticationError('must authenticate')
      if (context.user.role !== 'admin') return new ForbiddenError('you must be an admin')
      const user = await models.user.findOne({ where: { id } })

      if (!user) return new UserInputError('user dont exist')

      return user
    }
  },
  Mutation: {
    login: async(parent, { email, password }, context) => {
      const user = await models.user.findOne({ where: { email: email } })

      if (!user) return new UserInputError('user dont exist')

      if (!validate(password, user.password, user.salt)) return new ForbiddenError('incorrect password')

      return { id: user.id, email: user.email, token: generateToken({ id: user.id }) }
    }
  }
}
