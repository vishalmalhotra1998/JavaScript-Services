import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../../config/configuration';
import hasPermission from './permissions';
import UserRepository from '../../repositories/user/UserRepository';
import IRequest from './IRequest';
import SystemResponse from './../SystemResponse';


export default  (module, permissionType) => async (req: IRequest, res: Response, next: NextFunction) => {

  const token: string = req.headers.authorization;
  const { SECRET_KEY: secretKey } = config;
  const decodeUser = jwt.verify(token, secretKey);
  const userRepository = new UserRepository();
  if (!decodeUser) {
    next({
      status: 403,
      error: 'Unauthorized Access',
      message: 'Unauthorized Access'
    });
  }
  const { _id : originalId, email } = decodeUser;
  try {
  const user = await userRepository.get({ originalId, email });
  if (!user) {
    next({
      status: 403,
      error: 'Unauthorized Access',
      message: 'User does not exist'
    });
  }
  req.user = user;
  if (!hasPermission(module, decodeUser.role, permissionType)) {
    next({
      status: 403,
      error: 'Unauthorized Access',
      message: 'Permission Denied'

    });
  }
  next();
}
catch (error) {
    SystemResponse.failure(res, error);
  }
};
