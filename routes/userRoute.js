const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.use(express.json());

/**
 * @api {get} /user/detail Request User Information
 * @apiName GetUser
 * @apiGroup User
 * @apiSuccess {Object[]} user fetch all user attribute

 */
router.get("/detail", userController.userDetail);

/**
 * @api {post} /user/register Create New User
 * @apiName CreateUser
 * @apiGroup User
 *
 *@apiBody {String} name name of the user
 *@apiBody {String} email email of the user
 *
 * @apiSuccess {String} message successfully business created.
 */

router.post("/register", userController.userRegister);

/**
 * @api {put} /user/:id Update User
 * @apiName updateUser
 * @apiGroup User
 * @apiParam {objectId} id user unique Id
 *@apiBody {String} name name of the user
 *@apiBody {String} email email of the user
 *
 * @apiSuccess {String} message successfully user updated.
 */
router.put("/:id", userController.userUpdate);

/**
 * @api {delete} /user/:id Delete User Information
 * @apiName DeleteUser
 * @apiGroup User
 * 
* @apiParam {objectId} id user unique Id
 * @apiSuccess {Object[]} user delete all user attribute

 */
router.delete("/:id", userController.userDelete);

/**
 * @api {post} /user/login User Authentication
 * @apiName UserAuthenticate
 * @apiGroup User
 *
 * @apiBody {String} email  email of the admin.
 *
 * @apiSuccess {String} token The JSON Web Token (JWT) for authentication.
 * @apiSuccess {String} name The name of the admin user.
 */

router.post("/login", userController.userLogin);

module.exports = router;
