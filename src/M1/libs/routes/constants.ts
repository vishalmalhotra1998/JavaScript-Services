import { Iemail, IpermissionSet } from './interfaces';

const user: Iemail[] = [

    {
        traineeEmail: 'vishal.malhotra@successive.tech',
        reviewerEmail: 'madhav.bansal@successive.tech',

    },
    {
        traineeEmail: 'ravi.chauhan@successive.tech',
        reviewerEmail: 'vinay.chaudhary@successive.tech',

    }
];
const permissions: IpermissionSet = {
    'getUsers': {
        all: ['head-trainer'],
        read: ['trainer', 'trainee'],
        write: ['trainer'],
        delete: [],
    },
};
// Export the constants user and permission
export { user, permissions };