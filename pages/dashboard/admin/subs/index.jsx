import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import Layout from "../../../../components/layout";
import { server } from "../../../../utils";
import { Alert } from "../../../../components/contexts";
import FormGroup from "../../../../components/blocks/dashboard/forms/FormGroup";
import { Formik, Form } from "formik";
import * as yup from "yup";

/*STYLES */
const Container = styled.div`
  max-width: 35rem;
  margin-left: auto;
  margin-right: auto;
`;

// Style for campaign  item

const StyledUserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
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

const ButtonsContainer = styled.div`
  a {
    &:not(:last-child) {
      margin-right: 6px;
      border-right: 1px solid var(--color-primary);
      padding-right: 6px;
    }
  }
  label {
    &:not(:last-child) {
      margin-right: 6px;
      border-right: 1px solid var(--color-primary);
      padding-right: 6px;
    }
  }
`;

/* END STYLES */

/**
 *
 * Functions for formating
 */
function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
}

function getInfo(user) {
  const lastAmountPayed = user.payments[user.payments.length - 1].price;
  const months = user.payments.length;
  let totalAmount = 0;

  user.payments.forEach((payment) => {
    totalAmount += payment.price;
  });

  return { lastAmountPayed, months, totalAmount: Math.round(totalAmount) };
}

/**
 *
 * USER INFO ITEM
 */

const validationSchema = yup.object({
  video: yup
    .string()
    .url("El link no es valido")
    .required("Este campo es requerido"),
});

const UserInfo = (props) => {
  const debug = false;

  const {
    data,
    deleteLawyer,
    setDeleteLawyer,
    handleDeleteLawyer,
    onImageChange,
    openVideoForm,
    selectVideoForm,
    onFormSubmit,
  } = props;

  return (
    <>
      <div>
        <Name>
          {data.website.basic.type.charAt(0).toUpperCase() +
            data.website.basic.type.slice(1)}{" "}
          {data.website.basic.bufeteName}
        </Name>
        <Text>{data.website.basic.email}</Text>
        <ButtonsContainer>
          <a href={`/p/${data.website.url}`} className="btn-link">
            Website
          </a>

          <label htmlFor="logoupdate" className="btn-link">
            Subir Logo
            <input
              type="file"
              className="d-none"
              id="logoupdate"
              onChange={onImageChange}
            />
          </label>

          <label htmlFor="teamupdate" className="btn-link">
            Subir Foto Equipo
            <input
              type="file"
              className="d-none"
              id="teamupdate"
              onChange={onImageChange}
            />
          </label>
        </ButtonsContainer>
        <h3 className="mt-5 mb-5">Abogados</h3>
        {data.website.lawyers.map((lawyer, index) => (
          <>
            <div
              key={lawyer.id}
              className="d-flex justify-content-between align-items-center mb-5"
              style={{ height: "40px" }}
            >
              {!deleteLawyer || deleteLawyer.id != lawyer.id ? (
                <div>
                  <h4>{lawyer.fullName}</h4>
                  <ButtonsContainer>
                    <label htmlFor={`${lawyer.id}`} className="btn-link">
                      Subir Foto
                      <input
                        type="file"
                        className="d-none"
                        id={`${lawyer.id}`}
                        onChange={onImageChange}
                      />
                    </label>
                    <a
                      role="button"
                      className="btn-link"
                      onClick={() => selectVideoForm(lawyer.id)}
                    >
                      Video
                    </a>
                  </ButtonsContainer>
                </div>
              ) : (
                <>
                  <a
                    role="btn"
                    className="btn-link btn-link--danger"
                    style={{ marginLeft: "12rem" }}
                    onClick={() => handleDeleteLawyer()}
                  >
                    Eliminar
                  </a>
                </>
              )}

              <DeleteButton>
                {!deleteLawyer || deleteLawyer.id != lawyer.id ? (
                  <img
                    src={require("../../../../public/static/trash-png.png")}
                    alt=""
                    onClick={() => setDeleteLawyer(lawyer)}
                  />
                ) : (
                  <img
                    src={require("../../../../public/static/delete-btn.png")}
                    alt=""
                    onClick={() => setDeleteLawyer(null)}
                  />
                )}
              </DeleteButton>
            </div>
            {openVideoForm && openVideoForm == lawyer.id && (
              <Formik
                initialValues={{ video: "" }}
                validationSchema={validationSchema}
                onSubmit={onFormSubmit}
              >
                {({ values }) => (
                  <Form>
                    <FormGroup
                      fieldData={{
                        label: "Video",
                        placeholder: "https://youtube.com",
                      }}
                      name="video"
                      type="text"
                    />
                    {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
                    <button type="submit" className="btn btn-link btn-block">
                      Guardar
                    </button>
                  </Form>
                )}
              </Formik>
            )}
          </>
        ))}
      </div>
    </>
  );
};

/**
 * User Item
 */
const UserItem = ({ data, selectItem, index, ...props }) => {
  const { user, website } = data;

  const date = formatDate(
    user.payments[user.payments.length - 1].charge_date
      .split("T")[0]
      .replace(/-/g, "/")
  );

  const { deleteItem, handleDelete, selectDelItem } = props;

  const info = getInfo(user);

  return (
    <StyledUserItem>
      {!deleteItem || deleteItem.user._id != data.user._id ? (
        <div>
          <div>
            <Name
              onClick={() => {
                selectItem({ user, website });
              }}
            >
              {index < 10 ? `0${index + 1}` : index + 1}{" "}
              {website.basic.type.charAt(0).toUpperCase() +
                website.basic.type.slice(1)}{" "}
              {website.basic.bufeteName}
            </Name>
          </div>
          <InfoBox>
            <Text>{date}</Text>
            <Text>{info.lastAmountPayed}</Text>
            <Text>
              {info.months > 1 ? `${info.months} Meses` : `${info.months} Mes`}
            </Text>
            <Text>{info.totalAmount}€</Text>
          </InfoBox>
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

      <DeleteButton>
        {!deleteItem || deleteItem.user._id != data.user._id ? (
          <img
            src={require("../../../../public/static/trash-png.png")}
            alt=""
            onClick={() => selectDelItem(data)}
          />
        ) : (
          <img
            src={require("../../../../public/static/delete-btn.png")}
            alt=""
            onClick={() => selectDelItem(null)}
          />
        )}
      </DeleteButton>
    </StyledUserItem>
  );
};

const Subs = ({ data, subs }) => {
  const { setToast } = useContext(Alert.AlertContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState("");
  const [filteredArray, setFilteredArray] = useState(data);
  const [deleteItem, setDeleteItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLawyer, setDeleteLawyer] = useState(null);
  const [openVideoForm, setOpenVideoForm] = useState(false);

  /**
   *
   * SELECTS
   */
  const selectDelItem = (item) => {
    setDeleteItem(item);
  };

  const selectItem = (item) => {
    if (!item) {
      setSelectedItem(null);
      return;
    }
    setSelectedItem(item);
  };

  const selectVideoForm = (id) => {
    if (openVideoForm == id) setOpenVideoForm(null);
    else {
      setOpenVideoForm(id);
    }
  };

  /**
   * FORM SUBMIT
   *
   */

  const onFormSubmit = async (values) => {
    if (loading) return;

    setLoading(true);

    const lawyerIndex = selectedItem.website.lawyers.findIndex(
      (lawyer) => lawyer.id == openVideoForm
    );
    let newLawyers = [...selectedItem.website.lawyers];
    newLawyers[lawyerIndex] = {
      ...newLawyers[lawyerIndex],
      video: values.video,
    };

    const { ok } = await server.putAsync(
      `/users/website/${selectedItem.user._id}`,
      {
        lawyers: newLawyers,
      }
    );

    if (ok) setToast("Se ha guardado correctamente el video", "success");
    else setToast("Error al guardar el video");

    setSelectedItem({
      user: selectedItem.user,
      website: { ...selectedItem.website, lawyers: newLawyers },
    });

    setLoading(false);
    setOpenVideoForm(null);
  };

  /**
   *
   * Image Change
   */
  const onImageChange = async (e) => {
    if (loading) return;

    setLoading(true);

    const inputId = e.target.id;

    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "hifive");
    const res = await fetch(process.env.CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });
    const file = await res.json();
    if (file && selectedItem) {
      if (inputId == "logoupdate") {
        const { ok } = await server.putAsync(
          `/users/website/${selectedItem.user._id}`,
          {
            basic: {
              ...selectedItem.website.basic,
              logo: {
                ...selectedItem.website.basic.logo,
                image: file.secure_url,
              },
            },
          }
        );

        setSelectedItem({
          user: selectedItem.user,
          website: {
            ...selectedItem.website,
            basic: {
              ...selectedItem.website.basic,
              logo: {
                ...selectedItem.website.basic.logo,
                image: file.secure_url,
              },
            },
          },
        });

        if (ok) setToast("Se ha subido la imagen con exito", "success");
        else setToast("Error al subir la imagen");
      } else if (inputId == "teamupdate") {
        const { ok } = await server.putAsync(
          `/users/website/${selectedItem.user._id}`,
          {
            aboutUs: {
              ...selectedItem.website.aboutUs,
              imageTeam: file.secure_url,
            },
          }
        );

        setSelectedItem({
          user: selectedItem.user,
          website: {
            ...selectedItem.website,
            aboutUs: {
              ...selectedItem.website.aboutUs,
              imageTeam: file.secure_url,
            },
          },
        });

        if (ok) setToast("Se ha subido la imagen con exito", "success");
        else setToast("Error al subir la imagen");
      } else {
        const lawyerIndex = selectedItem.website.lawyers.findIndex(
          (lawyer) => lawyer.id == inputId
        );

        let newLawyers = [...selectedItem.website.lawyers];
        newLawyers[lawyerIndex] = {
          ...newLawyers[lawyerIndex],
          image: file.secure_url,
        };

        const { ok } = await server.putAsync(
          `/users/website/${selectedItem.user._id}`,
          {
            lawyers: newLawyers,
          }
        );

        setSelectedItem({
          user: selectedItem.user,
          website: { ...selectedItem.website, lawyers: newLawyers },
        });

        if (ok) setToast("Se ha subido la imagen con exito", "success");
        else setToast("Error al subir la imagen");
      }
    }

    setLoading(false);
  };

  /**
   * HANDLING DELTING A LAWYER
   */
  const handleDeleteLawyer = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    const { ok, data: msg } = await server.deleteAsync(
      `/admin/users/lawyer/${selectedItem.user._id}/${deleteLawyer.id}`
    );
    if (ok) {
      setToast(msg, "success").then(async () => {
        const newLawyers = selectedItem.website.lawyers.filter(
          (lawyer) => lawyer.id != deleteLawyer.id
        );

        setSelectedItem({
          website: { ...selectedItem.website, lawyers: newLawyers },
          user: selectedItem.user,
        });

        const { data } = await server.getAsync("/admin/users/subs");

        setFilteredArray(data);
        setDeleteLawyer(null);
      });
    } else {
      setToast(msg);
    }

    setLoading(false);
  };

  /**
   * HANDLING DELETING AN USER
   */
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

  /**
   * FILTERING ARRAY USE EFFECT
   */
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
              Suscriptores
              <br />
              <strong className="heading--grey">Totales</strong>
            </h1>
            <div className="text-center mb-2 mt-5">
              <Text>{Math.round(subs.totalIncome)} € / Ingreso total</Text>
            </div>
            <a href="#" className="btn btn-black btn-block btn-bold">
              {Math.round(subs.monthlyIncome)} € / Ingreso este mes
            </a>
          </div>
          <div>
            {!selectedItem ? (
              <>
                <input
                  type="text"
                  className="form-control mt-5 mb-5"
                  placeholder="Buscar"
                  value={filter}
                  onChange={(evt) => setFilter(evt.target.value)}
                />
                <div className="d-flex flex-column-reverse">
                  {filteredArray.map((foo, index) => (
                    <UserItem
                      key={foo.user._id}
                      data={foo}
                      selectItem={selectItem}
                      index={index}
                      deleteItem={deleteItem}
                      selectDelItem={selectDelItem}
                      handleDelete={handleDelete}
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
                <UserInfo
                  data={selectedItem}
                  deleteLawyer={deleteLawyer}
                  setDeleteLawyer={setDeleteLawyer}
                  handleDeleteLawyer={handleDeleteLawyer}
                  onImageChange={onImageChange}
                  openVideoForm={openVideoForm}
                  selectVideoForm={selectVideoForm}
                  onFormSubmit={onFormSubmit}
                />
                <Link
                  href={{
                    pathname: "/dashboard/admin/manage",
                    query: { userid: selectedItem.user._id },
                  }}
                >
                  <a className="btn btn-block btn-gradient-primary mt-5 mb-5">
                    Editar Web
                  </a>
                </Link>
              </>
            )}
          </div>
        </Container>
      </Layout>
    </>
  );
};

Subs.getInitialProps = async (ctx) => {
  const { ok, data } = await server.getAsync("/admin/users/subs");

  const {
    ok: stats,
    data: { subs },
  } = await server.getAsync("/admin/stats/users");

  if (!ok || !stats) ctx.res.redirect("/dashboard");

  return {
    data,
    subs,
  };
};

export default Subs;
