import { receiveData } from './ServerActionCreators';

export function getData(csvFile) {
  fetch(csvFile)
    .then(res => res.json())
    .then(data => receiveData(data));
}
