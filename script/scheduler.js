import fetchTrendingShows from "../script/data/fetchCategory/fetchTrendingShows.js";
import fetchNowPlayingMovies from "../script/data/fetchCategory/Movies/fetchNowPlayingMovies.js";
import fetchPopularMovies from "../script/data/fetchCategory/Movies/fetchPopularMovies.js";
import fetchTopRatedMovies from "../script/data/fetchCategory/Movies/fetchTopRatedMovies.js";
import fetchOnTheAirTV from "../script/data/fetchCategory/TvSeries/fetchOnTheAirTV.js";
import fetchPopularTV from "../script/data/fetchCategory/TvSeries/fetchPopularTV.js";
import fetchTopRatedTV from "../script/data/fetchCategory/TvSeries/fetchTopRatedTV.js";
import fetchGenreMovies from "../script/data/fetchGenre/fetchGenreMovies.js";
import fetchGenreTvSeries from "../script/data/fetchGenre/fetchGenreTvSeries.js";
import {
  movieGenreList,
  tvGenreList,
} from "../script/data/fetchGenre/getGenresList.js";
import { RateLimit } from "async-sema";
import { connectDb } from "../models/index.model.js";

const limit = RateLimit(5);

const fetchAndStorePipeLine = async () => {
  await limit();
  for (const item of movieGenreList) {
    await fetchGenreMovies(item.id);
  }
  for (const item of tvGenreList) {
    await fetchGenreTvSeries(item.id);
  }
  await fetchTrendingShows();
  await fetchNowPlayingMovies();
  await fetchPopularMovies();
  await fetchTopRatedMovies();
  await fetchOnTheAirTV();
  await fetchPopularTV();
  await fetchTopRatedTV();
  console.log("Fetch Completed");
  return 200;
};

export const handler = async () => {
  try {
    await connectDb();
    const res = await fetchAndStorePipeLine();
    console.log("Status: ", res);
    return res;
  } catch (e) {
    console.log(e);
    return 500;
  }
};
