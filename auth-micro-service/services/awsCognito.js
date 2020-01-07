const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

class AWSCognito {
  constructor (cache) {
    this.poolRegion = 'us-east-1';
    this.poolData = {
      UserPoolId: "us-east-1_ipiSTmIQq",
      ClientId: "7q4b97vtn07bnsdpblnaahvb8p"
    };
    this.userPool = new AmazonCognitoIdentity.CognitoUserPool(this.poolData);
    this.cacheService = cache;
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

  async validateToken(idToken) {
    let jwtKeys = await this.cacheService.readFromCache('jwtKeys');
    if (!jwtKeys) {
      jwtKeys = await this.setJWTVerificationKeys();
    }
    //validate the token
    const decodedToken = jwt.decode(idToken, { complete: true });
    if (!decodedToken) {
      throw new Error("Provided token is not a valid JWT token");
    }

    const kid = decodedToken.header.kid;
    const pem = jwtKeys[kid];
    if (!pem) {
      throw new Error('Decoded token id is not valid.');
    }
    return this.verifyJWT(idToken, pem);
  }

  setJWTVerificationKeys() {
    const cacheService = this.cacheService;
    return new Promise((resolve, reject) => {
      request({
        url: `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.poolData.UserPoolId}/.well-known/jwks.json`,
        json: true
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          const jwtKeys = {};
          const keys = body['keys'];
          console.log({keys});
          for (let i = 0; i < keys.length; i++) {
            //Convert each key to PEM
            const kid = keys[i].kid;
            const modulus = keys[i].n;
            const exponent = keys[i].e;
            const keyType = keys[i].kty;
            const jwk = { kty: keyType, n: modulus, e: exponent };
            const pem = jwkToPem(jwk);
            jwtKeys[kid] = pem;
            cacheService.writeToCache('jwtKeys', jwtKeys);
            resolve(jwtKeys);
          }
        } else {
          reject(new Error("Unable to download JWKs"));
        }
      });
    });
  }

  verifyJWT(token, pem) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, pem, function (error, payload) {
        if (error) {
          reject(new Error("Token is expired."));
        } else {
          resolve(payload);
        }
      });
    });
  }
};

module.exports = AWSCognito;