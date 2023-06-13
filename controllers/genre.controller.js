import {
  getMovieGenreListCollection,
  getMovieGenreCollection,
  getTvSeriesGenreCollection,
  getTvSeriesGenreListCollection,
} from "../services/genre.services.js";

export const movieGenreController = async (req, res) => {
  const { movieCollection, title } = await getMovieGenreCollection(
    req.params.genreId
  );
  res.status(200).json({ currentGenreMovies: movieCollection, title });
};

export const tvSeriesGenreController = async (req, res) => {
  const { tvSeriesCollection, title } = await getTvSeriesGenreCollection(
    req.params.genreId
  );
  res.status(200).json({ currentGenreTVSeries: tvSeriesCollection, title });
};

export const moviesGenreListController = async (req, res) => {
  const genreCollection = await getMovieGenreListCollection();
  res.status(200).json({ genres: genreCollection });
};

export const tvSeriesGenreListController = async (req, res) => {
  const genreCollection = await getTvSeriesGenreListCollection();
  res.status(200).json({ genres: genreCollection });
};
