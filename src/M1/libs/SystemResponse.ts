export default class SystemResponse {
    static success = (res, data, message) => {
        return res.status(200).send({
            status: 'ok',
            message,
            data,
        });
    }
    static failure = (res, error) => {
        return res.status(422).send({
            status: 'Error',
            message: error.message

        });
    }

}