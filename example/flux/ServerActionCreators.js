var AppDispatcher = require('./AppDispatcher');
var {ActionTypes} = require('./AppConstants');

module.exports = {

  receiveData(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.DATA_RECEIVE,
      data: data
    });
  }

};
