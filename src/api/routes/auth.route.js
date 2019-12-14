const Router = require('express').Router();

const {
    login,
    register,
} = require('../controllers/auth.controller');

/**
* @api {post} /auth/login Log in user
* @apiVersion 0.0.1
* @apiSampleRequest http://localhost:5000/auth/login
*
* @apiName LoginUser
* @apiGroup Auth
* @apiPermission Public
*
* @apiParam {String} email User email.
* @apiParam {String} password User password.
*
* @apiParamExample {json} Request-Example:
*     {
*       "email": "user1@gmail.com",
*       "password": "123456"
*     }
*
* @apiSuccess (Success 200) {Object} users User data
* @apiSuccess (Success 200) {String} users.email User email
* @apiSuccess (Success 200) {String} users.password User password
* @apiSuccess (Success 200) {String} users.username User name
* @apiSuccess (Success 200) {String} token Access token
* @apiSuccess (Success 200) {String} message Successful response messsage
* @apiSuccess (Success 200) {Number} code Successful response code
*
* @apiSuccessExample {json} Login-Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "message": "Successfully log in"
*       "code": 200,
*       "user": {
*              "email": "user1@gmail.com",
*              "username": "user1",
*              "password": "$2b$10$r6zDWkZT5wCheFjtXLTlpOiSV/V4ETwSdg9Yj4FbmXreeaihkTYTS",
*       },
*       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoidXNlcjFAZ21haWwuY29tIiwiZXhwIjoxNTc1OTg4OTYyLCJpYXQiOjE1NzU5NTI5NjJ9.REagjwo8iAv7TWarRTv8U_GedrUOwusrPkZML4x6Rqo",
*     }
*
* @apiError UserNotFound The <code>email</code> of the User was not found.
* @apiError WrongAccountOrPassword The <code>email</code> or <code>password</code> of the User was wrong.
*
* @apiErrorExample {json} UserNotFound-Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       "message": "No account found with this email",
*       "code": 404,
*     }
*
* @apiErrorExample {json} WrongAccountOrPassword-Error-Response:
*     HTTP/1.1 400 Bad Request
*     {
*       "message": "Wrong account or password",
*       "code": 400,
*     }
*
*/
Router.route('/login').post(login);

/**
* @api {post} /auth/register Regist new user account
* @apiVersion 0.0.1
* @apiSampleRequest http://localhost:5000/auth/register
*
* @apiName RegistUser
* @apiGroup Auth
* @apiPermission Public
*
* @apiParam {String} email User email
* @apiParam {String} username User name
* @apiParam {String} password User password
*
* @apiParamExample {json} Request-Example:
*     {
*       "email": "user15@gmail.com",
*       "username": "user15",
*       "password": "123456"
*     }
*
* @apiSuccess (Success 201) {Object} user Created user
* @apiSuccess (Success 201) {String} user.email Created user email
* @apiSuccess (Success 201) {String} user.username Created user name
* @apiSuccess (Success 201) {String} user.password Created user password
* @apiSuccess (Success 201) {String} user.createdAt Created user time in database
* @apiSuccess (Success 201) {ObjectId} user._id Created user id
* @apiSuccess (Success 201) {String} token Access token
* @apiSuccess (Success 201) {String} message Successful response message
* @apiSuccess (Success 201) {Number} code Successful response code
*
* @apiSuccessExample {json} Register-Success-Response:
*     HTTP/1.1 201 Created
*     {
*       "code": 201,
*       "message": "Created new user data",
*       "user": {
*           "email": "user15@gmail.com",
*           "password": "$2b$10$DWDzt6WHUpRMfqB4/JhtneJWol0dKLZJTIuctpJ6uudnITsagJ57i",
*           "username": "user15",
*           "createdAt": "20191210T120430",
*           "_id": "5def275efa27ea59f6b8cddf",
*       },
*       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoidXNlcjE1QGdtYWlsLmNvbSIsImV4cCI6MTU3NTk5MDI3MCwiaWF0IjoxNTc1OTU0MjcwfQ.JmPVNY2pZclFa1jwVFc1Gh-8OFqLEM8A267hO08VoDM",
*     }
*
* @apiError EmailConflict The <code>email</code> of the User was already taken.
*
* @apiErrorExample {json} EmailConflict-Error-Response:
*     HTTP/1.1 409 Conflict
*     {
*       "code": 409,
*       "message": "This email is already taken"
*     }
*
*/
Router.route('/register').post(register);

module.exports = Router;
