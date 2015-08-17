jest.dontMock('../Table');

var React;
var TestUtils;
var Table;

describe('Table', function() {

  beforeEach(function() {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    Table = require('../Table');
  });

  it.only('shows message when no data', function() {
    var columns = [ { title: 'Test', prop: 'test' } ];
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <Table
        columns={columns}
        dataArray={[]}
        keys="test"
      />
    );

    var result = shallowRenderer.getRenderOutput();

    expect(result.props.children[2]).toEqual(
      <tbody>
        <tr>
          <td colSpan={1} className="text-center">No data</td>
        </tr>
      </tbody>
    );
  });

  it('sorts on col with prop', function() {
    var onSort = jest.genMockFunction();
    var columns = [ { title: 'Test', prop: 'test' } ];
    var table = TestUtils.renderIntoDocument(
      <Table
        columns={columns}
        onSort={onSort}
        sortBy={{ order: 'ascending', prop: 'test' }}
        dataArray={[]}
        keys="test"
      />
    );

    var ths = TestUtils.scryRenderedDOMComponentsWithTag(table, 'th');
    TestUtils.Simulate.click(ths[0]);
    expect(onSort.mock.calls[0][0]).toEqual({
      order: 'descending',
      prop: 'test',
    });
  });

  it('does not sort on col without data', function() {
    var onSort = jest.genMockFunction();
    var columns = [ { title: 'Test' } ];
    var table = TestUtils.renderIntoDocument(
      <Table
        columns={columns}
        onSort={onSort}
        dataArray={[]}
        keys="test"
      />
    );

    var ths = TestUtils.scryRenderedDOMComponentsWithTag(table, 'th');
    TestUtils.Simulate.click(ths[0]);
    expect(onSort).not.toBeCalled();
  });

});
