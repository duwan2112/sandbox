import axios from "axios";

export default function petitions_post(key, value) {
  let url;
  let data;
  switch (key) {
    case "createAfiliate":
      url = "https://api.getrewardful.com/v1/affiliates";
      data = value;
      break;
    default:
      console.log("send");
      break;
  }
  var config = {
    headers: {
      Authorization: "Basic ZTdlNDY0MDgwMzY4OWYzNmEwNDFmNTU4OTViNzZkNTQ6",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  return axios.post(url, data, config);
}
