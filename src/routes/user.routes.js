import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshToken,
  changeCurrentPassword,
  updateAccountDetails,
  updateUSerAvatar,
  updateCoverImage,
  getUserChannelprofile,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").get(verifyJWT, refreshToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-user").patch(verifyJWT, updateAccountDetails);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUSerAvatar);
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("/coverImage"), updateCoverImage);
router.route("/c/:username").get(verifyJWT, getUserChannelprofile);
router.route("/history").get(verifyJWT, getWatchHistory);

export default router;
