import React from 'react'
import client from './apollo'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import { ApolloProvider } from 'react-apollo'
import store from './store'

const App = (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  </ApolloProvider>
)

// <ThemeProvider theme={theme}>
//   <CssBaseline />
//   <AppRouter/>
// </ThemeProvider>

render(App, document.getElementById('root'))
