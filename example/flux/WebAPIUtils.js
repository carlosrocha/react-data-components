import { csv } from 'd3-request';
import { receiveData } from './ServerActionCreators';

export function getCsvFile(csvFile) {
  csv(csvFile, (err, data) => receiveData(data));
}
