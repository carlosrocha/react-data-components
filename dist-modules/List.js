var React = require('react');

var List = React.createClass({displayName: 'List',

  render:function() {
    var $__0=      this.props,columns=$__0.columns,keys=$__0.keys,dataArray=$__0.dataArray,onRowClicked=$__0.onRowClicked,selected=$__0.selected;

    var rows = dataArray.map(
      function(each) 
        {return React.createElement("li", {className: "datalist-item"}, 
          columns.map(
            function(col) 
              {return React.createElement("div", {className: "datalist-cell"}, 
                col.render(each[col.prop])
              );}
          )
        );}
    );

    return (
      React.createElement("ul", {className: "datalist"}, 
        rows
      )
    );
  }

});

module.exports = List;
