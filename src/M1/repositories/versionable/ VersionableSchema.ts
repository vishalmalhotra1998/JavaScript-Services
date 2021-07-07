import * as mongoose from 'mongoose';
import { stringify } from 'querystring';

export default class VersionSchema extends mongoose.Schema {

    constructor(schema, options) {
        const baseSchema = {
            createdAt: {
                type: Date,
                default: Date.now
            },
        };
        super({ ...schema, ...baseSchema }, options);
    }

}
