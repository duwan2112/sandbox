import {useState} from "react";
import {Formik, Form, FieldArray} from "formik";
import * as yup from "yup";
import ReactLoading from "react-loading";
import FormGroup from "../../../../components/blocks/dashboard/forms/FormGroup";
import {server} from "../../../../utils";
import Head from "next/head";
import styled from "styled-components";
import Layout from "../../../../components/layout";

const Container = styled.div`
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
`;

const validationSchema = yup.object({
  website: yup.array().of(
    yup.object({
      pregunta: yup.string().required("Este campo es requerido"),
      respuesta: yup.string().required("Este campo es requerido"),
    })
  ),
  marketing: yup.array().of(
    yup.object({
      pregunta: yup.string().required("Este campo es requerido"),
      respuesta: yup.string().required("Este campo es requerido"),
    })
  ),
  sessions: yup.array().of(
    yup.object({
      pregunta: yup.string().required("Este campo es requerido"),
      respuesta: yup.string().required("Este campo es requerido"),
    })
  ),
});

const FAQ = ({data}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState("web");

  const debug = false;

  const onFormSubmit = async (values) => {
    setIsLoading(true);

    const {ok} = await server.putAsync("/admin/cms", {
      faq: values,
    });
    if (!ok) {
      // enviamos la alerta
    } else {
      // hacemos otra cosa
    }
    setIsLoading(false);
  };

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
            <h1 className="heading" style={{marginTop: "2rem"}}>
              PLanes y Suscripciones
              <br />
              <strong className="heading--gray">Precios</strong>
            </h1>
          </div>
          <div className="mb-5">
            <button
              className={`btn btn-block ${
                selectedForm === "web" ? "btn-primary" : "btn-outlined-primary"
              }`}
              onClick={() => setSelectedForm("web")}
            >
              Tu Website
            </button>
          </div>
          <div className="mb-5">
            <button
              className={`btn btn-block ${
                selectedForm === "marketing"
                  ? "btn-primary"
                  : "btn-outlined-primary"
              }`}
              onClick={() => setSelectedForm("marketing")}
            >
              Campaña de Marketing
            </button>
          </div>
          <div>
            <button
              className={`btn btn-block ${
                selectedForm === "sessions"
                  ? "btn-primary"
                  : "btn-outlined-primary"
              }`}
              onClick={() => setSelectedForm("sessions")}
            >
              Sesiones de Fotos y Videos
            </button>
          </div>
          <div>
            <Formik
              initialValues={
                !data
                  ? {
                      website: [{pregunta: "", respuesta: ""}],
                      marketing: [{pregunta: "", respuesta: ""}],
                      sessions: [{pregunta: "", respuesta: ""}],
                    }
                  : data
              }
              validationSchema={validationSchema}
              onSubmit={onFormSubmit}
            >
              {({values, errors}) => (
                <Form>
                  {/* Array 1 */}
                  {selectedForm === "web" && (
                    <FieldArray
                      name="website"
                      render={(arrayHelpers) => (
                        <div className="mt-5">
                          <h2 className="mb-5 mt-5">Tu website</h2>
                          {values.website.map((website, index) => (
                            <div key={`website.${index}`}>
                              <FormGroup
                                fieldData={{label: "Pregunta"}}
                                root={`website.${index}`}
                                name="pregunta"
                                type="text"
                              />
                              <FormGroup
                                asInput
                                fieldData={{label: "Respuesta"}}
                                root={`website.${index}`}
                                name="respuesta"
                                type="text"
                              />
                              <div className="mb-5 d-flex justify-content-between">
                                <a
                                  className="btn-link"
                                  onClick={() => {
                                    arrayHelpers.insert(index + 1, {
                                      pregunta: "",
                                      respuesta: "",
                                    });
                                  }}
                                >
                                  Nuevo
                                </a>
                                {index > 0 && (
                                  <a
                                    className="btn-link btn-link--black"
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                    }}
                                  >
                                    Eliminar
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  )}
                  {/* Array 2 */}
                  {selectedForm === "marketing" && (
                    <FieldArray
                      name="marketing"
                      render={(arrayHelpers) => (
                        <div className="mt-5">
                          <h2 className="mb-5 mt-5">Campañas de Marketing</h2>
                          {values.marketing.map((marketing, index) => (
                            <div key={`marketing.${index}`}>
                              <FormGroup
                                fieldData={{label: "Pregunta"}}
                                root={`marketing.${index}`}
                                name="pregunta"
                                type="text"
                              />
                              <FormGroup
                                asInput
                                fieldData={{label: "Respuesta"}}
                                root={`marketing.${index}`}
                                name="respuesta"
                                type="text"
                              />

                              <div className="mb-5 d-flex justify-content-between">
                                <a
                                  className="btn-link"
                                  onClick={() => {
                                    arrayHelpers.insert(index + 1, {
                                      pregunta: "",
                                      respuesta: "",
                                    });
                                  }}
                                >
                                  Nuevo
                                </a>
                                {index > 0 && (
                                  <a
                                    className="btn-link btn-link--black"
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                    }}
                                  >
                                    Eliminar
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  )}
                  {/* Array 3 */}
                  {selectedForm === "sessions" && (
                    <FieldArray
                      name="sessions"
                      render={(arrayHelpers) => (
                        <div className="mt-5">
                          <h2 className="mb-5 mt-5">
                            Sesiones de Fotos y Videos
                          </h2>
                          {values.sessions.map((sessions, index) => (
                            <div key={`sessions.${index}`}>
                              <FormGroup
                                fieldData={{label: "Pregunta"}}
                                root={`sessions.${index}`}
                                name="pregunta"
                                type="text"
                              />
                              <FormGroup
                                asInput
                                fieldData={{label: "Respuesta"}}
                                root={`sessions.${index}`}
                                name="respuesta"
                                type="text"
                              />

                              <div className="mb-5 d-flex justify-content-between">
                                <a
                                  className="btn-link"
                                  onClick={() => {
                                    arrayHelpers.insert(index + 1, {
                                      pregunta: "",
                                      respuesta: "",
                                    });
                                  }}
                                >
                                  Nuevo
                                </a>
                                {index > 0 && (
                                  <a
                                    className="btn-link btn-link--black"
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                    }}
                                  >
                                    Eliminar
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  )}
                  <button
                    className="btn btn-gradient-primary btn-block mb-5 d-flex justify-content-center"
                    type="submit"
                  >
                    {isLoading ? (
                      <ReactLoading
                        type="spin"
                        color={"var(--color-white)"}
                        height={30}
                        width={30}
                      />
                    ) : (
                      "Guardar"
                    )}
                  </button>
                  {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Layout>
    </>
  );
};

FAQ.getInitialProps = async (ctx) => {
  const {ok, data} = await server.getAsync("/admin/cms");

  if (!ok) ctx.res.redirect("/dashboard");

  return {data: data.faq};
};

export default FAQ;
