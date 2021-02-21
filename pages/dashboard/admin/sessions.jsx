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
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Date = styled.p`
  font-family: var(--quicksand);
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 19px;

  &:not(:last-child) {
    margin-right: 8px;
    border-right: 1px solid var(--color-black);
    padding-right: 10px;
  }
`;

function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
}

const SessionInfo = (props) => {
  const { data } = props;

  return (
    <div>
      <Name>
        {data.website.basic.type.charAt(0).toUpperCase() +
          data.website.basic.type.slice(1)}{" "}
        {data.website.basic.bufeteName}
      </Name>
      <Text>{data.website.basic.email}</Text>
      <a href={`/p/${data.website.url}`} className="btn-link">
        website
      </a>
      <div className="mb-5 mt-5">
        <Name>Cantidad de Abogados (Fotos)</Name>
        <Text className="ml-4 mt-2">
          {!data.session.photos ? "0" : data.session.photos}
        </Text>
      </div>
      <div className="mb-5">
        <Name>Cantidad de Abogados (Videos)</Name>
        <Text className="ml-4 mt-2">
          {!data.session.videos ? "0" : data.session.videos}
        </Text>
      </div>
      <div className="mb-5">
        <Name>
          Gastos de viaje:{" "}
          {!data.session.fees ? "Gratis" : data.session.fees + "€"}
        </Name>
      </div>
      <div className="mb-5">
        <Name>Dirección </Name>
        <Text className="ml-4 mt-2">{data.session.direction}</Text>
      </div>
      <div>
        <Name>Contacto Telefónico o Email</Name>
        <Text className="ml-4 mt-2">{data.session.contact}</Text>
      </div>
      <div className="mt-5 mb-5 text-center">
        <Name>Monto total: {data.session.amount} €</Name>
      </div>
    </div>
  );
};

/**
 * Session Item
 */
const SessionItem = (props) => {
  const { data, selectItem, index } = props;
  const { website, session } = data;

  const date = formatDate(session.createdAt.split("T")[0].replace(/-/g, "/"));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [checked, setChecked] = useState(session.done);

  const onHandleChange = async (evt) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const { ok, data } = await server.putAsync(
      `/admin/sessions/${session._id}`,
      {
        done: evt.target.checked,
      }
    );

    if (ok) {
      setChecked(data.done);
    } else {
      // Handle the error
    }

    setIsSubmitting(false);
  };

  return (
    <StyledCampaignItem>
      <div>
        <Name
          onClick={() => {
            selectItem({ website, session });
          }}
        >
          {index < 10 ? `0${index + 1}` : index + 1}{" "}
          {website.basic.type.charAt(0).toUpperCase() +
            website.basic.type.slice(1)}{" "}
          {website.basic.bufeteName}
        </Name>
        <div className="d-flex align-items-center">
          <Date>{date}</Date>
          <Date>{!session.photos ? "0" : session.photos} Fotos</Date>
          <Date>{!session.videos ? "0" : session.videos} Videos</Date>
        </div>
      </div>
      <input type="checkbox" checked={checked} onChange={onHandleChange} />
    </StyledCampaignItem>
  );
};

const PhotoSessions = ({ sessions, sessionsStats }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState("");
  const [filteredArray, setFilteredArray] = useState(sessions);

  const selectItem = (item) => {
    if (!item) {
      setSelectedItem(null);
      return;
    }
    setSelectedItem(item);
  };

  useEffect(() => {
    setFilteredArray(
      sessions.filter((data) => {
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
              Sesiones de
              <br />
              <strong className="heading--blue">Fotos y Videos</strong>
            </h1>
            <div className="text-center mb-2 mt-5">
              <Text>{sessionsStats.totalIncome}€ / Total</Text>
            </div>
            <a href="#" className="btn btn-primary btn-block btn-bold">
              {sessionsStats.monthlyIncome} € / Este mes
            </a>
          </div>
          <div>
            {!selectedItem ? (
              <>
                <div className="form-group mt-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar"
                    value={filter}
                    onChange={(evt) => setFilter(evt.target.value)}
                  />
                </div>
                <div className="d-flex flex-column-reverse mb-5">
                  {filteredArray.map((data, index) => (
                    <SessionItem
                      selectItem={selectItem}
                      key={data.session._id}
                      data={data}
                      index={index}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="text-center mt-3 mb-3">
                  <a
                    role="button"
                    className="btn-link"
                    onClick={() => selectItem(null)}
                  >
                    volver
                  </a>
                </div>
                <SessionInfo data={selectedItem} />
              </>
            )}
          </div>
        </Container>
      </Layout>
    </>
  );
};

PhotoSessions.getInitialProps = async (ctx) => {
  const { ok, data: sessions } = await server.getAsync("/admin/sessions");

  const { ok: stats, data: sessionsStats } = await server.getAsync(
    "/admin/stats/sessions"
  );

  if (!ok || !stats) ctx.res.redirect("/dashboard/admin");
  return { sessions, sessionsStats };
};

export default PhotoSessions;
