import Head from "next/head";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { Alert } from "../../../components/contexts";
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
  align-items: center;
  justify-content: space-between;
  height: 45px;
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

const DeleteButton = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
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
  if (user.payments.length <= 0) {
    return null;
  }

  const lastAmountPayed = user.payments[user.payments.length - 1].price;
  const months = user.payments.length;
  let totalAmount = 0;

  user.payments.forEach((payment) => {
    totalAmount += payment.price;
  });

  return { lastAmountPayed, months, totalAmount: Math.round(totalAmount) };
};

/**
 * Session Item
 */
const NewUserItem = ({ item, index, ...props }) => {
  const { website, user } = item;
  const date = formatDate(user.createdAt);
  const info = getInfo(user);

  const { deleteItem, selectDelItem, handleDelete } = props;

  return (
    <StyledCampaignItem>
      <div>
        {!deleteItem || deleteItem.user._id != item.user._id ? (
          <div>
            {website.isCompleted ? (
              <Name>
                {index < 10 ? `0${index + 1}` : index + 1}{" "}
                {website.basic.type.charAt(0).toUpperCase() +
                  website.basic.type.slice(1)}{" "}
                {website.basic.bufeteName}
              </Name>
            ) : (
              <Name>
                {index < 10 ? `0${index + 1}` : index + 1} {user.email}
              </Name>
            )}
            {info ? (
              <InfoBox>
                <Text>{date}</Text>
                <Text>{info.lastAmountPayed}</Text>
                <Text>
                  {info.months > 1
                    ? `${info.months} Meses`
                    : `${info.months} Mes`}
                </Text>
                <Text>{info.totalAmount}€</Text>
              </InfoBox>
            ) : (
              <InfoBox>
                <Text>{date}</Text>
                <Text>0</Text>
                <Text>0 Meses</Text>
                <Text>0 €</Text>
              </InfoBox>
            )}
          </div>
        ) : (
          <>
            <a
              role="btn"
              className="btn-link btn-link--danger"
              style={{ marginLeft: "12rem" }}
              onClick={() => handleDelete()}
            >
              Eliminar
            </a>
          </>
        )}
      </div>
      <DeleteButton>
        {!deleteItem || deleteItem.user._id != item.user._id ? (
          <img
            src={require("../../../public/static/trash-png.png")}
            alt=""
            onClick={() => selectDelItem(item)}
          />
        ) : (
          <img
            src={require("../../../public/static/delete-btn.png")}
            alt=""
            onClick={() => selectDelItem(null)}
          />
        )}
      </DeleteButton>
    </StyledCampaignItem>
  );
};

const NewUsers = ({ data, user }) => {
  const { setToast } = useContext(Alert.AlertContext);

  const [filter, setFilter] = useState("");
  const [filteredArray, setFilteredArray] = useState(data);
  const [deleteItem, setDeleteItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectDelItem = (item) => {
    setDeleteItem(item);
  };

  const handleDelete = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    const { ok, data: msg } = await server.deleteAsync(
      `/admin/users/${deleteItem.user._id}`
    );

    if (ok) {
      setToast(msg, "success").then(() => {
        setFilteredArray(
          data.filter((item) => item.user._id != deleteItem.user._id)
        );
        setDeleteItem(null);
      });
    } else {
      setToast(msg);
    }

    setLoading(false);
  };

  useEffect(() => {
    setFilteredArray(
      data.filter((data) => {
        if (data.website.isCompleted) {
          return (
            data.website.basic.bufeteName
              .toLowerCase()
              .indexOf(filter.toLowerCase()) !== -1 ||
            data.website.basic.type
              .toLowerCase()
              .indexOf(filter.toLowerCase()) !== -1
          );
        } else {
          return (
            data.user.email.toLowerCase().indexOf(filter.toLowerCase()) !== -1
          );
        }
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
              Nuevos
              <br />
              <strong className="heading--blue">Usuarios</strong>
            </h1>
            <div className="text-center mb-2 mt-5">
              <Text>{user.totalUser} / Usuarios totales</Text>
            </div>
            <button
              role="button"
              className="btn btn-primary btn-block btn-bold"
            >
              {user.monthlyUser} / Usuarios este mes
            </button>
          </div>
          <div className="mb-5">
            <input
              type="text"
              className="form-control mt-5 mb-5"
              placeholder="Buscar"
              value={filter}
              onChange={(evt) => setFilter(evt.target.value)}
            />

            <div className="d-flex flex-column-reverse">
              {filteredArray.map((item, index) => (
                <NewUserItem
                  key={item.user._id}
                  item={item}
                  index={index}
                  deleteItem={deleteItem}
                  selectDelItem={selectDelItem}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

NewUsers.getInitialProps = async (ctx) => {
  const { ok, data } = await server.getAsync("/admin/users/");

  const {
    ok: stats,
    data: { user },
  } = await server.getAsync("/admin/stats/users");

  if (!ok || !stats) ctx.res.redirect("/dashboard");

  return { data, user };
};

export default NewUsers;
