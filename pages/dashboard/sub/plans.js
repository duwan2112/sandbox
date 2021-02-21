import {server} from "../../../utils";

export const init = async () => {
  const {data} = await server.getAsync("/data/cms");

  const {prices} = data;

  if (!prices) return;

  return [
    {
      name: "autonomo",
      price: prices.autonomo,
      img: "card-2.png",
    },
    {
      name: "asociados",
      price: prices.asociados,
      img: "card-1.png",
    },
    {
      name: "bufete",
      price: prices.bufete,
      img: "card-3.png",
    },
  ];
};

export const plans = [
  {
    name: "autonomo",
    price: 29.99,
    img: "card-2.png",
  },
  {
    name: "asociados",
    price: 49.99,
    img: "card-1.png",
  },
  {
    name: "bufete",
    price: 99.99,
    img: "card-3.png",
  },
];

const GhostComponent = () => {
  return <h1>Hello world</h1>;
};

export default GhostComponent;
