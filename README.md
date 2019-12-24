# AWS Cognito POC

This is a POC setup for using Amazon's Cognito service as authorization layer.  
The project contains a front-end implemented using Angular 5 and a back-end implemented using Node + Express.

## Architecture
**Front End**  
Front-end application consists of an authorization component which contains pages for SignUp and SignIn. It also contains a service that talks to back-end to communicate data.

**Back End**  
The back-end application contains an authorization APIs for SignUp and SignIn. It contains a micro service that uses AWS Cognito service to store user data and generate refresh and access tokens in cloud.

**Note:** The front-end application will get access to the short lived access token through an HTTP cookie set by the Auth API.
