export default ((req, res, next) => {

    next({ error: 'Not found', code: '500' });

});