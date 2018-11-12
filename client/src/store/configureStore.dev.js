import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';


const configureStore = (preloadedState) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(applyMiddleware(logger,thunk,promise())));

        if (process.env.NODE_ENV !== "production") {
            if (module.hot) {
                module.hot.accept('../reducers', () => {
                    store.replaceReducer(rootReducer)
                })


            }
        }
    return store;
}

export default configureStore;