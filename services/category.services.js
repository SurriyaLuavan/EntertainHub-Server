import models from "../models/index.model.js";

export const getTrendingCollection = async () => {
  try {
    const res = await models.showCollection.Show.aggregate([
      {
        $match: {
          "lists.trending.status": true,
          "lists.trending.order": { $gte: 0 },
        },
      },
      {
        $sort: {
          "lists.trending.order": 1,
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

export const getNowPlayingMoviesCollection = async () => {
  try {
    const res = await models.showCollection.Show.aggregate([
      {
        $match: {
          "lists.now_playing.status": true,
          "lists.now_playing.order": { $gte: 0 },
        },
      },
      {
        $sort: {
          "lists.now_playing.order": 1,
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

export const getPopularMoviesCollection = async () => {
  try {
    const res = await models.showCollection.Movie.aggregate([
      {
        $match: {
          "lists.popular.status": true,
          "lists.popular.order": { $gte: 0 },
        },
      },
      {
        $sort: {
          "lists.popular.order": 1,
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

export const getTopRatedMoviesCollection = async () => {
  try {
    const res = await models.showCollection.Movie.aggregate([
      {
        $match: {
          "lists.top_rated.status": true,
          "lists.top_rated.order": { $gte: 0 },
        },
      },
      {
        $sort: {
          "lists.top_rated.order": 1,
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

export const getUpcomingMoviesCollection = async () => {
  try {
    const res = await models.showCollection.Movie.aggregate([
      {
        $match: {
          "lists.upcoming.status": true,
          "lists.upcoming.order": { $gte: 0 },
        },
      },
      {
        $sort: {
          "lists.upcoming.order": 1,
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

export const getAiringTodayTVCollection = async () => {
  try {
    const res = await models.showCollection.TVSeries.aggregate([
      {
        $match: {
          "lists.airing_today.status": true,
          "lists.airing_today.order": { $gte: 0 },
        },
      },
      {
        $sort: {
          "lists.airing_today.order": 1,
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

export const getOnTheAirTVCollection = async () => {
  try {
    const res = await models.showCollection.TVSeries.aggregate([
      {
        $match: {
          "lists.on_the_air.status": true,
          "lists.on_the_air.order": { $gte: 0 },
        },
      },
      {
        $sort: {
          "lists.on_the_air.order": 1,
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

export const getPopularTVCollection = async () => {
  try {
    const res = await models.showCollection.TVSeries.aggregate([
      {
        $match: {
          "lists.popular.status": true,
          "lists.popular.order": { $gte: 0 },
        },
      },
      {
        $sort: {
          "lists.popular.order": 1,
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

export const getTopRatedTVCollection = async () => {
  try {
    const res = await models.showCollection.TVSeries.aggregate([
      {
        $match: {
          "lists.top_rated.status": true,
          "lists.top_rated.order": { $gte: 0 },
        },
      },
      {
        $sort: {
          "lists.top_rated.order": 1,
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
