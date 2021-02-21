import React, {useState} from "react";
import {Formik, Form, FieldArray} from "formik";
import * as yup from "yup";
import ReactLoading from "react-loading";
import FormGroup from "../dashboard/forms/FormGroup";
import {server} from "../../../utils";

import styled from "styled-components";

const Container = styled.div`
  padding-top: 4rem;
  padding: 6rem 10rem 4rem 0rem;
  margin: 0;
  position: relative;
  left: 0;
  .selected {
    width: 100%;
    .col-3 {
      padding-right: 20px;
    }
    .btn {
      font-size: 15px;
      height: 50px;
      padding: 10px 10px;
      margin-right: 10px;
    }
  }
  input,
  textarea {
    border-radius: 3px;
  }
  .btn-link {
    text-decoration: none;
    width: 120px;
    height: 35px;
    font-size: 14px;
    font-weight: 400;
    line-height: 35px;
    background: #eeeeee;
    color: black;
    text-align: center;
    margin-left: 20px;
  }
  .btn-send {
    width: 30%;
    margin: 0 auto;
    border-radius: 5px;
  }
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
  contact: yup.string().required("Este campo es requerido"),
});

export default function Frecuent({data, contact}) {
  data.contact = contact.email;

  const [isLoading, setIsLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState("web");

  const debug = false;

  const onFormSubmit = async (values) => {
    setIsLoading(true);

    const {ok} = await server.putAsync("/admin/cms", {
      faq: values,
      contact: {email: values.contact},
    });
    if (!ok) {
      // enviamos la alerta
    } else {
      // hacemos otra cosa
    }
    setIsLoading(false);
  };

  return (
    <Container className="container">
      <div className="row selected">
        <div className="col-3">
          <button
            className={`btn btn-block ${
              selectedForm === "web" ? "btn-primary" : "btn-outlined-primary"
            }`}
            onClick={() => setSelectedForm("web")}
          >
            Tu Website
          </button>
        </div>
        <div className="col-3">
          <button
            className={`btn btn-block ${
              selectedForm === "marketing"
                ? "btn-primary"
                : "btn-outlined-primary"
            }`}
            onClick={() => setSelectedForm("marketing")}
          >
            Campañia de Marketing
          </button>
        </div>
        <div className="col-3">
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
        <div className="col-3">
          <button
            className={`btn btn-block ${
              selectedForm === "contact"
                ? "btn-primary"
                : "btn-outlined-primary"
            }`}
            onClick={() => setSelectedForm("contact")}
          >
            Contact info
          </button>
        </div>
      </div>

      <div>
        <Formik
          initialValues={
            !data
              ? {
                  website: [{pregunta: "", respuesta: ""}],
                  marketing: [{pregunta: "", respuesta: ""}],
                  sessions: [{pregunta: "", respuesta: ""}],
                  contact: "",
                }
              : data
          }
          validationSchema={validationSchema}
          onSubmit={onFormSubmit}
        >
          {({values, errors}) => (
            <Form>
              {selectedForm === "web" && (
                <FieldArray
                  name="website"
                  render={(arrayHelpers) => (
                    <div className="mt-5 pt-5">
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
                          <div className="mb-5 d-flex justify-content-end">
                            <a
                              className="btn-link  btn-link--black"
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
                    <div className="mt-5 pt-5">
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

                          <div className="mb-5 d-flex justify-content-end">
                            <a
                              className="btn-link  btn-link--black"
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
                    <div className="mt-5 pt-5">
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

                          <div className="mb-5 d-flex justify-content-end">
                            <a
                              className="btn-link btn-link--black"
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
              {selectedForm === "contact" && (
                <div className="pt-5 mt-5">
                  <FormGroup
                    fieldData={{label: "Informacion de contacto"}}
                    name="contact"
                    type="text"
                    value={values.contact}
                  />
                </div>
              )}
              <button
                className="btn btn-send btn-gradient-primary btn-block mb-5 d-flex justify-content-center"
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
  );
}
