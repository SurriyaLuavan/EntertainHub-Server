import axios from "axios";
import handleDataTransformation from "./handleDataTransformation.js";
import axiosOptions from "./axiosOption.js";

const handleFetchAndTransform = async (list, type) => {
  const ListUpdated = await Promise.all(
    list.map(async (item) => {
      const category = type === "trending" ? item.media_type : type;

      const urlList = {
        details: `https://api.themoviedb.org/3/${category}/${item.id}?language=en-CA&api_key=${process.env.MOVIE_DB_API_KEY}`,
        credits_tv: `https://api.themoviedb.org/3/tv/${item.id}/aggregate_credits?language=en-CA&api_key=${process.env.MOVIE_DB_API_KEY}`,
        credits_movie: `https://api.themoviedb.org/3/movie/${item.id}/credits?language=en-CA&api_key=${process.env.MOVIE_DB_API_KEY}`,
        rating_tv: `https://api.themoviedb.org/3/tv/${item.id}/content_ratings?api_key=${process.env.MOVIE_DB_API_KEY}`,
        rating_movie: `https://api.themoviedb.org/3/movie/${item.id}/release_dates?api_key=${process.env.MOVIE_DB_API_KEY}`,
      };

      const details = await axios.request(axiosOptions(urlList.details));

      const credits = await axios.request(
        axiosOptions(
          category === "movie" ? urlList.credits_movie : urlList.credits_tv
        )
      );

      const rating = await axios.request(
        axiosOptions(
          category === "movie" ? urlList.rating_movie : urlList.rating_tv
        )
      );

      const result = {
        ...item,
        ...details.data,
        cast: credits.data.cast,
        certificate: rating.data.results,
      };

      const filteredList = handleDataTransformation(result, category);
      return { ...filteredList, category: category };
    })
  );

  return ListUpdated;
};

export default handleFetchAndTransform;
