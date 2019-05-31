import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { Route, Redirect } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'

import AppBar from '../components/AppBar'

const GET_TOKEN = gql`
  {
    token @client
  }
`

const getToken = graphql(GET_TOKEN, {
  props: ({ data }) => ({
    data: { token: data.token || localStorage.getItem('token') }
  })
})

class PrivateRoute extends PureComponent {
  render() {
    const {
      data: { token },
      component: Component,
      ...rest
    } = this.props

    return (
      <Route
        {...rest}
        component={props => (
          token ? (
            <>
              <CssBaseline />
              <AppBar {...props} >
                <Component {...props} />
              </AppBar>
              { /* <Snackbar /> */ }
            </>
          ) : (
            <Redirect to='/'/>
          )
        )}
      />
    )
  }
}

PrivateRoute.propTypes = {
  data: PropTypes.object,
  component: PropTypes.object
}

export default compose(getToken)(PrivateRoute)
