jest.dontMock('../Pagination');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Pagination = require('../Pagination');

var onChangePage;
var currentPage;
var totalPages;
var instance;

describe('Pagination', function() {

  beforeEach(function() {
    onChangePage = jest.genMockFunction();
  });

  it.only('renders the correct buttons', function() {
    var showPages = 10;
    currentPage = 5;
    totalPages = 10;

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

  it('changes to first page', function() {
    currentPage = 5;
    totalPages = 10;
    instance = TestUtils.renderIntoDocument(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    );

    var firstBtn = React.findDOMNode(instance).firstChild.firstChild;
    TestUtils.Simulate.click(firstBtn);
    expect(onChangePage).toBeCalledWith(0);
  });

  it('disables prev and first button when on first page', function() {
    currentPage = 0;
    totalPages = 10;
    instance = TestUtils.renderIntoDocument(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    );
    var buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'a');

    TestUtils.Simulate.click(buttons[0]);
    TestUtils.Simulate.click(buttons[1]);
    expect(onChangePage).not.toBeCalled();
  });

  it('disables next and last button when on last page', function() {
    currentPage = 9;
    totalPages = 10;
    instance = TestUtils.renderIntoDocument(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    );
    var buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'a');

    TestUtils.Simulate.click(buttons[buttons.length - 2]);
    TestUtils.Simulate.click(buttons[buttons.length - 1]);
    expect(onChangePage).not.toBeCalled();
  });

  it('changes to previous page', function() {
    currentPage = 5;
    totalPages = 10;
    instance = TestUtils.renderIntoDocument(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    );
    var buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'a');

    var prevBtn = buttons[1];
    TestUtils.Simulate.click(prevBtn);
    expect(onChangePage).toBeCalledWith(currentPage - 1);
  });

  it('changes to next page', function() {
    currentPage = 5;
    totalPages = 10;
    instance = TestUtils.renderIntoDocument(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    );
    var buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'a');

    var nextBtn = buttons[buttons.length - 2];
    TestUtils.Simulate.click(nextBtn);
    expect(onChangePage).toBeCalledWith(currentPage + 1);
  });

  it('changes to last page', function() {
    currentPage = 5;
    totalPages = 10;
    instance = TestUtils.renderIntoDocument(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    );

    var lastBtn = React.findDOMNode(instance).lastChild.firstChild;
    TestUtils.Simulate.click(lastBtn);
    expect(onChangePage).toBeCalledWith(totalPages - 1);
  });

});
