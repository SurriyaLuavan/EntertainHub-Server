import models from "../models/index.model.js";

export const getSearchFromAll = async (searchValue) => {
  try {
    const res = await models.showCollection.Show.aggregate([
      {
        $match: {
          title: { $regex: new RegExp(`\\b${searchValue}\\w*\\b`, "i") },
        },
      },
      {
        $limit: 20,
      },
    ]);

    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getSearchFromMovies = async (searchValue) => {
  try {
    const res = await models.showCollection.Movie.aggregate([
      {
        $match: {
          title: { $regex: new RegExp(`\\b${searchValue}\\w*\\b`, "i") },
        },
      },
      {
        $limit: 20,
      },
    ]);

    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getSearchFromTvSeries = async (searchValue) => {
  try {
    const res = await models.showCollection.TVSeries.aggregate([
      {
        $match: {
          title: { $regex: new RegExp(`\\b${searchValue}\\w*\\b`, "i") },
        },
      },
      {
        $limit: 20,
      },
    ]);

    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getSearchFromBookmark = async (searchValue, userId) => {
  try {
    const res = await models.userCollection.User.findById(userId);
    const regex = new RegExp(`\\b${searchValue}\\w*\\b`, "i");

    const resSearchBookmarks = res.bookmarks.filter((item) =>
      regex.test(item.title)
    );

    return resSearchBookmarks;
  } catch (err) {
    console.error(err);
  }
};
