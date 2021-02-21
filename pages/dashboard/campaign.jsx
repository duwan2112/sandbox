import styled from "styled-components";
import Router from "next/router";
import Head from "next/head";
import Layout from "../../components/layout";
import {useState, useEffect, useContext} from "react";
import Link from "next/link";
import {putAsync, getAsync} from "../../utils/server";
import {Alert, User} from "../../components/contexts";
import {Formik, Form} from "formik";
import * as yup from "yup";
import FormGroup from "../../components/blocks/dashboard/forms/FormGroup";

const fieldsData = {
  direction: {
    label: "Dirección web de tu despacho",
    placeholder: "www.nombredespacho.hfma.es",
  },
  areas: {
    label: "¿Cuáles son tus áreas?",
    placeholder: "Divorcios, herencias, despidos",
  },
  location: {
    label: "¿Dónde quieres anunciarte?",
    placeholder: "Madrid, Barcelona",
  },
  money: {
    label: "¿Cuánto quieres invertir mensualmente?",
    placeholder: "100€",
  },
};

const fieldsData2 = {
  title: {
    label: "Título SEO",
    placeholder: "Abogados de Familia Madrid",
  },
  description: {
    label: "Descripción SEO",
    placeholder:
      "25 años defendiendo los intereses de las familias. Abogados especializados en familia. Solicita tu consulta sin compromiso. Trato personalizado. Financiación sin coste.",
  },
};
const validationSchema = yup.object({
  direction: yup.string().required("Este campo es requerido"),
  areas: yup.string().required("Este campo es requerido"),
  location: yup.string().required("Este campo es requerido"),
  money: yup.string().required("Este campo es requerido"),
});

const validationSchema2 = yup.object({
  title: yup
    .string()
    .max(70, "Maximo 70 carácteres")
    .required("Este campo es requerido"),

  description: yup
    .string()
    .max(156, "Maximo 156 carácteres")
    .required("Este campo es requerido"),
});

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  padding: 0;

  .down-button {
    padding: 0 20px;
    margin-bottom: 3rem;
  }
  .container-seccions {
    margin: 0;
    margin-bottom: 7rem;
    width: 100%;
  }
  .seccion-info {
    cursor: pointer;
    border: none;
    padding: 0;
    height: 50px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    background: #2c9aff;
    display: flex;
    align-items: center;
    padding-left: 40px;
    border-bottom: 1px solid white;
    &:last-of-type {
      border: 1px solid red;
      border: none;
    }
    &:focus {
      outline: none;
    }
  }

  .seccion-text {
    margin: 20px 0;
    width: 100%;
    .google-container {
      margin: 20px 0;
    }
    .google-link {
      display: flex;
      justify-content: center;
      text-decoration: none;
      color: black;
      font-size: 13px;
      border: 1px solid red;
      border: 1px solid rgba(0, 0, 0, 1);
      border-radius: 5px;
      width: 80%;
      padding: 10px 0;
      background: transparent;
    }

    p,
    .faq {
      font-size: 14px;
      line-height: 25px;
    }
    .container-curso {
      width: 100%;
      display: flex;
      flex-direction: column;
      .btn-curso {
        line-height: 40px;
        text-align: center;
        border: 1px solid #000;
        width: 100%;
        margin: 10px 0;
        border-radius: 5px;
        height: 40px;
        font-size: 13px;
        color: #000;
      }
    }
    .form-container {
      margin-top: 20px;
      margin-left: 0;
      margin-right: 0;
    }

    .form-seo .form-group {
      margin-top: 20px;
    }
    .form-group {
      width: 100%;
      margin: 0;
      position: relative;

      label {
        text-align: left;
        width: 100%;
        margin-top: 15px;
      }

      .input-error {
        border: 1px solid red;
        &:focus {
          box-shadow: 0px 0px 4px rgba(167, 56, 56, 0.5);
        }
      }
    }
    .message-error {
      text-align: left;
      padding-left: 20px;
      margin: 0;
      color: red;
    }

    .btn-submit {
      input {
        border: 1px solid rgba(0, 0, 0, 0.7);
        margin: 0;
        height: 5rem;
        margin-top: 2rem;
        border-radius: 5px;
        background: transparent;
        font-size: 14px;
        font-weight: 600;
        width: 100%;
        &:focus {
          outline: none;
        }
      }
    }
  }

  .campaign {
    &__text {
      font-family: var(--quicksand);
      font-weight: 600;
      font-size: 18px;
      line-height: 20px;
      margin-bottom: 1.6em;
      &--bold {
        font-weight: var(--bold);
      }

      &--primary {
        color: var(--color-primary);
      }
      &--orange {
        color: var(--color-orange);
      }
    }
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    max-width: 60rem;
    h1 {
      font-size: 45px;
      line-height: 45px;
    }
    .seccion-text {
      margin: 20px 0;

      .google-link {
        font-size: 14px;
        width: 60%;
      }

      p,
      .faq {
        font-size: 16px;
      }
    }
    form {
      max-width: 60rem;
    }

    .campaign {
      &__text {
        font-style: normal;
        font-weight: 600;
        line-height: 2rem;
        font-size: 1.8rem;
      }
    }
  }
`;

const StyledForm = ({value, size}) => {
  return (
    <>
      <style jsx>
        {`
          position: relative;
          font-size: 14px;
          color: #000;
          right: 0;
          text-align: right;

          padding-right: 10px;
          font-weight: 300;
        `}
      </style>
      <div>
        {value}/{size}
      </div>
    </>
  );
};

const Campaign = () => {
  const {setToast} = useContext(Alert.AlertContext);
  const {user} = useContext(User.UserContext);
  const [width, setWidth] = useState(null);

  //Active one seccion
  const [activeSeccion, setActiveSeccion] = useState(null);

  //Form State Send Info
  const [values, setValues] = useState({
    direction: "",
    areas: "",
    location: "",
    money: "",
  });

  /*************/

  //Initial Values
  const [initialValues, setInitialValues] = useState(null);

  //Form State Seo info
  const [seo, setSeo] = useState({
    title: "",
    description: "",
  });

  /*******/

  useEffect(() => {
    const fetchPetition = async () => {
      const {data} = await getAsync("/users/website");

      setInitialValues(data.initialValues);
      setValues({
        ...values,
        direction: `www.${data.initialValues.url}.hfma.es`,
      });
      setSeo({
        title: data.initialValues.seo[0].title,
        description: data.initialValues.seo[0].description,
      });
    };
    fetchPetition();
  }, []);

  //Use Effect Media query
  useEffect(() => {
    setWidth(screen.width);
  }, []);

  //Open seccion
  const onClickSeccion = (type) => {
    if (type === activeSeccion) {
      window.location.href = `#`;
      return setActiveSeccion(null);
    }
    setActiveSeccion(type);
    setTimeout(() => {
      window.location.href = `#${type}`;
    }, 10);
  };

  //Send Info
  const onSubmitInfo = () => {
    const {direccion, areas, location, money} = values;
    window.location.href = `mailto:marketingabogados.hfma@gmail.com?Subject=Informacion Marketing &body=Direccion web: ${direccion}%0AAreas: ${areas}%0ALocalizacion: ${location}%0APresupuesto: ${money}€`;
  };

  const onSubmitSeo = async (e) => {
    const {ok} = await putAsync("/users/seo", {
      title: e.title,
      description: e.description,
      userId: initialValues.userId,
    });

    if (ok) {
      return setToast("SEO agregado correctamente", "success");
    }
    return setToast("No se pudo guardar tu informacio SEO", "danger");
  };

  return (
    <Layout hideHeader={width < 768}>
      <Head>
        <title>Hifive | Marketing para abogados</title>
      </Head>
      <Container className="container">
        <div className="mt-5 mb-5 d-md-none">
          <a>
            <img
              className="back-arrow"
              src={require("../../public/static/back-arrow.png")}
              onClick={() => {
                Router.push("/dashboard");
              }}
            />
          </a>
        </div>
        <div className="mb-4">
          <h1 className="heading ">
            Mi campaña de
            <br />
            <strong className="rainbow">Marketing digital</strong>
          </h1>
        </div>
        <div className="mt-5 mb-5">
          <p className="campaign__text campaign__text--bold">
            Creamos y optimizamos tus anuncios en Google Ads
          </p>
        </div>
        <div className="row container-seccions">
          <button
            id="one"
            className="col-12 seccion-info"
            onClick={() => {
              onClickSeccion("one");
            }}
          >
            Crea tu cuenta en Google Ads
          </button>

          {activeSeccion === "one" && (
            <div className="seccion-text">
              <div>
                {" "}
                <p>
                  Registrate con tu email de Gmail en Google Ads e introduce tus
                  datos de facturación
                </p>{" "}
                <div className="google-container">
                  <a
                    className="google-link"
                    href="https://ads.google.com/intl/es-419_cr/home/"
                    target="_blank"
                  >
                    Ir a Google Ads
                  </a>
                </div>
                <p>
                  Google Ads te pasará los recibos por tu campaña publicitaria
                  mensualmente.
                </p>
              </div>{" "}
            </div>
          )}

          <button
            id="two"
            className="col-12 seccion-info"
            onClick={() => {
              onClickSeccion("two");
            }}
          >
            Concédenos acceso a tu cuenta
          </button>

          {activeSeccion === "two" && (
            <div className="seccion-text">
              <div>
                {" "}
                <p>Desde la pantalla de inicio:</p> <br />
                <p>
                  En la esquina superior derecha de tu cuenta haz clic en
                  “Configuración y facturación”
                </p>{" "}
                <br />
                <p>
                  En la pestaña de “Cuenta” haz clic en “Acceso y seguridad”
                </p>{" "}
                <br />
                <p>
                  Pulsa el botón de “+” e introduce nuestro correo:
                  marketingabogados.hfma@gmail.com, selecciona el “nivel de
                  acceso estandar” y pulsa el botón para confirmar
                </p>{" "}
              </div>{" "}
            </div>
          )}

          <button
            id="three"
            className="col-12 seccion-info"
            onClick={() => {
              onClickSeccion("three");
            }}
          >
            Envíanos los datos de tu campaña
          </button>

          {activeSeccion === "three" && (
            <div className="seccion-text">
              <div>
                <p>Envíanos un correo indicando: </p>

                <Formik
                  enableReinitialize={true}
                  initialValues={values}
                  validateOnChange={false}
                  validationSchema={validationSchema}
                  isValidating={false}
                  onSubmit={() => {
                    onSubmitInfo();
                  }}
                >
                  <Form>
                    <FormGroup
                      fieldData={fieldsData.direction}
                      name="direction"
                      type="text"
                    />
                    <FormGroup
                      fieldData={fieldsData.areas}
                      name="areas"
                      type="text"
                    />
                    <FormGroup
                      fieldData={fieldsData.location}
                      name="location"
                      type="text"
                    />
                    <FormGroup
                      fieldData={fieldsData.money}
                      name="money"
                      type="number"
                    />
                    <div className="form-group btn-submit">
                      <input type="submit" value="Enviar información" />
                    </div>
                  </Form>
                </Formik>
              </div>{" "}
            </div>
          )}

          <button
            id="four"
            className="col-12 seccion-info"
            onClick={() => {
              onClickSeccion("four");
            }}
          >
            Creamos tus anuncios
          </button>

          {activeSeccion === "four" && (
            <div className="seccion-text">
              <div>
                <p>
                  Creamos tus anuncios en Google Ads de acuerdo a tus
                  preferencias. Recibirás un email de confirmación.
                </p>
                <br /> <br />
                <p>
                  Si deseas pausar o que modifiquemos por ti la inversión de tu
                  campaña escríbenos un correo a
                  marketingabogados.hfma@gmail.com indicando el nuevo importe y
                  la dirección de tu web.
                </p>{" "}
                <br /> <br />
                <p className="faq">
                  <span>¿Tienes dudas? </span>
                  <Link href="/faq">
                    <a>Ver Faq</a>
                  </Link>
                </p>
              </div>
            </div>
          )}

          <button
            id="five"
            className="col-12 seccion-info"
            onClick={() => {
              onClickSeccion("five");
            }}
          >
            Cursos - Marketing Digital Abogados
          </button>

          {activeSeccion === "five" && (
            <div className="seccion-text">
              <p>
                Aprende como conseguir clientes en Google con nuestros cursos de
                Marketing para abogados:
              </p>
              <div className="container-curso">
                <a
                  className="btn-curso"
                  href="https://www.marketingwebabogados.com/post/seo-y-marketing-para-abogados-guia-completa"
                  target="_blank"
                >
                  Curso SEO: Posicionamiento en Google
                </a>
                <a
                  className="btn-curso"
                  href="https://www.marketingwebabogados.com/post/sem-publicidad-en-google-para-abogados"
                  target="_blank"
                >
                  Curso SEM: Campañas en Google Ads
                </a>
              </div>
            </div>
          )}

          <button
            id="six"
            className="col-12 seccion-info"
            onClick={() => {
              onClickSeccion("six");
            }}
          >
            SEO (Info que aparecerá en Google)
          </button>

          {activeSeccion === "six" && (
            <div className="seccion-text">
              <p>
                Info de tu web que aparecerá en los resultados de búsquedas en
                Google
              </p>
              <Formik
                enableReinitialize={true}
                initialValues={seo}
                validateOnChange={false}
                validationSchema={validationSchema2}
                isValidating={false}
                onSubmit={(e) => {
                  onSubmitSeo(e);
                }}
              >
                {({values}) => {
                  return (
                    <Form>
                      <FormGroup
                        fieldData={fieldsData2.title}
                        name="title"
                        type="text"
                      />{" "}
                      <StyledForm value={values.title.length} size={70} />
                      <FormGroup
                        fieldData={fieldsData2.description}
                        name="description"
                        type="text"
                        asInput="textarea"
                      />
                      <StyledForm
                        value={values.description.length}
                        size={156}
                      />
                      <div className="form-group btn-submit">
                        <input type="submit" value="Enviar información" />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default Campaign;
