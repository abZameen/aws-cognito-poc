const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const poolData = {
  UserPoolId: "us-east-1_ipiSTmIQq",
  ClientId: "7q4b97vtn07bnsdpblnaahvb8p"
};
const pool_region = 'us-east-1';
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const cognitoService = {};

cognitoService.registerUser = (user) => {
  const attributeList = [];
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "name", Value: `${user.firstName} ${user.lastName}` }));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "preferred_username", Value: user.email }));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: user.email }));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "gender", Value: user.gender }));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "birthdate", Value: user.dob }));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "address", Value: user.address }));
  return new Promise((resolve, reject) => {
    userPool.signUp(user.email, user.password, attributeList, null, function(error, result) {
      if (error) {
          reject(error);
      }
      resolve(result.user);
    });
  });
}

cognitoService.loginUser = (credentials) => {
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username : credentials.email,
      Password : credentials.password,
  });
  const userData = {
      Username : credentials.email,
      Pool : userPool
  };
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken()
          });
      },
      onFailure: function(error) {
        reject(error);
      },
    });
  });
}

module.exports = cognitoService;