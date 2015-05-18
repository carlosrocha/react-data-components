var Dispatcher = require('./Dispatcher');
var {ActionTypes} = require('./AppConstants');

module.exports = {

  receiveData(data) {
    Dispatcher.dispatch({
      type: ActionTypes.DATA_RECEIVE,
      data: data
    });
  }

};
