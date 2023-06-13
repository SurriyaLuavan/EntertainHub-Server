const handleDataTransformation = (instance) => {
  const title = instance.title ?? instance.original_title ?? instance.name;
  let release_date = instance.release_date
    ? toDate(instance.release_date)
    : instance.first_air_date
    ? toDate(instance.first_air_date)
    : null;

  const validDate = Date.parse(release_date);
  if (isNaN(validDate) == true) {
    release_date = Date.now();
  }

  const backdrop_path = instance.backdrop_path
    ? instance.backdrop_path
    : instance.poster_path
    ? instance.poster_path
    : "N/A";

  const vote_average =
    instance.vote_average && instance.vote_average.toFixed(1);
  const genres = instance.genres.map((item) => {
    return { name: item.name, tmdb_id: item.id };
  });

  return {
    title,
    release_date,
    backdrop_path,
    vote_average,
    genres,
  };
};

const toDate = (date) => {
  const [year, month, day] = date.split("-");
  return new Date(year, month, day);
};

const toCertification = (rating, media_type) => {
  const [certificate_obj] = rating.filter((item) => item.iso_3166_1 === "CA");
  if (typeof certificate_obj === "undefined") {
    return "N/A";
  } else if (media_type === "movie") {
    console.log("IN TV", certificate_obj);
    const [release_date_obj] = certificate_obj.release_dates;
    return release_date_obj.certification || "N/A";
  } else {
    return certificate_obj.rating || "N/A";
  }
};

export default handleDataTransformation;
