import React from 'react';
import shallow from 'react-test-renderer/shallow';
import Pagination from '../Pagination';

describe('Pagination', () => {
  let onChangePage;

  beforeEach(() => {
    onChangePage = jest.genMockFunction();
  });

  it('renders the correct buttons', () => {
    const showPages = 10;
    const currentPage = 5;
    const totalPages = 10;

    const shallowRenderer = shallow.createRenderer();
    shallowRenderer.render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
        showPages={showPages}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    // 4 buttons for first, prev, next and last
    expect(result.props.children.length).toBe(showPages + 4);
  });

  it('disables prev and first button when on first page', () => {
    const currentPage = 0;
    const totalPages = 10;

    const shallowRenderer = shallow.createRenderer();
    shallowRenderer.render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    expect(result.props.children[0].props.className).toEqual('disabled');
    expect(result.props.children[1].props.className).toEqual('disabled');
    expect(onChangePage).not.toBeCalled();
  });

  it('disables next and last button when on last page', () => {
    const currentPage = 9;
    const totalPages = 10;

    const shallowRenderer = shallow.createRenderer();
    shallowRenderer.render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />,
    );

    const { children } = shallowRenderer.getRenderOutput().props;
    const totalChildren = children.length;

    expect(children[totalChildren - 2].props.className).toEqual('disabled');
    expect(children[totalChildren - 1].props.className).toEqual('disabled');
    expect(onChangePage).not.toBeCalled();
  });
});
