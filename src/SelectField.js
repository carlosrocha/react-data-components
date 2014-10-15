var React = require('react');

var SelectField = React.createClass({

  render() {
    var {id, options, label, value, onChange} = this.props;
    var mappedOpts =
      options.map((each) => <option key={each} value={each}>{each}</option>);

    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <select id={id} value={value} onChange={onChange}>
          {mappedOpts}
        </select>
      </div>
    );
  }

});

module.exports = SelectField;
