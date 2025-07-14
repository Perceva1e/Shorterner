import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';

const store = configureStore({
  reducer: rootReducer,
  devTools: composeWithDevTools({
  })
});

export default store;