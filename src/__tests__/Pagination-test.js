jest.dontMock('../Pagination');

describe('Pagination', function() {

  it('changes to first page', function() {
    var React = require('react/addons');
    var Pagination = require('../Pagination');
    var TestUtils = React.addons.TestUtils;

    var onChangePage = jest.genMockFunction();
    var pagination = TestUtils.renderIntoDocument(
      <Pagination
        totalPages={100}
        currentPage={50}
        onChangePage={onChangePage}
      />
    );

    var buttons = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'a');

    var firstBtn = buttons[0];
    TestUtils.Simulate.click(firstBtn);
    expect(onChangePage.mock.calls[0][0]).toEqual(0);
  });

  it('changes to last page', function() {
    var React = require('react/addons');
    var Pagination = require('../Pagination');
    var TestUtils = React.addons.TestUtils;

    var onChangePage = jest.genMockFunction();
    var pagination = TestUtils.renderIntoDocument(
      <Pagination
        totalPages={100}
        currentPage={50}
        onChangePage={onChangePage}
      />
    );

    var buttons = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'a');

    var lastBtn = buttons[buttons.length - 1];
    TestUtils.Simulate.click(lastBtn);
    expect(onChangePage.mock.calls[0][0]).toEqual(99);
  });

});
