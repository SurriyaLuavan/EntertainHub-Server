import {
  movieGenreList,
  tvGenreList,
} from "../script/data/fetchGenre/getGenresList.js";
import models from "../models/index.model.js";

export const getMovieGenreCollection = async (genreId) => {
  try {
    const res = await models.showCollection.Show.aggregate([
      {
        $match: {
          genres: { $elemMatch: { tmdb_id: genreId } },
          media_type: "Movie",
        },
      },
      {
        $limit: 20,
      },
    ]);

    const [title] = res[0].genres
      .filter((item) => item.tmdb_id === genreId)
      .map((item) => item.name);

    return { movieCollection: res, title };
  } catch (err) {
    console.error(err);
  }
};

export const getTvSeriesGenreCollection = async (genreId) => {
  try {
    const res = await models.showCollection.Show.aggregate([
      {
        $match: {
          genres: { $elemMatch: { tmdb_id: genreId } },
          media_type: "TV Series",
        },
      },
      {
        $limit: 20,
      },
    ]);

    const [title] = res[0].genres
      .filter((item) => item.tmdb_id === genreId)
      .map((item) => item.name);

    return { tvSeriesCollection: res, title };
  } catch (err) {
    console.error(err);
  }
};

export const getMovieGenreListCollection = async () => {
  return movieGenreList;
};

export const getTvSeriesGenreListCollection = async () => {
  return tvGenreList;
};
