import React from 'react';
import shallow from 'react-test-renderer/shallow';
import Table from '../Table';

describe('Table', () => {
  it('shows message when no data', () => {
    const columns = [{ title: 'Test', prop: 'test' }];
    const shallowRenderer = shallow.createRenderer();
    shallowRenderer.render(
      <Table columns={columns} dataArray={[]} keys="test" />,
    );

    const result = shallowRenderer.getRenderOutput();

    expect(result.props.children[2]).toEqual(
      <tbody>
        <tr>
          <td colSpan={1} className="text-center">
            No data
          </td>
        </tr>
      </tbody>,
    );
  });

  it('render simple', () => {
    const columns = [{ title: 'Test', prop: 'test' }];
    const shallowRenderer = shallow.createRenderer();
    shallowRenderer.render(
      <Table columns={columns} dataArray={[{ test: 'Foo' }]} keys="test" />,
    );

    const result = shallowRenderer.getRenderOutput();

    expect(result.props.children[2]).toEqual(
      <tbody>
        {[
          <tr key={'Foo'} className={undefined}>
            {[
              <td key={0} className={undefined}>
                {'Foo'}
              </td>,
            ]}
          </tr>,
        ]}
      </tbody>,
    );
  });
});
