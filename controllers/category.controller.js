import {
  getTrendingCollection,
  getNowPlayingMoviesCollection,
  getAiringTodayTVCollection,
  getPopularMoviesCollection,
  getTopRatedMoviesCollection,
  getUpcomingMoviesCollection,
  getOnTheAirTVCollection,
  getPopularTVCollection,
  getTopRatedTVCollection,
} from "../services/category.services.js";

export const trendingController = async (req, res) => {
  const trendingCollection = await getTrendingCollection();
  res.status(200).json({ trendingShows: trendingCollection });
};

export const nowPlayingMoviesController = async (req, res) => {
  const nowPlayingCollection = await getNowPlayingMoviesCollection();
  res.status(200).json({ nowPlayingShows: nowPlayingCollection });
};

export const popularMoviesController = async (req, res) => {
  const popularCollection = await getPopularMoviesCollection();
  res.status(200).json({ popularShows: popularCollection });
};

export const topRatedMoviesController = async (req, res) => {
  const topRatedCollection = await getTopRatedMoviesCollection();
  res.status(200).json({ topRatedShows: topRatedCollection });
};

export const upcomingMoviesController = async (req, res) => {
  const upcomingCollection = await getUpcomingMoviesCollection();
  res.status(200).json({ upcomingShows: upcomingCollection });
};

export const airingTodayTVController = async (req, res) => {
  const airingTodayCollection = await getAiringTodayTVCollection();
  res.status(200).json({ airingTodayShows: airingTodayCollection });
};

export const onTheAirTVController = async (req, res) => {
  const onTheAirCollection = await getOnTheAirTVCollection();
  res.status(200).json({ onTheAirShows: onTheAirCollection });
};

export const popularTVController = async (req, res) => {
  const popularCollection = await getPopularTVCollection();
  res.status(200).json({ popularShows: popularCollection });
};

export const topRatedTVController = async (req, res) => {
  const topRatedCollection = await getTopRatedTVCollection();
  res.status(200).json({ topRatedShows: topRatedCollection });
};
