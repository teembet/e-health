import { createStore, combineReducers, applyMiddleware ,compose} from 'redux';
import thunk from 'redux-thunk';

import { connectRouter } from 'connected-react-router';
import { createHashHistory } from 'history';

import { settingsReducer } from './settings/reducer';
import { pageDataReducer } from './page-data/reducer';
import { patientsReducer } from './patients/reducer';
import {login} from './auth/reducers'
import {registration} from './auth/reducers'
// import {user} from './auth/reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
export const history = createHashHistory({
  hashType: 'slash'
});

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  pageData: pageDataReducer,
  settings: settingsReducer,
  patients: patientsReducer,
  login,
  // user,
  registration,
  router: connectRouter(history)
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
export type AppState = ReturnType<typeof rootReducer>;
const enhancers = compose(
  applyMiddleware(thunk), // your own middleware
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);




 export const  store=createStore(persistedReducer,
    enhancers)

export const persist= persistStore(store);


 
  
 
  

