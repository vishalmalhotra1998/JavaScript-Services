import UserRepository from '../../repositories/sort/UserRepository';
import SystemResponse from '../../libs/SystemResponse';
import { Request, Response, } from 'express';


class SortStatsController {

    private userRepository = new UserRepository();
    static instance;

    static getInstance = (): SortStatsController => {

        if (!SortStatsController.instance) {
            return SortStatsController.instance = new SortStatsController();
        }
        return SortStatsController.instance;

    }

    get = async (req: Request, res: Response) => {

        const { skip, limit, ...query } = req.query;
        const options = { skip, limit, sortBy: { 'createdAt': -1 } };
        const data = await this.userRepository.list(query, options);
        res.send(data);

    }

    post = async (req: Request, res: Response) => {
        try {
            const { data } = req.body;
            const { id, sortDuration, sortAlgorithm } = data;
            const options = { objectId: id, sortDuration, sortingAlgorithm: sortAlgorithm };
            const sortStats = await this.userRepository.create(options);
            res.send(sortStats);

        }
        catch (error) {

            SystemResponse.failure(res, error);
        }
    }

}

export default SortStatsController.getInstance();