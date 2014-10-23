/** @jsx React.DOM */
var React = require('react');

var List = React.createClass({

  render() {
    var {columns, keys, dataArray, onRowClicked, selected} = this.props;

    var rows = dataArray.map(
      (each) =>
        <li className="datalist-item">
          {columns.map(
            (col) =>
              <div className="datalist-cell">
                {col.render(each[col.prop])}
              </div>
          )}
        </li>
    );

    return (
      <ul className="datalist">
        {rows}
      </ul>
    );
  }

});

module.exports = List;
