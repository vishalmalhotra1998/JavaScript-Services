import * as mongoose from 'mongoose';

export const validation = {
    create:
    {
        keyCount: {
            required: true,
            number: true,
            in: ['body'],
            errorMessage: 'keyCount is required',
        },
        depth: {
            required: true,
            number: true,
            in: ['body'],
            errorMessage: 'depth is required'

        },

    },
    delete: {
        id: {
            required: true,
            errorMessage: 'Id is required',
            in: ['params'],
            custom: (id) => {
                const _id = id;
                const check = mongoose.isValidObjectId(id);
                if (!check) {
                    throw { error: 'Not a MongoDB ID' };
                }
            }
        }
    },
    get: {
        skip: {
            required: false,
            default: 0,
            number: true,
            in: ['query'],
            errorMessage: 'Skip is invalid',
        },
        limit: {
            required: false,
            default: 10,
            number: true,
            in: ['query'],
            errorMessage: 'Limit is invalid',
        }
    },
    update: {
        id: {
            required: true,
            string: true,
            in: ['body'],
            custom: (id) => {
                const _id = id;
                const check = mongoose.isValidObjectId(_id);
                if (!check) {
                    throw { error: 'Not a MongoDB ID' };
                }
            }
        }
        ,
    }


};
export default validation;