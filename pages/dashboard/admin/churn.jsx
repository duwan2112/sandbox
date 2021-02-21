import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from "../../../components/layout";
import { server } from "../../../utils";

const Container = styled.div`
  max-width: 35rem;
  margin-left: auto;
  margin-right: auto;
`;

// Style for campaign  item

const StyledCampaignItem = styled.div`
  &:not(:last-child) {
    margin-top: 3rem;
  }
`;

const Name = styled.h1`
  font-family: var(--quicksand);
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 4px;
`;

const Text = styled.p`
  font-family: var(--quicksand);
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 19px;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;

  p {
    &:not(:last-child) {
      margin-right: 6px;
      border-right: 1px solid var(--color-black);
      padding-right: 6px;
    }
  }
`;

function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
}

const getInfo = (user) => {
  const lastAmountPayed = user.payments[user.payments.length - 1].price;
  const months = user.payments.length;
  let totalAmount = 0;

  user.payments.forEach((payment) => {
    totalAmount += payment.price;
  });

  return { lastAmountPayed, months, totalAmount };
};

/**
 * Session Item
 */
const ChurnItem = ({ item, index, ...props }) => {
  const { website, user } = item;
  const date = formatDate(user.churn);
  const info = getInfo(user);

  return (
    <StyledCampaignItem>
      <div>
        <Name>
          {index < 10 ? `0${index + 1}` : index + 1}{" "}
          {website.basic.type.charAt(0).toUpperCase() +
            website.basic.type.slice(1)}{" "}
          {website.basic.bufeteName}
        </Name>
        <div className="d-flex align-items-center"></div>
      </div>
      <InfoBox>
        <Text>{date}</Text>
        <Text>{info.lastAmountPayed}</Text>
        <Text>
          {info.months > 1 ? `${info.months} Meses` : `${info.months} Mes`}
        </Text>
        <Text>{info.totalAmount}€</Text>
      </InfoBox>
    </StyledCampaignItem>
  );
};

const Churn = ({ data, churn }) => {
  const [filter, setFilter] = useState("");
  const [filteredArray, setFilteredArray] = useState(data);

  useEffect(() => {
    setFilteredArray(
      data.filter((data) => {
        return (
          data.website.basic.bufeteName
            .toLowerCase()
            .indexOf(filter.toLowerCase()) !== -1 ||
          data.website.basic.type
            .toLowerCase()
            .indexOf(filter.toLowerCase()) !== -1
        );
      })
    );
  }, [filter]);

  return (
    <>
      <Head>
        <title>Hifive | Panel de Administracion</title>
      </Head>
      <Layout>
        <Container className="container">
          <div className="mt-5">
            <h1 className="heading">
              Panel de
              <br />
              <strong>Administración</strong>
            </h1>
          </div>
          <div className="mt-2">
            <h1 className="heading" style={{ marginTop: "2rem" }}>
              Suscriptores de
              <br />
              <strong className="heading--blue">Abandono</strong>
            </h1>
            <div className="text-center mb-2 mt-5">
              <Text>{churn.totalChurn} / Usuarios totales</Text>
            </div>
            <button className="btn btn-primary btn-block btn-bold">
              {churn.monthlyChurn} / Usuarios este mes
            </button>
          </div>
          <div>
            <input
              type="text"
              className="form-control mt-5 mb-5"
              placeholder="Buscar"
              value={filter}
              onChange={(evt) => setFilter(evt.target.value)}
            />
            <div className="d-flex flex-column-reverse">
              {filteredArray.map((item, index) => (
                <ChurnItem key={item.user._id} item={item} index={index} />
              ))}
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

Churn.getInitialProps = async (ctx) => {
  const { ok, data } = await server.getAsync("/admin/users/churn");

  const {
    ok: stats,
    data: { churn },
  } = await server.getAsync("/admin/stats/users");

  if (!ok || !stats) ctx.res.redirect("/dashboard");
  return { data, churn };
};

export default Churn;
