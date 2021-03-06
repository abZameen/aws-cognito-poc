const {
  AWSCognito,
  Cache
} = require('../services');
const apiNamespace = '/auth';

const cacheService = new Cache(
  '127.0.0.1',
  '6379',
  'admin'
);
const cognitoService = new AWSCognito(cacheService);

module.exports = (app) => {
  app.post(`${apiNamespace}/register`, async (req, res) => {
    try {
      const result = await cognitoService.registerUser(req.body);
      res.json({
        user: {
          email: result.getUsername()
        }
      });
    } catch (error) {
      return error;
    }
  });
  
  app.post(`${apiNamespace}/login`, async (req, res) => {
    try {
      const result = await cognitoService.loginUser(req.body);
      res.cookie('id-token', result.idToken, { httpOnly: true });
      cacheService.writeToCache('refresh-token', result.refreshToken);
      cacheService.writeToCache('access-token', result.accessToken);
      cacheService.writeToCache('id-token', result.idToken);
      cacheService
      res.send('User logged-in successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.get(`${apiNamespace}/validateToken`, async (req, res) => {
    try {
      const idToken = req.cookies['id-token'];
      if (!idToken) {
        throw new Error("id-token cookie is not set.");
      };
      const result = await cognitoService.validateToken(idToken);
      console.log({result});
      if (result) {
        res.send('Token validated');
      }
    } catch (error) {
      console.log(error.message);
      res.status(401).send(error.message);
    }
  });
}