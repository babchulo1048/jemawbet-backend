const express = require("express");
const adminController = require("../controller/adminController");

const router = express.Router();

router.use(express.json());
router.post("/register", adminController.adminRegister);

/**
 * @api {get} /admin/detail Request Admin Information
 * @apiName GetAdmin
 * @apiGroup Admin
 * @apiSuccess {Object[]} admin fetch all admin attribute

 */

router.get("/detail", adminController.adminDetail);

/**
 * @api {post} /admin/register Create New Admin
 * @apiName CreateAdmin
 * @apiGroup Admin
 *
 *@apiBody {String} name name of the business
 *@apiBody {String} password password of the business
 *@apiBody {String} email email of the business
 *
 * @apiSuccess {String} message successfully business created.
 */

router.post("/register", adminController.adminRegister);

/**
 * @api {put} /admin/:id Update Admin
 * @apiName updateAdmin
 * @apiGroup Admin
 * @apiParam {objectId} id admin unique Id
 *@apiBody {String} name name of the business
 *@apiBody {String} password password of the business
 *@apiBody {String} email email of the business
 *
 * @apiSuccess {String} message successfully business updated.
 */

router.put("/:id", adminController.adminUpdate);

/**
 * @api {delete} /admin/:id Delete Admin Information
 * @apiName DeleteAdmin
 * @apiGroup Admin
 * 
* @apiParam {objectId} id admin unique Id
 * @apiSuccess {Object[]} admin delete all admin attribute

 */

router.delete("/:id", adminController.adminDelete);

/**
 * @api {post} /admin/login Admin Authentication
 * @apiName AdminAuthenticate
 * @apiGroup Admin
 *
 * @apiBody {String} password  password of the admin.
 * @apiBody {String} email  email of the admin.
 *
 * @apiSuccess {String} token The JSON Web Token (JWT) for authentication.
 * @apiSuccess {String} email The email of the admin user.
 */

router.post("/login", adminController.adminLogin);

module.exports = router;
