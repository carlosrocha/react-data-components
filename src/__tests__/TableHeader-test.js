jest.dontMock('../TableHeader');

describe('TableHeader', function() {

  it('sorts on col with prop', function() {
    var React = require('react/addons');
    var TableHeader = require('../TableHeader');
    var TestUtils = React.addons.TestUtils;

    var columns = [
      { title: 'Test', prop: 'test' }
    ];
    var onSort = jest.genMockFunction();

    var tableHeader = TestUtils.renderIntoDocument(
      <TableHeader
        columns={columns}
        onSort={onSort}
      />
    );

    var ths = TestUtils.scryRenderedDOMComponentsWithTag(tableHeader, 'th');
    TestUtils.Simulate.click(ths[0]);
    expect(onSort.mock.calls[0][0]).toBe('test');
  });

  it('does not sort on col without data', function() {
    var React = require('react/addons');
    var TableHeader = require('../TableHeader');
    var TestUtils = React.addons.TestUtils;

    var columns = [
      { title: 'Test' }
    ];
    var onSort = jest.genMockFunction();

    var tableHeader = TestUtils.renderIntoDocument(
      <TableHeader
        columns={columns}
        onSort={onSort}
      />
    );

    var ths = TestUtils.scryRenderedDOMComponentsWithTag(tableHeader, 'th');
    TestUtils.Simulate.click(ths[0]);
    expect(onSort.mock.calls.length).toBe(0);
  });

});
