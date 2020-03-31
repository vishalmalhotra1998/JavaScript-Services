import UserRepository from '../../repositories/user/UserRepository';
import SystemResponse from '../../libs/SystemResponse';
import { Request, Response } from 'express';
import generateObject from './helper';

class UnsortedController {

  private userRepository = new UserRepository();
  static instance;

  static getInstance = (): UnsortedController => {

    if (!UnsortedController.instance) {
      return UnsortedController.instance = new UnsortedController();
    }

    return UnsortedController.instance;

  }

  post = async (req: Request, res: Response) => {
    try {
      const { keyCount, depth } = req.body;
      console.log('This', keyCount);
      const sizeof = require('object-sizeof');
      const performance = require('performance-now');
      const start = performance();
      const obj = generateObject(keyCount, depth);
      const end = performance();

      const options = { ...req.body, obj, size: sizeof(obj) + 'B', generationTime: (end - start + 'ms') };
      const data = await this.userRepository.create(options);
      SystemResponse.success(res, data, 'Check For Creation');
    }
    catch (error) {

      SystemResponse.failure(res, error);
    }
  }
  list = async (req: Request, res: Response) => {
    try {
      const data = await this.userRepository.list(req.query);
      if (!data) {
        throw { message: 'no data to Find' };
      }
      SystemResponse.success(res, data, 'finding data');
    }
    catch (error) {

      SystemResponse.failure(res, error);

    }

  }

  put = async (req: Request, res: Response) => {

    const { data, dataToUpdate } = req.body;
    const data1 = await this.userRepository.update(data, dataToUpdate);
    SystemResponse.success(res, data1, 'update this data');
  }

  get = async (req: Request, res: Response) => {

    const { id, skip, limit, ...query } = req.query;
    let data1;
    if (id) {
      data1 = await this.userRepository.get({ id });
    }
    else {
      const options = { skip, limit };
      data1 = await this.userRepository.list(query, options);
    }

    console.log('Inside get');

    SystemResponse.success(res, data1, 'yyoyoyoy');

  }

}
export default UnsortedController.getInstance();