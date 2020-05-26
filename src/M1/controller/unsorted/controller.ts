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
      const sizeof = require('object-sizeof');
      const performance = require('performance-now');
      const start = performance();
      const obj = generateObject(keyCount, depth);
      const end = performance();
      const options = { ...req.body, obj, size: sizeof(obj) + 'B', generationTime: (end - start + 'ms') };
      const data = await this.userRepository.create(options);
      res.send(data);
    }
    catch (error) {
      SystemResponse.failure(res, error);
    }
  }

  put = async (req: Request, res: Response) => {

    const { data, dataToUpdate } = req.body;
    const updateData = await this.userRepository.update(data, dataToUpdate);
    res.send(updateData);
  }

  get = async (req: Request, res: Response) => {
    const { id, skip: start, limit: last, ...query } = req.query;
    let data;
    if (id) {
      data = await this.userRepository.get({ id });
    }
    else {
      const skip = Number(start);
      const limit = Number(last);
      const options = { skip, limit };
      data = await this.userRepository.list(query, options);
    }
    console.log('Inside get');

    res.send(data);

  }

}
export default UnsortedController.getInstance();