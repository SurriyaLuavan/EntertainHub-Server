import axios from "axios";
import models from "../../../../models/index.model.js";
import handleFetchAndTransform from "../../../../utils/handleFetchAndTransform.js";
import axiosOptions from "../../../../utils/axiosOption.js";

const fetchTopRatedMovies = async () => {
  try {
    const TopRatedShowsURL = `${process.env.TMDB_END_POINT}/movie/top_rated`;
    const TopRatedShowsParams = {
      language: "en-CA",
      page: 1,
      api_key: process.env.MOVIE_DB_API_KEY,
    };
    const response = await axios.request(
      axiosOptions(TopRatedShowsURL, TopRatedShowsParams)
    );
    const TopRatedList = response.data.results;

    const TopRatedListUpdated = await handleFetchAndTransform(
      TopRatedList,
      "movie"
    );

    const emptyCheck = await models.showCollection.Show.findOne({});

    if (emptyCheck !== null) {
      await models.showCollection.Movie.updateMany(
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

    for (const [index, item] of TopRatedListUpdated.entries()) {
      const showInstance = await models.showCollection.Show.findOne({
        title: item.title,
      }).exec();

      if (showInstance) {
        showInstance.lists.top_rated.status = true;
        showInstance.lists.top_rated.order = index;
        await showInstance.save();
      } else {
        console.log(item.title);

        const updatedItem = {
          ...item,
          lists: {
            top_rated: { status: true, order: index },
            popular: { status: false, order: -1 },
            now_playing: { status: false, order: -1 },
            trending: { status: false, order: -1 },
            upcoming: { status: false, order: -1 },
          },
        };

        await models.showCollection.Movie.create(updatedItem);
      }
    }

    // TopRatedListUpdated.forEach(async (item, index) => {
    //   const showInstance = await models.showCollection.Show.findOne({
    //     title: item.title,
    //   }).exec();

    //   if (showInstance) {
    //     showInstance.lists.top_rated.status = true;
    //     showInstance.lists.top_rated.order = index;
    //     await showInstance.save();
    //   } else {
    //     console.log(item.title);

    //     const updatedItem = {
    //       ...item,
    //       lists: {
    //         top_rated: { status: true, order: index },
    //         popular: { status: false, order: -1 },
    //         now_playing: { status: false, order: -1 },
    //         trending: { status: false, order: -1 },
    //         upcoming: { status: false, order: -1 },
    //       },
    //     };

    //     await models.showCollection.Movie.create(updatedItem);
    //   }
    // });

    return TopRatedListUpdated;
  } catch (error) {
    console.error(error);
  }
};

export default fetchTopRatedMovies;
