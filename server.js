import express from "express";
import "dotenv/config";
import cors from "cors";
import { RateLimit } from "async-sema";
import { connectDb } from "./models/index.model.js";

import collectionRouter from "./routes/collection.route.js";
import userRouter from "./routes/user.route.js";

// import fetchTrendingShows from "./script/data/fetchCategory/fetchTrendingShows.js";
// import fetchNowPlayingMovies from "./script/data/fetchCategory/Movies/fetchNowPlayingMovies.js";
// import fetchPopularMovies from "./script/data/fetchCategory/Movies/fetchPopularMovies.js";
// import fetchTopRatedMovies from "./script/data/fetchCategory/Movies/fetchTopRatedMovies.js";
// import fetchOnTheAirTV from "./script/data/fetchCategory/TvSeries/fetchOnTheAirTV.js";
// import fetchPopularTV from "./script/data/fetchCategory/TvSeries/fetchPopularTV.js";
// import fetchTopRatedTV from "./script/data/fetchCategory/TvSeries/fetchTopRatedTV.js";
// import fetchGenreMovies from "./script/data/fetchGenre/fetchGenreMovies.js";
// import fetchGenreTvSeries from "./script/data/fetchGenre/fetchGenreTvSeries.js";
// import {
//   movieGenreList,
//   tvGenreList,
// } from "./script/data/fetchGenre/getGenresList.js";

const app = express();
const limit = RateLimit(5);
const port = process.env.PORT || 5000;

// const fetchAndStorePipeLine = async () => {
//   await limit();
//   for (const item of movieGenreList) {
//     await fetchGenreMovies(item.id);
//   }
//   for (const item of tvGenreList) {
//     await fetchGenreTvSeries(item.id);
//   }
//   await fetchTrendingShows();
//   await fetchNowPlayingMovies();
//   await fetchPopularMovies();
//   await fetchTopRatedMovies();
//   await fetchOnTheAirTV();
//   await fetchPopularTV();
//   await fetchTopRatedTV();
//   console.log("Completed");
// };
// fetchAndStorePipeLine();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://entertain-hub-ebon.vercel.app",
  })
);

app.use("/api", collectionRouter);
app.use("/users", userRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening to port: ${port}`);
    });
  })
  .catch((err) => console.error(err));
