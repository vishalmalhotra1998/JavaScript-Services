import { userModel } from './UserModel';
import * as mongoose from 'mongoose';
import { IUserModel } from './IUserModel';
import VersionRepository from '../versionable/VersionRepository';

class UserRepository extends VersionRepository<IUserModel, mongoose.Model<IUserModel>> {

  private userModel: mongoose.Model<IUserModel>;
  constructor() {
    super(userModel);
  }
  static generateObjectId() {
    return String(mongoose.Types.ObjectId());
  }
  create = (data: any, authId: any = {}): Promise<IUserModel> => {
    return super.create(data , authId);
  }

  count = () => {
    return super.count();
  }

  list = (query: any = {}, options: any = {}) => {
    return super.list(query, options);
  }

  delete = (data: any) => {
    return super.delete(data);
  }

  update = (data: object, dataToUpdate: object) => {
    return super.update(data, dataToUpdate);
  }

  get = (query: object) => {
    return super.get(query);
  }
}

export default UserRepository;
