const axiosOptions = (url, params) => {
  return {
    method: "GET",
    url: url,
    params: params,
  };
};

export default axiosOptions;
