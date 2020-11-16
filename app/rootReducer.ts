import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { reducer as fromReducer } from 'redux-form';
// eslint-disable-next-line import/no-cycle
import counterReducer from './features/counter/counterSlice';
import formReducer from './features/formTypes/formTypesSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    form: fromReducer,
    counter: counterReducer,
    formTypes: formReducer,
  });
}
