import IVersionModel from './../versionable/IVersionableDocument';
import * as mongoose from 'mongoose';
export interface IUserModel extends IVersionModel {
    id: string;
    obj: mongoose.Schema.Types.Mixed;
    keyCount: number;
    depth: number;
    originalId: string;
    size: string;
    generationTime: string;
}