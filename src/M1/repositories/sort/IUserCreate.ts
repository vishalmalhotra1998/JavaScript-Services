import * as mongoose from 'mongoose';
export default interface IUserCreate {
      id: string;
      objectId: string;
      sortDuration: string;
      sortingAlgorithm: string;
}