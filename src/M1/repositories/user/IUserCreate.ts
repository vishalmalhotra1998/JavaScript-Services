import * as mongoose from 'mongoose';
export default interface IUserCreate {
    obj: mongoose.Schema.Types.Mixed;
    keyCount: number;
    depth: number;
    originalId: string;
    size: string;
    generationTime: string;
}