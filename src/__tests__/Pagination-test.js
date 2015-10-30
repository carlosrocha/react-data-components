jest.dontMock('../Pagination');

describe('Pagination', function() {

  var onChangePage;
  var React;
  var TestUtils;
  var Pagination;

  beforeEach(function() {
    React = require('react');
    TestUtils = require('react-addons-test-utils');
    Pagination = require('../Pagination');
    onChangePage = jest.genMockFunction();
  });

  it('renders the correct buttons', function() {
    var showPages = 10;
    var currentPage = 5;
    var totalPages = 10;

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
        showPages={showPages}
      />
    );

    var result = shallowRenderer.getRenderOutput();

    // 4 buttons for first, prev, next and last
    expect(result.props.children.length).toBe(showPages + 4);
  });

  it('disables prev and first button when on first page', function() {
    var currentPage = 0;
    var totalPages = 10;

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    );

    var result = shallowRenderer.getRenderOutput();
    expect(result.props.children[0].props.className).toEqual('disabled');
    expect(result.props.children[1].props.className).toEqual('disabled');
    expect(onChangePage).not.toBeCalled();
  });

  it('disables next and last button when on last page', function() {
    var currentPage = 9;
    var totalPages = 10;

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    );

    var { children } = shallowRenderer.getRenderOutput().props;
    var totalChildren = children.length;

    expect(children[totalChildren - 2].props.className).toEqual('disabled');
    expect(children[totalChildren - 1].props.className).toEqual('disabled');
    expect(onChangePage).not.toBeCalled();
  });

});
