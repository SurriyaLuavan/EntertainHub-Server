import {
  getSearchFromAll,
  getSearchFromMovies,
  getSearchFromBookmark,
  getSearchFromTvSeries,
} from "../services/search.services.js";

export const searchAllController = async (req, res) => {
  const searchResults = await getSearchFromAll(req.query.searchValue);
  res.status(200).json({ searchResults: searchResults });
};

export const searchMoviesController = async (req, res) => {
  const searchResults = await getSearchFromMovies(req.query.searchValue);
  res.status(200).json({ searchResults: searchResults });
};

export const searchTvSeriesController = async (req, res) => {
  const searchResults = await getSearchFromTvSeries(req.query.searchValue);
  res.status(200).json({ searchResults: searchResults });
};

export const searchBookmarkController = async (req, res) => {
  const searchResults = await getSearchFromBookmark(
    req.query.searchValue,
    req.query.userId
  );
  res.status(200).json({ searchResults: searchResults });
};
