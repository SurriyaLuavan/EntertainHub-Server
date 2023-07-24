import { Schema, model } from "mongoose";

const baseShowSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    release_date: { type: Date, required: true },
    backdrop_path: { type: String, required: true },
    vote_average: { type: Number, required: true },
    genres: [
      {
        _id: false,
        name: { type: String, required: true },
        tmdb_id: { type: String, required: true },
      },
    ],
  },
  { timestamps: true, discriminatorKey: "media_type" }
);

const movieSchema = new Schema({
  lists: {
    trending: {
      status: {
        type: Boolean,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    },
    now_playing: {
      status: {
        type: Boolean,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    },
    popular: {
      status: {
        type: Boolean,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    },
    top_rated: {
      status: {
        type: Boolean,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    },
    upcoming: {
      status: {
        type: Boolean,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    },
  },
});

const tvSeriesSchema = new Schema({
  lists: {
    trending: {
      status: {
        type: Boolean,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    },
    airing_today: {
      status: {
        type: Boolean,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    },
    on_the_air: {
      status: {
        type: Boolean,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    },
    popular: {
      status: {
        type: Boolean,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    },
    top_rated: {
      status: {
        type: Boolean,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    },
  },
});

const Show = model("Show", baseShowSchema);

const Movie = Show.discriminator("Movie", movieSchema);
const TVSeries = Show.discriminator("TV Series", tvSeriesSchema);

export default { Show, Movie, TVSeries };
