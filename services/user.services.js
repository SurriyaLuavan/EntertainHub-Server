import models from "../models/index.model.js";

export const postUsers = async (email) => {
  try {
    const userInstance = await models.userCollection.User.findOne({
      email: email,
    }).exec();

    if (!userInstance) {
      const user = {
        email: email,
        bookmarks: [],
      };
      const createdUser = await models.userCollection.User.create(user);
      console.log("User Created");
      return createdUser;
    }
    console.log("User Exist");
    return userInstance;
  } catch (err) {
    console.log(err);
  }
};

export const getBookmarks = async (userId) => {
  try {
    const userInstance = await models.userCollection.User.findById(
      userId
    ).exec();

    console.log("Called");

    if (userInstance) {
      const bookmarks = userInstance.bookmarks;
      return bookmarks;
    }
  } catch (err) {
    console.log(err);
  }
};

export const patchBookmark = async (userId, bookmarkId) => {
  try {
    const userInstance = await models.userCollection.User.findById(
      userId
    ).exec();
    const showInstance = await models.showCollection.Show.findById(
      bookmarkId
    ).exec();

    if (userInstance && showInstance) {
      const bookmarkInfo = {
        title: showInstance.title,
        show_id: showInstance._id.toString(),
        release_date: showInstance.release_date,
        backdrop_path: showInstance.backdrop_path,
        vote_average: showInstance.vote_average,
        media_type: showInstance.media_type,
      };

      const exist = userInstance.bookmarks.some((item) => {
        return item.show_id === bookmarkInfo.show_id;
      });

      if (exist) {
        userInstance.bookmarks = userInstance.bookmarks.filter(
          (item) => item.show_id !== bookmarkInfo.show_id
        );
        const res = await userInstance.save();
        return res;
      } else {
        userInstance.bookmarks = [...userInstance.bookmarks, bookmarkInfo];
        const res = await userInstance.save();
        return res;
      }
    } else {
      console.log(
        "Error in finding shows and bookmarks",
        userInstance,
        showInstance
      );
    }
  } catch (err) {
    console.log(err);
  }
};
