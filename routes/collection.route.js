import express from "express";
import {
  trendingController,
  nowPlayingMoviesController,
  airingTodayTVController,
  popularMoviesController,
  upcomingMoviesController,
  topRatedMoviesController,
  onTheAirTVController,
  popularTVController,
  topRatedTVController,
} from "../controllers/category.controller.js";

import {
  movieGenreController,
  moviesGenreListController,
  tvSeriesGenreController,
  tvSeriesGenreListController,
} from "../controllers/genre.controller.js";

import {
  searchAllController,
  searchBookmarkController,
  searchMoviesController,
  searchTvSeriesController,
} from "../controllers/search.controller.js";

const router = express.Router();

// Categories collection

router.get("/trending", trendingController);
router.get("/movies/now_playing", nowPlayingMoviesController);
router.get("/movies/popular", popularMoviesController);
router.get("/movies/top_rated", topRatedMoviesController);
router.get("/movies/upcoming", upcomingMoviesController);
router.get("/tvseries/airing_today", airingTodayTVController);
router.get("/tvseries/on_the_air", onTheAirTVController);
router.get("/tvseries/popular", popularTVController);
router.get("/tvseries/top_rated", topRatedTVController);

// Genre collection
router.get("/movies/genre", moviesGenreListController);
router.get("/tvseries/genre", tvSeriesGenreListController);
router.get("/movies/genre/:genreId", movieGenreController);
router.get("/tvseries/genre/:genreId", tvSeriesGenreController);

// Search collection
router.get("/search", searchAllController);
router.get("/movies/search", searchMoviesController);
router.get("/tvseries/search", searchTvSeriesController);
router.get("/bookmarks/search", searchBookmarkController);

export default router;
