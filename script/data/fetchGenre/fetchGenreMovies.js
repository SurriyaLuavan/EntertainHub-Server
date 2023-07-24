import axios from "axios";
import models from "../../../models/index.model.js";
import handleFetchAndTransform from "../../../utils/handleFetchAndTransform.js";
import axiosOptions from "../../../utils/axiosOption.js";

const fetchGenreMovies = async (genreId) => {
  try {
    const genreMoviesURL = `${process.env.TMDB_END_POINT}/discover/movie`;
    const genreMoviesParams = {
      include_video: false,
      language: "en-CA",
      page: 1,
      with_genres: genreId,
      api_key: process.env.MOVIE_DB_API_KEY,
    };
    const response = await axios.request(
      axiosOptions(genreMoviesURL, genreMoviesParams)
    );
    const genreMoviesList = response.data.results;

    const genreMoviesListUpdated = await handleFetchAndTransform(
      genreMoviesList,
      "movie"
    );

    for (const item of genreMoviesListUpdated) {
      const showInstance = await models.showCollection.Movie.findOne({
        title: item.title,
      }).exec();

      if (!showInstance) {
        const updatedItem = {
          ...item,
          lists: {
            now_playing: { status: false, order: -1 },
            trending: { status: false, order: -1 },
            popular: { status: false, order: -1 },
            top_rated: { status: false, order: -1 },
            upcoming: { status: false, order: -1 },
          },
        };
        await models.showCollection.Movie.create(updatedItem);
      }
    }

    return genreMoviesListUpdated;
  } catch (error) {
    console.error(error);
  }
};

export default fetchGenreMovies;
