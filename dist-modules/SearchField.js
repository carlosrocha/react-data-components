var React = require('react');

var SearchField = React.createClass({displayName: "SearchField",

  onChange:function(e) {
    this.props.onChange(e.target.value);
  },

  render:function() {
    return (
      React.createElement("div", null, 
        React.createElement("label", {htmlFor: this.props.id}, this.props.label), 
        React.createElement("input", {
          id: this.props.id, 
          type: "search", 
          value: this.props.value, 
          onChange: this.onChange}
        )
      )
    );
  }

});

module.exports = SearchField;
