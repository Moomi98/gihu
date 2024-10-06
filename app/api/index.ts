import axios from "axios";
import _ from "lodash";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const get = (route: string, queryParams?: object) => {
  let url = baseUrl + route;
  if (queryParams) {
    url += "?";
    const queries = _.map(queryParams, (value, key) => `${key}=${value}`).join(
      "&"
    );

    url += queries;
  }

  return axios.get(url);
};

export const post = (route: string, body: string | object) => {
  return axios.post(baseUrl + route, body);
};
