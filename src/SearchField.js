'use strict';

var React = require('react');

var SearchField = React.createClass({

  onChange(e) {
    this.props.onChange(e.target.value);
  },

  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          id={this.props.id}
          type="search"
          value={this.props.value}
          onChange={this.onChange}
        />
      </div>
    );
  }

});

module.exports = SearchField;
