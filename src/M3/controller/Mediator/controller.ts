import UserRepository from '../../../M1/repositories/user/UserRepository';
import SystemResponse from '../../../M1/libs/SystemResponse';
import { Request, Response } from 'express';
import axios from 'axios';

class MediatorController {

    private userRepository = new UserRepository();
    static instance;

  static getInstance = (): MediatorController => {

    if (!MediatorController.instance) {
      return MediatorController.instance = new MediatorController();
    }

    return MediatorController.instance;

  }

  create = async (req: Request, res: Response) => {
    try {
       const { keyCount , depth } = req.body;
       console.log('this-----------');
     const response = await axios({
        method: 'post',
        url: 'http://localhost:9000/api/unsortCreate/',
        data: {
          keyCount,
          depth,
        }

      });
    const { data } = response.data;
       SystemResponse.success(res, data , 'karma');
    }
    catch (error) {

      SystemResponse.failure(res, error);
    }
}

put = async (req: Request, res: Response) => {
    const { id } = req.body;
    console.log('id---------------', id);
    const response = await axios.get('http://localhost:9000/api/unsortCreate', {
            params: {
              id,
            }
            });

   const sortObject: any = await axios({
        method: 'post',
            url: 'http://localhost:9001/api/sorting/',
            data: {
             data: response.data.data
            }

    });
    const { data } = sortObject.data;
    const {newObj, sortTime} = data;
   const updateData = await axios({
        method: 'put',
        url: 'http://localhost:9000/api/unsortCreate/',
        data: {
            data: { id },
          dataToUpdate: {obj: newObj},
        }

    });
    const createSortStats = await axios({
      method: 'post',
      url: 'http://localhost:9000/api/sortStats/',
      data: {
          data: { id , sortDuration: sortTime },

      }

  });

    SystemResponse.success(res, updateData.data.data, 'update this');

}

list = async (req: Request, res: Response) => {

  const response = await axios.get('http://localhost:9000/api/unsortCreate');

  const { data } = response.data;
   res.send(data);

}

}
export default MediatorController.getInstance();