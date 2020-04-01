import SystemResponse from '../../../M1/libs/SystemResponse';
import { Request, Response } from 'express';
import { bubbleSort, mergeSort, selectionSort, insertionSort, adjust } from './helper';

class SortedController {

  static instance;

  static getInstance = (): SortedController => {

    if (!SortedController.instance) {
      return SortedController.instance = new SortedController();
    }

    return SortedController.instance;

  }

  post = async (req: Request, res: Response) => {
    try {
      let newObj;
      let id;
      const performance = require('performance-now');
      const { data, sortAlgorithm } = req.body;

      switch (sortAlgorithm) {

        case 'Bubble Sort': {
          console.log('---------Bubble Sort---------------');
          const start = performance();
          const result = bubbleSort(Object.keys(data.obj));
          newObj = adjust(result, data.obj, bubbleSort);
          id = data._id;
          const end = performance();
          SystemResponse.success(res, { newObj, sortTime: (end - start) + 'ms', }, 'ccccc');
          break;
        }
        case 'Selection Sort': {
          console.log('---------Selection Sort---------------');
          const start = performance();
          const result = selectionSort(Object.keys(data.obj));
          newObj = adjust(result, data.obj, selectionSort);
          id = data._id;
          const end = performance();
          SystemResponse.success(res, { newObj, sortTime: (end - start) + 'ms', sortingAlgorithm: sortAlgorithm }, 'ccccc');
          break;
        }
        case 'Insertion Sort': {
          console.log('---------Insertion Sort---------------');
          const start = performance();
          const result = insertionSort(Object.keys(data.obj));
          newObj = adjust(result, data.obj, insertionSort);
          id = data._id;
          const end = performance();
          SystemResponse.success(res, { newObj, sortTime: (end - start) + 'ms', sortingAlgorithm: sortAlgorithm }, 'ccccc');
          break;
        }
        case 'Merge Sort': {
          console.log('---------MergeSort---------------');
          const start = performance();
          const result = mergeSort(Object.keys(data.obj));
          newObj = adjust(result, data.obj, mergeSort);
          id = data._id;
          const end = performance();
          SystemResponse.success(res, { newObj, sortTime: (end - start) + 'ms', sortingAlgorithm: sortAlgorithm }, 'ccccc');
          break;
        }

        default: {
          console.log('--------------------default----------');
          const start = performance();
          const result = mergeSort(Object.keys(data.obj));
          newObj = adjust(result, data.obj, mergeSort);
          id = data._id;
          const end = performance();
          SystemResponse.success(res, { newObj, sortTime: (end - start) + 'ms', sortingAlgorithm: 'Merge Sort' }, 'ccccc');

        }

      }
    }
    catch (error) {

      SystemResponse.failure(res, error);
    }

  }
}
export default SortedController.getInstance();