const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const cognitoService = {};

cognitoService.registerUser = (user) => {
  const poolData = {
    UserPoolId: "us-east-1_ipiSTmIQq",
    ClientId: "7q4b97vtn07bnsdpblnaahvb8p"
  };
  const pool_region = 'us-east-1';
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  console.log('got user in method');
  console.log({user});
  const attributeList = [];
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "name", Value: `${user.firstName} ${user.lastName}` }));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "preferred_username", Value: user.email }));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: user.email }));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "gender", Value: user.gender }));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "birthdate", Value: user.dob }));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "address", Value: user.address }));
  userPool.signUp(user.email, user.password, attributeList, null, function(err, result){
    if (err) {
        console.log(err);
        throw err;
    }
    const cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
    return result.user;
});
}

module.exports = cognitoService;