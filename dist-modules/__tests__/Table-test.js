jest.dontMock('../Table');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var Table = require('../Table');

describe('Table', function() {

  it('sorts on col with prop', function() {
    var onSort = jest.genMockFunction();
    var columns = [ { title: 'Test', prop: 'test' } ];
    var table = TestUtils.renderIntoDocument(
      React.createElement(Table, {
        columns: columns, 
        onSort: onSort, 
        sortBy: { order: 'asc', prop: 'test'}, 
        dataArray: [], 
        keys: "test"}
      )
    );

    var ths = TestUtils.scryRenderedDOMComponentsWithTag(table, 'th');
    TestUtils.Simulate.click(ths[0]);
    expect(onSort.mock.calls[0][0]).toEqual({ order: 'desc', prop: 'test' });
  });

  it('does not sort on col without data', function() {
    var onSort = jest.genMockFunction();
    var columns = [ { title: 'Test' } ];
    var table = TestUtils.renderIntoDocument(
      React.createElement(Table, {
        columns: columns, 
        onSort: onSort, 
        dataArray: [], 
        keys: "test"}
      )
    );

    var ths = TestUtils.scryRenderedDOMComponentsWithTag(table, 'th');
    TestUtils.Simulate.click(ths[0]);
    expect(onSort).not.toBeCalled();
  });

});
