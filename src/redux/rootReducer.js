import { combineReducers } from 'redux';
import tableReducer from './tableReducer';

const rootReducer = combineReducers({

  tables: tableReducer,
});

export default rootReducer;
