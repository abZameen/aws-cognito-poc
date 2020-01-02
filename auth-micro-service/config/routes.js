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
      res.json(result);
    } catch (error) {
      console.log({error});
      return error;
    }
  });
}