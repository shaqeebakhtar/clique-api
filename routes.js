const router = require("express").Router();
const authController = require("./controllers/auth-controller");
const activateController = require("./controllers/activate-controller");
const authMiddleware = require("./middlewares/auth-middleware");
const spacesController = require("./controllers/spaces-controller");

router.post("/api/get-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post("/api/activate", authMiddleware, activateController.activate);
router.get("/api/refresh", authController.refresh);
router.post("/api/logout", authMiddleware, authController.logout);
router.post("/api/spaces", authMiddleware, spacesController.createSpace);
router.get("/api/spaces", authMiddleware, spacesController.index);
router.get("/api/spaces/:spaceId", authMiddleware, spacesController.show);

module.exports = router;
