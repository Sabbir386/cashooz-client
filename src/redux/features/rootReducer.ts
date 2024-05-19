 rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import giftReducer from '../../pages/shopManagement/giftSlice'
import { baseApi } from '../api/baseApi';


const rootReducer = combineReducers({
  auth: authReducer, 
  gifts: giftReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
