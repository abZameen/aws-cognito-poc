const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

class AWSCognito {
  constructor() {
    this.poolData = {
      UserPoolId: "us-east-1_ipiSTmIQq",
      ClientId: "7q4b97vtn07bnsdpblnaahvb8p"
    };
    this.userPool = new AmazonCognitoIdentity.CognitoUserPool(this.poolData);
  }

  registerUser(user) {
    const attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "name", Value: `${user.firstName} ${user.lastName}` }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "preferred_username", Value: user.email }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: user.email }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "gender", Value: user.gender }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "birthdate", Value: user.dob }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "address", Value: user.address }));
    return new Promise((resolve, reject) => {
      this.userPool.signUp(user.email, user.password, attributeList, null, function(error, result) {
        if (error) {
          reject(error);
        }
        resolve(result.user);
      });
    });
  }
  
  loginUser (credentials) {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : credentials.email,
        Password : credentials.password,
    });
    const userData = {
        Username : credentials.email,
        Pool : this.userPool
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
};

module.exports = AWSCognito;