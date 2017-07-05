import { DOMAIN } from './actions';
import { Domain } from './types';

export const selectDataTable = (state, domain: Domain = DOMAIN) =>
  state[domain];
