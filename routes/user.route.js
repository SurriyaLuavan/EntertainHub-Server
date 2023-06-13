import express from "express";
import {
  usersCreateController,
  updateBookmarkController,
  userBookmarksController,
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/", usersCreateController);
router.get("/:userId/bookmarks", userBookmarksController);
router.patch("/:userId/bookmarks/:bookmarkId", updateBookmarkController);

export default router;
