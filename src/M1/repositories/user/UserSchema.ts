import * as mongoose from 'mongoose';
import VersionSchema from './../versionable/ VersionableSchema';
import { stringify } from 'querystring';
export default class UserSchema extends VersionSchema {
    constructor(options) {
        const userSchema = {
            id: String,
            obj: mongoose.Schema.Types.Mixed,
            keyCount: Number,
            depth: Number,
            originalId: String,
            size: String,
            generationTime: String,
        };
        super(userSchema, options);

    }
}


