import SystemResponse from '../../../M1/libs/SystemResponse';
import { Request, Response } from 'express';
import axios from 'axios';

class MediatorController {

  static instance;

  static getInstance = (): MediatorController => {

    if (!MediatorController.instance) {
      return MediatorController.instance = new MediatorController();
    }

    return MediatorController.instance;

  }

  create = async (req: Request, res: Response) => {
    try {
      const { keyCount, depth } = req.body;
      const response = await axios({
        method: 'post',
        url: 'http://localhost:9000/api/unsortCreate/',
        data: {
          keyCount,
          depth,
        }

      });
      const { data } = response;
      res.send(data);
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
        data: response.data
      }

    });

    const { data } = sortObject;
    const { newObj, sortTime } = data;

    const updateData = await axios({
      method: 'put',
      url: 'http://localhost:9000/api/unsortCreate/',
      data: {
        data: { id },
        dataToUpdate: { obj: newObj },
      }

    });

    await axios({
      method: 'post',
      url: 'http://localhost:9000/api/sortStats/',
      data: {
        data: { id, sortDuration: sortTime },

      }

    });

    res.send(updateData.data);

  }

  list = async (req: Request, res: Response) => {

    const { skip, limit } = req.query;
    const response = await axios.get('http://localhost:9000/api/unsortCreate', {
      params: {
        skip,
        limit
      }
    });
    const { data } = response;
    res.send(data);

  }

}
export default MediatorController.getInstance();