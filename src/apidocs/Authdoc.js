/**
 * @api {POST} {domain}/api/auth/login Login
 * @apiName Login
 * @apiDescription Login
 * @apiGroup Auth
 *
 * @apiParam {string} email Email
 * @apiParam {string} password Password
 *
 * @apiSuccess (200) {Boolean} success=true status of response
 * @apiSuccess (200) {Object} result result of response
 * @apiSuccess (200) {Number} result.user.id id of user
 * @apiSuccess (200) {String} result.user user's info
 * @apiSuccess (200) {String} result.user.email user's email
 * @apiSuccess (200) {String} result.user.name user's name
 * @apiSuccess (200) {Number} result.user.role role of user
 * @apiSuccess (200) {String} result.accessToken token used for other requests
 *
 * @apiSuccessExample Success Repsonse:
 * {
 *  "success": true,
 *  "result": {
 *    "user": {
 *      "id": 126,
 *      "email": "fashion@bap.jp",
 *      "name": "nguyen van a",
 *      "role": 1
 *     },
 *    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyNiwicm9sZSI6MSwiaWF0IjoxNTQ3NzA5NDg3LCJleHAiOjE1NDc4ODIyODd9.VLHxaFHsC6QZu7tTFaULqjOMV_BQHbbMWZndOELu7Ag"
 *   }
 * }
 *
 * @apiError (400) {Boolean} success=false status of response
 * @apiError (400) {Object} error error of response
 * @apiError (400) {String} error.code error code
 * @apiError (400) {String} error.message error message
 * @apiErrorExample USERNAME_IS_REQUIRED response
 * {
 *   "success": false,
 *   "error": {
 *      "code": 6,
 *      "message": "USERNAME_IS_REQUIRED"
 *    },
 * }
 * 
 * @apiErrorExample INVALID_CREDENTIALS response
 * {
 *   "success": false,
 *   "error": {
 *      "code": 9,
 *      "message": "INVALID_CREDENTIALS"
 *    },
 * }
 *
 */

/**
 * @api {POST} {domain}/api/auth/register Register new account
 * @apiName  Register new account
 * @apiDescription  Register new account
 * @apiGroup Auth
 *
 * @apiParam {string} email Email
 * @apiParam {string} password Password
 * 
 * @apiSuccess (200) {Boolean} success=true status of response
 *
 * @apiSuccessExample Success Repsonse:
 * {
 *  "success": true
 * }
 *
 * @apiError (400) {Boolean} success=false status of response
 * @apiError (400) {Object} error error of response
 * @apiError (400) {String} error.code error code
 * @apiError (400) {String} error.message error message
 * @apiErrorExample USERNAME_IS_REQUIRED response
 * {
 *   "success": false,
 *   "error": {
 *      "code": 6,
 *      "message": "USERNAME_IS_REQUIRED"
 *    },
 * }
 * @apiErrorExample PASSWORD_IS_REQUIRED response
 * {
 *   "success": false,
 *   "error": {
 *      "code": 7,
 *      "message": "PASSWORD_IS_REQUIRED"
 *    },
 * }
 *
 */
