import axios from "axios";
import models from "../../../models/index.model.js";
import handleFetchAndTransform from "../../../utils/handleFetchAndTransform.js";
import axiosOptions from "../../../utils/axiosOption.js";

const fetchTrendingShows = async () => {
  try {
    const trendingShowsURL = `${process.env.TMDB_END_POINT}/trending/all/week`;
    const trendingShowsParams = {
      language: "en-CA",
      page: 1,
      api_key: process.env.MOVIE_DB_API_KEY,
    };
    const response = await axios.request(
      axiosOptions(trendingShowsURL, trendingShowsParams)
    );
    const trendingList = response.data.results;

    const trendingListUpdated = await handleFetchAndTransform(
      trendingList,
      "trending"
    );

    const emptyCheck = await models.showCollection.Show.findOne({});

    if (emptyCheck !== null) {
      await models.showCollection.Movie.updateMany(
        {},
        { $set: { "lists.trending.status": false, "lists.trending.order": -1 } }
      );

      await models.showCollection.TVSeries.updateMany(
        {},
        { $set: { "lists.trending.status": false, "lists.trending.order": -1 } }
      );
      const check = await models.showCollection.Show.findOne({});
    }

    for (const [index, item] of trendingListUpdated.entries()) {
      const showInstance = await models.showCollection.Show.findOne({
        title: item.title,
      }).exec();

      if (showInstance) {
        showInstance.lists.trending.status = true;
        showInstance.lists.trending.order = index;
        await showInstance.save();
      } else {
        switch (item.category) {
          case "movie":
            await models.showCollection.Movie.create({
              ...item,
              lists: {
                trending: { status: true, order: index },
                now_playing: { status: false, order: -1 },
                popular: { status: false, order: -1 },
                top_rated: { status: false, order: -1 },
                upcoming: { status: false, order: -1 },
              },
            });
            break;
          case "tv":
            await models.showCollection.TVSeries.create({
              ...item,
              lists: {
                trending: { status: true, order: index },
                airing_today: { status: false, order: -1 },
                on_the_air: { status: false, order: -1 },
                top_rated: { status: false, order: -1 },
                popular: { status: false, order: -1 },
              },
            });
            break;
        }
      }
    }

    return trendingListUpdated;
  } catch (error) {
    console.error(error);
  }
};

export default fetchTrendingShows;
