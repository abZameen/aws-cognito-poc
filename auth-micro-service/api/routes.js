const cognitoService = require('../services/cognito');
const apiNamespace = '/api';

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
      res.cookie('access-token', result.accessToken, {maxAge: 9000000000, httpOnly: true });
      res.cookie('refresh-token', result.refreshToken, {maxAge: 9000000000, httpOnly: true });
      res.cookie('id-token', result.idToken, {maxAge: 9000000000, httpOnly: true });
      res.cookie('test-cookie', 'testdata', {httpOnly: true});
      res.json(true);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.get(`${apiNamespace}/checkCookie`, async (req, res) => {
    try {
      res.send(req.cookies);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}