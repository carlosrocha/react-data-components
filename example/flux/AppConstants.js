var keyMirror = require('react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    DATA_SORT: null,
    DATA_CHANGE_PAGE_NUMBER: null,
    DATA_RECEIVE: null,
    DATA_FILTER: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
