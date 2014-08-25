/**
 * @jsx React.DOM
 */

var React = require('react');

var ListButton = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <li>
        <a href="#" onClick={this.props.event}>{this.props.children}</a>
      </li>
    );
  }
});

module.exports = ListButton;
