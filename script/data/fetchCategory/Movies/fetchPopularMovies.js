import axios from "axios";
import models from "../../../../models/index.model.js";
import handleFetchAndTransform from "../../../../utils/handleFetchAndTransform.js";
import axiosOptions from "../../../../utils/axiosOption.js";

const fetchPopularMovies = async () => {
  try {
    const PopularShowsURL = `${process.env.TMDB_END_POINT}/movie/popular`;
    const PopularShowsParams = {
      language: "en-CA",
      page: 1,
      api_key: process.env.MOVIE_DB_API_KEY,
    };
    const response = await axios.request(
      axiosOptions(PopularShowsURL, PopularShowsParams)
    );
    const PopularList = response.data.results;

    const PopularListUpdated = await handleFetchAndTransform(
      PopularList,
      "movie"
    );

    const emptyCheck = await models.showCollection.Show.findOne({});

    if (emptyCheck !== null) {
      await models.showCollection.Movie.updateMany(
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

    for (const [index, item] of PopularListUpdated.entries()) {
      const showInstance = await models.showCollection.Show.findOne({
        title: item.title,
      }).exec();

      if (showInstance) {
        showInstance.lists.popular.status = true;
        showInstance.lists.popular.order = index;
        await showInstance.save();
      } else {
        console.log(item.title);

        const updatedItem = {
          ...item,
          lists: {
            popular: { status: true, order: index },
            now_playing: { status: false, order: -1 },
            trending: { status: false, order: -1 },
            top_rated: { status: false, order: -1 },
            upcoming: { status: false, order: -1 },
          },
        };

        await models.showCollection.Movie.create(updatedItem);
      }
    }

    // PopularListUpdated.forEach(async (item, index) => {
    //   const showInstance = await models.showCollection.Show.findOne({
    //     title: item.title,
    //   }).exec();

    //   if (showInstance) {
    //     showInstance.lists.popular.status = true;
    //     showInstance.lists.popular.order = index;
    //     await showInstance.save();
    //   } else {
    //     console.log(item.title);

    //     const updatedItem = {
    //       ...item,
    //       lists: {
    //         popular: { status: true, order: index },
    //         now_playing: { status: false, order: -1 },
    //         trending: { status: false, order: -1 },
    //         top_rated: { status: false, order: -1 },
    //         upcoming: { status: false, order: -1 },
    //       },
    //     };
    //     await models.showCollection.Movie.create(updatedItem);
    //   }
    // });

    return PopularListUpdated;
  } catch (error) {
    console.error(error);
  }
};

export default fetchPopularMovies;
