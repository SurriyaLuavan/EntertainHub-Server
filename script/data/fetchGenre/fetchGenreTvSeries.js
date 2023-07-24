import axios from "axios";
import models from "../../../models/index.model.js";
import handleFetchAndTransform from "../../../utils/handleFetchAndTransform.js";
import axiosOptions from "../../../utils/axiosOption.js";

const fetchGenreTvSeries = async (genreId) => {
  try {
    const genreTvSeriesURL = `${process.env.TMDB_END_POINT}/discover/tv`;
    const genreTvSeriesParams = {
      include_video: false,
      language: "en-CA",
      page: 1,
      with_genres: genreId,
      api_key: process.env.MOVIE_DB_API_KEY,
    };
    const response = await axios.request(
      axiosOptions(genreTvSeriesURL, genreTvSeriesParams)
    );
    const genreTvSeriesList = response.data.results;

    const genreTvSeriesListUpdated = await handleFetchAndTransform(
      genreTvSeriesList,
      "tv"
    );

    for (const item of genreTvSeriesListUpdated) {
      const showInstance = await models.showCollection.TVSeries.findOne({
        title: item.title,
      }).exec();

      if (!showInstance) {
        const updatedItem = {
          ...item,
          lists: {
            airing_today: { status: false, order: -1 },
            trending: { status: false, order: -1 },
            on_the_air: { status: false, order: -1 },
            popular: { status: false, order: -1 },
            top_rated: { status: false, order: -1 },
          },
        };
        await models.showCollection.TVSeries.create(updatedItem);
      }
    }

    return genreTvSeriesListUpdated;
  } catch (error) {
    console.error(error);
  }
};

export default fetchGenreTvSeries;
