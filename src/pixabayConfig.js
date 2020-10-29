const API_URL = "https://pixabay.com/api/";
const API_KEY = "13417145-d0c367819415b077de5e950e3";
export const PER_PAGE = 21;
const IMAGE_TYPE = "photo";

export const getUrl = (keyWord, page) =>
  `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(
    keyWord
  )}&image_type=${IMAGE_TYPE}&per_page=${PER_PAGE}&page=${page}`;
