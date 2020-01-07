const request = require('request-promise');
const authorization = {}
authorization.validateToken = () => {
  return async (req, res, next) => {
    try {
      if (!req.cookies['id-token']) {
        throw new Error('id-token cookie is not set.');
      }
      const headers = {
        'Content-Type': 'application/json',
        'Cookie': request.cookie(`id-token=${req.cookies['id-token']}`)
      };
      const options = {
        url: 'http://localhost:3000/auth/validateToken',
        method: 'GET',
        headers: headers
      };
      await request(options);
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authorization;