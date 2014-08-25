/**
 * @jsx React.DOM
 */

var React = require('react');

var SelectField = React.createClass({
  render: function() {
    var options = this.props.options.map(function(each) {
      return <option key={each} value={each}>{each}</option>;
    });

    var id = this.props.id;
    return (
      <div>
        <label htmlFor={id}>{this.props.label}</label>
        <select id={id} value={this.props.value} onChange={this.props.onChange}>
          {options}
        </select>
      </div>
    );
  }
});

module.exports = SelectField;
