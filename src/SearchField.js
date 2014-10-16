/** @jsx React.DOM */
var React = require('react');

var SearchField = React.createClass({

  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          id={this.props.id}
          type="search"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }

});

module.exports = SearchField;
