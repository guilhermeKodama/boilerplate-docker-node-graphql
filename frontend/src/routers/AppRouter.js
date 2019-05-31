import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
// import { compose } from 'react-apollo'

import NotFoundView from '../views/NotFound'
import DashboardView from '../views/DashBoard'
import UsersView from '../views/Users'
import SigninView from '../views/SignIn'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

export const history = createBrowserHistory()

// const theme = createMuiTheme({
//   typography: {
//     useNextVariants: true,
//     // Tell Material-UI what's the font-size on the html element is.
//     htmlFontSize: 10,
//     fontSize: 12
//   },
//   palette: {
//     primary: {
//       light: '#fff',
//       main: '#fff',
//       dark: '#cccccc',
//       contrastText: '#000'
//     },
//     secondary: {
//       light: '#ff616f',
//       main: '#ff1744',
//       dark: '#c4001d',
//       contrastText: '#fff'
//     }
//   },
//   overrides: {
//     MuiButton: {
//       root: {
//         color: '#1a73e8',
//         backgroundColor: 'white',
//         '&:hover': {
//           backgroundColor: 'rgba(25, 118, 210, .05)'
//         }
//       }
//     }
//   }
// })

const AppRouter = () => (
  // <MuiThemeProvider theme={theme}>
  <Router history={history}>
    <>
      <Switch>
        <PublicRoute exact path='/' component={SigninView}/>
        <PrivateRoute path='/dashboard' component={DashboardView}/>
        <PrivateRoute path='/users' component={UsersView}/>
        <Route component={NotFoundView}/>
      </Switch>
    </>
  </Router>
  // </MuiThemeProvider>
)

AppRouter.propTypes = {
  data: PropTypes.object
}

export default AppRouter
