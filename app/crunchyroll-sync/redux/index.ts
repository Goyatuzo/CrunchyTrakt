import { createStore, applyMiddleware } from 'redux';
import combinedReducers from './reducers';
import { getCrunchyrollHistory, checkLogin } from './actions';
import thunk from 'redux-thunk';

const store = createStore(combinedReducers, applyMiddleware(thunk));

store.dispatch(checkLogin() as any);
store.dispatch(getCrunchyrollHistory() as any);

export default store;