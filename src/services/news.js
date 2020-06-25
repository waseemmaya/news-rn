import axios from "axios";
import api from "../utils/api";

export const getNewsService = () => axios.get(api);

export const postNewsService = (newsObj) =>
  axios.post(api, {
    newsObj,
  });
