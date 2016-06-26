import Dispatcher from './Dispatcher';
import { ActionTypes } from './AppConstants';

export function receiveData(data) {
  Dispatcher.dispatch({
    type: ActionTypes.DATA_RECEIVE,
    data: data,
  });
}
