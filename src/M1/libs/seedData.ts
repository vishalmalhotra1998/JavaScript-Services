import UserRepository from '../repositories/user/UserRepository';
import config from './../../config/configuration';
import * as bcrypt from 'bcrypt';
import SystemResponse from './SystemResponse';
import { response } from 'express';

export default async () => {
  const saltRounds = 10;
  const { PASSWORD: loginPassword } = config;
  const userRepository = new UserRepository();
  const hashPassword = await bcrypt.hash(loginPassword, saltRounds);
  if (!hashPassword) {
    SystemResponse.failure( response, { message: 'Error in Password encryption'} );
  }
  const user = {
    keyCount: 4,
        depth: 3,
        size: '1kb',
        createdAt: new Date(),


  };

  const count = await userRepository.count();

  if (!count) {
    const authId = '5e577abc417c5b3a22164a8c';
    return userRepository.create( user, authId ).then((result) => {
      console.log('User Added Successfully', result);
    });
  }

};
