import axios from "axios";
import models from "../../../../models/index.model.js";
import handleFetchAndTransform from "../../../../utils/handleFetchAndTransform.js";
import axiosOptions from "../../../../utils/axiosOption.js";

const fetchOnTheAirTV = async () => {
  try {
    const onTheAirShowsURL = `${process.env.TMDB_END_POINT}/tv/on_the_air`;

    const onTheAirShowsParams = {
      language: "en-CA",
      page: 1,
      api_key: process.env.MOVIE_DB_API_KEY,
    };

    const response = await axios.request(
      axiosOptions(onTheAirShowsURL, onTheAirShowsParams)
    );
    const onTheAirList = response.data.results;

    const onTheAirListUpdated = await handleFetchAndTransform(
      onTheAirList,
      "tv"
    );

    const emptyCheck = await models.showCollection.Show.findOne({});

    if (emptyCheck !== null) {
      await models.showCollection.TVSeries.updateMany(
        {},
        {
          $set: {
            "lists.on_the_air.status": false,
            "lists.on_the_air.order": -1,
          },
        }
      );
      const check = await models.showCollection.Show.findOne({});
    }

    for (const [index, item] of onTheAirListUpdated.entries()) {
      const showInstance = await models.showCollection.Show.findOne({
        title: item.title,
      }).exec();

      if (showInstance) {
        showInstance.lists.on_the_air.status = true;
        showInstance.lists.on_the_air.order = index;
        await showInstance.save();
      } else {
        const updatedItem = {
          ...item,
          lists: {
            on_the_air: { status: true, order: index },
            airing_today: { status: false, order: -1 },
            trending: { status: false, order: -1 },
            popular: { status: false, order: -1 },
            top_rated: { status: false, order: -1 },
          },
        };

        await models.showCollection.TVSeries.create(updatedItem);
      }
    }

    // onTheAirListUpdated.forEach(async (item, index) => {
    //   const showInstance = await models.showCollection.Show.findOne({
    //     title: item.title,
    //   }).exec();

    //   if (showInstance) {
    //     showInstance.lists.on_the_air.status = true;
    //     showInstance.lists.on_the_air.order = index;
    //     await showInstance.save();
    //   } else {
    //     const updatedItem = {
    //       ...item,
    //       lists: {
    //         on_the_air: { status: true, order: index },
    //         airing_today: { status: false, order: -1 },
    //         trending: { status: false, order: -1 },
    //         popular: { status: false, order: -1 },
    //         top_rated: { status: false, order: -1 },
    //       },
    //     };

    //     await models.showCollection.TVSeries.create(updatedItem);
    //   }
    // });

    return onTheAirListUpdated;
  } catch (error) {
    console.error(error);
  }
};

export default fetchOnTheAirTV;
