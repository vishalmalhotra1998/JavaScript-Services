import * as mongoose from 'mongoose';
import VersionSchema from './../versionable/ VersionableSchema';
import { stringify } from 'querystring';
export default class UserSchema extends VersionSchema {
    constructor(options) {
        const userSchema = {
            id: String,
            objectId: String,
            sortDuration: String,
            sortingAlgorithm: String,
        };
        super(userSchema, options);

    }
}


