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
    margin-top: 1.5rem;
  }
`;

const Name = styled.h1`
  font-family: var(--quicksand);
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
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
`;

function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
}

const CampaignInfo = (props) => {
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
        <Name>¿Cuales son tus áreas?</Name>
        <Text className="ml-4 mt-2">{data.campaign.areas}</Text>
      </div>
      <div className="mb-5">
        <Name>¿Donde quieres promocionarte?</Name>
        <Text className="ml-4 mt-2">{data.campaign.location}</Text>
      </div>
      <div>
        <Name>¿Cuanto quieres invertir?</Name>
        <Text className="ml-4 mt-2">{data.campaign.invest}€</Text>
      </div>
    </div>
  );
};

/**
 * Campaign Item
 */
const CampaignItem = (props) => {
  const { data, selectItem, index } = props;
  const { website, campaign } = data;
  const date = formatDate(campaign.createdAt.split("T")[0].replace(/-/g, "/"));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [checked, setChecked] = useState(campaign.done);

  const onHandleChange = async (evt) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const { ok, data } = await server.putAsync(
      `/admin/marketing/${campaign._id}`,
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
            selectItem({ website, campaign });
          }}
        >
          {index < 10 ? `0${index + 1}` : index + 1}{" "}
          {website.basic.type.charAt(0).toUpperCase() +
            website.basic.type.slice(1)}{" "}
          {website.basic.bufeteName}
        </Name>
        <Date>{date}</Date>
      </div>
      <input type="checkbox" checked={checked} onChange={onHandleChange} />
    </StyledCampaignItem>
  );
};

const Marketing = ({ campaigns, info }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState("");
  const [filteredArray, setFilteredArray] = useState(campaigns);

  const selectItem = (item) => {
    if (!item) {
      setSelectedItem(null);
      return;
    }
    setSelectedItem(item);
  };

  useEffect(() => {
    setFilteredArray(
      campaigns.filter((data) => {
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
              Campañas de
              <br />
              <strong className="rainbow">Marketing Digital</strong>
            </h1>
            <div className="text-center mb-2 mt-5">
              <Text>{info.totalSpent}€ / Ingreso total</Text>
            </div>
            <a href="#" className="btn btn-rainbow btn-block btn-bold">
              Aqui va el mensual
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
                <div className="d-flex flex-column-reverse">
                  {filteredArray.map((data, index) => (
                    <CampaignItem
                      selectItem={selectItem}
                      key={data.campaign._id}
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
                <CampaignInfo data={selectedItem} />
              </>
            )}
          </div>
        </Container>
      </Layout>
    </>
  );
};

Marketing.getInitialProps = async (ctx) => {
  const { ok, data: campaigns } = await server.getAsync("/admin/marketing");
  const { ok: okInfo, data: info } = await server.getAsync(
    "/admin/marketing/info"
  );

  if (!ok || !okInfo) ctx.res.redirect("/dashboard/admin");
  return { campaigns, info };
};

export default Marketing;
