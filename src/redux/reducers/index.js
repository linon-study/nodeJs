import { combineReducers } from 'redux';

//首页
import homeReducer from './home';

const rootReducer = combineReducers({
  home: homeReducer,
});

export default rootReducer;