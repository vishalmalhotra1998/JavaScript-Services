import * as mongoose from 'mongoose';
import { IUserModel } from './IUserModel';
import UserSchema from './UserSchema';

export const userSchema = new UserSchema({
    collection: 'unSorted'
});

export const userModel: mongoose.Model<IUserModel> = mongoose.model<IUserModel>(
    'unSorted', userSchema, 'unSorted', true);
