var {Dispatcher} = require('flux');
var {PayloadSources} = require('./AppConstants');

class AppDispatcher extends Dispatcher {

  handleServerAction(action) {
    this.dispatch({
      source: PayloadSources.SERVER_ACTION,
      action: action
    });
  }

  handleViewAction(action) {
    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action: action
    });
  }

}

module.exports = new AppDispatcher();
