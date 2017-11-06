import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import rootSaga from './saga';

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    let store;
    if (initialState) {
      store = createStore(
          reducers,
          initialState,
          composeWithDevTools(
              applyMiddleware(sagaMiddleware),
          ),
      );
    } else {
      store = createStore(
          reducers,
          composeWithDevTools(
              applyMiddleware(sagaMiddleware),
          ),
      );
    }
    sagaMiddleware.run(rootSaga);
    return store;
}
