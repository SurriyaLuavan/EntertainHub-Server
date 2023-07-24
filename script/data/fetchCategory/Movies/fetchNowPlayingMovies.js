import axios from "axios";
import models from "../../../../models/index.model.js";
import handleFetchAndTransform from "../../../../utils/handleFetchAndTransform.js";
import axiosOptions from "../../../../utils/axiosOption.js";

const fetchNowPlayingMovies = async () => {
  try {
    const nowPlayingShowsURL = `${process.env.TMDB_END_POINT}/movie/now_playing`;
    const nowPlayingShowsParams = {
      language: "en-CA",
      page: 1,
      api_key: process.env.MOVIE_DB_API_KEY,
    };
    const response = await axios.request(
      axiosOptions(nowPlayingShowsURL, nowPlayingShowsParams)
    );
    const nowPlayingList = response.data.results;

    let nowPlayingListUpdated = await handleFetchAndTransform(
      nowPlayingList,
      "movie"
    );

    const emptyCheck = await models.showCollection.Show.findOne({});

    if (emptyCheck !== null) {
      await models.showCollection.Movie.updateMany(
        {},
        {
          $set: {
            "lists.now_playing.status": false,
            "lists.now_playing.order": -1,
          },
        }
      );
      const check = await models.showCollection.Show.findOne({});
    }

    for (const [index, item] of nowPlayingListUpdated.entries()) {
      const showInstance = await models.showCollection.Show.findOne({
        title: item.title,
      }).exec();

      if (showInstance) {
        showInstance.lists.now_playing.status = true;
        showInstance.lists.now_playing.order = index;
        await showInstance.save();
      } else {
        const updatedItem = {
          ...item,
          lists: {
            now_playing: { status: true, order: index },
            trending: { status: false, order: -1 },
            popular: { status: false, order: -1 },
            top_rated: { status: false, order: -1 },
            upcoming: { status: false, order: -1 },
          },
        };

        await models.showCollection.Movie.create(updatedItem);
      }
    }

    return nowPlayingListUpdated;
  } catch (error) {
    console.error(error);
  }
};

export default fetchNowPlayingMovies;
