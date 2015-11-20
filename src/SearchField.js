import React, { Component } from 'react';

class SearchField extends Component {

  constructor(...props) {
    super(...props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

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

}

module.exports = SearchField;
