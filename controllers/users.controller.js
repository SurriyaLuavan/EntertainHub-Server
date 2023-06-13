import {
  postUsers,
  getBookmarks,
  patchBookmark,
} from "../services/user.services.js";

export const usersCreateController = async (req, res) => {
  const userResults = await postUsers(req.body.email);
  res.status(200).json(userResults);
};

export const userBookmarksController = async (req, res) => {
  const bookmarkResults = await getBookmarks(req.params.userId);
  res.status(200).json(bookmarkResults);
};

export const updateBookmarkController = async (req, res) => {
  const userResults = await patchBookmark(
    req.params.userId,
    req.params.bookmarkId
  );
  res.status(200).json(userResults);
};
