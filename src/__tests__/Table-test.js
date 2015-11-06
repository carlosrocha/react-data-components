jest.dontMock('../Table');

describe('Table', function() {

  var React;
  var TestUtils;
  var Table;

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react-addons-test-utils');
    Table = require('../Table');
  });

  it('shows message when no data', function() {
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

  it('render simple', function() {
    var columns = [ { title: 'Test', prop: 'test' } ];
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <Table
        columns={columns}
        dataArray={[
          { test: 'Foo' },
        ]}
        keys="test"
      />
    );

    var result = shallowRenderer.getRenderOutput();

    expect(result.props.children[2]).toEqual(
      <tbody>
        {[
          <tr key={'Foo'} className={undefined}>{[
            <td key={0} className={undefined}>{'Foo'}</td>,
          ]}</tr>,
        ]}
      </tbody>
    );
  });

});
