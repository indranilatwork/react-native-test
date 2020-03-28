import * as types from './types';
import { dummyGetApi } from '../api-services';
import { GenerateSaga } from '../services/sagaGenerator.service';


export const dummyAction = (data, callback) => {
  GenerateSaga(types.DUMMY_ACTION, dummyGetApi);
  return {
    type: types.DUMMY_ACTION,
    data,
    callback
  }
};