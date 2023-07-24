import axios from "axios";
import models from "../../../../models/index.model.js";
import handleFetchAndTransform from "../../../../utils/handleFetchAndTransform.js";
import axiosOptions from "../../../../utils/axiosOption.js";

const fetchPopularTV = async () => {
  try {
    const popularShowsURL = `${process.env.TMDB_END_POINT}/tv/popular`;

    const popularShowsParams = {
      language: "en-CA",
      page: 1,
      api_key: process.env.MOVIE_DB_API_KEY,
    };

    const response = await axios.request(
      axiosOptions(popularShowsURL, popularShowsParams)
    );
    const popularList = response.data.results;

    const popularListUpdated = await handleFetchAndTransform(popularList, "tv");

    const emptyCheck = await models.showCollection.Show.findOne({});

    if (emptyCheck !== null) {
      await models.showCollection.TVSeries.updateMany(
        {},
        {
          $set: {
            "lists.popular.status": false,
            "lists.popular.order": -1,
          },
        }
      );
      const check = await models.showCollection.Show.findOne({});
    }

    for (const [index, item] of popularListUpdated.entries()) {
      const showInstance = await models.showCollection.Show.findOne({
        title: item.title,
      }).exec();

      if (showInstance) {
        showInstance.lists.popular.status = true;
        showInstance.lists.popular.order = index;
        await showInstance.save();
      } else {
        const updatedItem = {
          ...item,
          lists: {
            popular: { status: true, order: index },
            airing_today: { status: false, order: -1 },
            trending: { status: false, order: -1 },
            on_the_air: { status: false, order: -1 },
            top_rated: { status: false, order: -1 },
          },
        };

        await models.showCollection.TVSeries.create(updatedItem);
      }
    }

    return popularListUpdated;
  } catch (error) {
    console.error(error);
  }
};

export default fetchPopularTV;
