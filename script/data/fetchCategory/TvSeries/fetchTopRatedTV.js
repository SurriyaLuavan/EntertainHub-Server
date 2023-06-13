import axios from "axios";
import models from "../../../../models/index.model.js";
import handleFetchAndTransform from "../../../../utils/handleFetchAndTransform.js";
import axiosOptions from "../../../../utils/axiosOption.js";

const fetchTopRatedTV = async () => {
  try {
    const topRatedShowsURL = `${process.env.TMDB_END_POINT}/tv/top_rated`;

    const topRatedShowsParams = {
      language: "en-CA",
      page: 1,
      api_key: process.env.MOVIE_DB_API_KEY,
    };

    const response = await axios.request(
      axiosOptions(topRatedShowsURL, topRatedShowsParams)
    );
    const topRatedList = response.data.results;

    const topRatedListUpdated = await handleFetchAndTransform(
      topRatedList,
      "tv"
    );

    const emptyCheck = await models.showCollection.Show.findOne({});

    if (emptyCheck !== null) {
      await models.showCollection.TVSeries.updateMany(
        {},
        {
          $set: {
            "lists.top_rated.status": false,
            "lists.top_rated.order": -1,
          },
        }
      );
      const check = await models.showCollection.Show.findOne({});
    }

    for (const [index, item] of topRatedListUpdated.entries()) {
      const showInstance = await models.showCollection.Show.findOne({
        title: item.title,
      }).exec();

      if (showInstance) {
        showInstance.lists.top_rated.status = true;
        showInstance.lists.top_rated.order = index;
        await showInstance.save();
      } else {
        const updatedItem = {
          ...item,
          lists: {
            top_rated: { status: true, order: index },
            airing_today: { status: false, order: -1 },
            trending: { status: false, order: -1 },
            on_the_air: { status: false, order: -1 },
            popular: { status: false, order: -1 },
          },
        };

        await models.showCollection.TVSeries.create(updatedItem);
      }
    }

    // topRatedListUpdated.forEach(async (item, index) => {
    //   const showInstance = await models.showCollection.Show.findOne({
    //     title: item.title,
    //   }).exec();

    //   if (showInstance) {
    //     showInstance.lists.top_rated.status = true;
    //     showInstance.lists.top_rated.order = index;
    //     await showInstance.save();
    //   } else {
    //     const updatedItem = {
    //       ...item,
    //       lists: {
    //         top_rated: { status: true, order: index },
    //         airing_today: { status: false, order: -1 },
    //         trending: { status: false, order: -1 },
    //         on_the_air: { status: false, order: -1 },
    //         popular: { status: false, order: -1 },
    //       },
    //     };

    //     await models.showCollection.TVSeries.create(updatedItem);
    //   }
    // });

    return topRatedListUpdated;
  } catch (error) {
    console.error(error);
  }
};

export default fetchTopRatedTV;
