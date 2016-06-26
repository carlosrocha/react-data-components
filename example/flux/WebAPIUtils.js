import d3 from 'd3';
import { receiveData } from './ServerActionCreators';

export function getCsvFile(csvFile) {
  d3.csv(csvFile, (err, data) => receiveData(data));
}
