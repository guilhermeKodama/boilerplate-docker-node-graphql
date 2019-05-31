import { createStore, compose } from 'redux'
// import createSagaMiddleware from 'redux-saga'

// import { reducer, saga}  from '../modules'

// create the saga middleware
// const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const store = createStore(composeEnhancers(applyMiddleware(sagaMiddleware)))
const store = createStore(composeEnhancers())

// then run the saga
// sagaMiddleware.run(saga)

export default store
