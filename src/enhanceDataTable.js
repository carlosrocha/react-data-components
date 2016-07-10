import React, {Component} from 'react';
import dataReducer from './dataReducer';
import {
  dataLoaded, dataSort, dataFilter,
  pageNumberChange, pageSizeChange,
} from './actions';
import type {State} from './types';
import {containsIgnoreCase} from './utils';

type Props = {
  pageLengthOptions: Array<number>;
  initialData: Array<any>;
  columns: Array<any>;
  keys: Array<any>;
  buildRowOptions: any;
  filters: any;
};

export default function enhanceDataTable(ComposedComponent) {
  return class DataTableEnhancer extends Component {
    state: State;
    props: Props;

    static defaultProps = {
      filters: {
        globalSearch: { filter: containsIgnoreCase },
      },
    };

    constructor(props: Props) {
      super(props);
      this.state = dataReducer(undefined, dataLoaded(props.initialData));
    }

    onPageNumberChange = value => {
      this.setState(state => dataReducer(state, pageNumberChange(value)));
    };

    onPageSizeChange = ({target: {value}}) => {
      this.setState(state => dataReducer(state, pageSizeChange(value)));
    };

    onSort = value => {
      this.setState(state => dataReducer(state, dataSort(value)));
    };

    onFilter = (key, {target: {value}}) => {
      this.setState(
        state => dataReducer(state, dataFilter(key, value, this.props.filters))
      );
    };

    render() {
      return (
        <ComposedComponent
          onPageNumberChange={this.onPageNumberChange}
          onPageSizeChange={this.onPageSizeChange}
          onSort={this.onSort}
          onFilter={this.onFilter}
          data={this.state}
          {...this.props}
        />
      );
    }
  };
}
