import axios from "axios";

export default function petitions_get(key, value) {
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

  var authorizationBasic = window.btoa(
    "e7e4640803689f36a041f55895b76d54" + ":" + ""
  );
  console.log(authorizationBasic);
  var config = {
    headers: {
      Authorization: "Basic " + authorizationBasic,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, PUT, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    },
  };

  return axios.get(url, config);
}
