import React, {useState, useEffect, useContext} from "react";
import {Formik, Form, FieldArray, Field} from "formik";
import * as yup from "yup";
import FormGroup from "../../forms/FormGroup";
import {v4 as uuidv4} from "uuid";
import styled from "styled-components";
import ReactLoading from "react-loading";
import {server} from "../../../../../utils";
import {Alert} from "../../../../../components/contexts/index";

const Container = styled.div`
  padding-bottom: 40px;
  .fixed {
    position: fixed;
    max-width: 27rem;
    margin: 10px auto;
    left: 0;
    right: 0;
    bottom: 0;
    @media ${(props) => props.theme.mediaQueries.medium} {
      position: fixed;
      bottom: 0;
      max-width: 37rem;
      right: 0;
      left: inherit;
      margin: 10px;
    }
  }
`;
const fieldsData = {
  title: {
    label: "Titulo principal",
    placeholder: "Separación, divorcio y nulidad",
  },
  description: {
    label: "Descripción principal",
    placeholder:
      "Nuestro equipo de abogados expertos en divorcios te asesorá en todo momento",
  },
  comment: {
    label: "Comentario",
    placeholder:
      "¿Eres infeliz en tu matrimonio y estás pensando en el divorcio? ¿O tal vez su pareja tuvo una aventura y se mudó? Independientemente de las circunstancias, es natural preocuparse por el futuro, sus finanzas, su hogar y sus hijos. No te preocupes, estamos aquí para ayudarte.",
  },
  allTitle: {
    label: "Titulo del comentario",
    placeholder: "Qué esperar de la primera reunión con su abogado",
  },
  allComment: {
    label: "Comentario",
    placeholder:
      "En la primera reunión, discutirá los motivos de la ruptura de su matrimonio. Se le pedirá que proporcione la fecha de separación, los detalles de los hijos de la familia, incluidos los arreglos futuros propuestos para su cuidado, los detalles de sus propios activos y los de su pareja, ingresos, ahorros e intereses de pensión. La primera reunión es en gran medida un ejercicio de búsqueda de hechos para permitir que su abogado le asesore adecuadamente sobre los mejores próximos pasos. En esa reunión, puede esperar obtener más información sobre sus opciones, incluidos los procesos que puede utilizar para llegar a una resolución en su caso, ya sea mediante negociación, colaboración, mediación, arbitraje o litigio. También tendrá una mejor comprensión de cómo podría ser su futuro",
  },
};

const validationSchema = yup.object({
  title: yup.string().required("Este campo es requerido"),
  comment: yup.string().required("Este campo es requerido"),
  description: yup.string().required("Este campo es requerido"),
  all: yup.array().of(
    yup.object({
      title: yup.string().required("Este campo es requerido"),
      comment: yup.string().required("Este campo es requerido"),
    })
  ),
});

const fieldsData2 = {
  video: {
    label: "Video",
    placeholder: "www.youtube/video-entrevista.com",
  },
  phone: {label: "Contácto por teléfono", placeholder: "916504211"},
  whatsapp: {label: "Contácto por WhatsApp", placeholder: "625678945"},
  email: {
    label: "Contácto por email",
    placeholder: "info@bufetevelazquez.com",
  },
  direction: {
    label: "Dirección",
    placeholder: "C/Velazquez, 155, 3ºA, 28005 Madrid",
  },
};

const validationSchema2 = yup.object({
  video: yup.string(),
  phone: yup.string().max(16, "Maximo 20 caracteres"),
  whatsapp: yup.string().max(16, "Maximo 20 caracteres"),
  email: yup.string().email("El email no es valido"),
  direction: yup.string(),
});

export default function EditPrincipal({
  principal,
  id,
  reload,
  interviews,
  setActive,
  userid,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeSubmit, setActiveSubmit] = useState(false);
  const {setToast} = useContext(Alert.AlertContext);

  const sendForm = async (values) => {
    setActiveSubmit(false);
    setIsLoading(true);

    const {ok, data} = await server.putAsync(
      `/users/subareas/editSubarea${userid ? `/${userid}` : ""}`,
      {
        subareaId: id,
        type: "update",
        filter: "principal",
        data: values,
      }
    );

    if (ok) {
      reload();
      setIsLoading(false);
      setToast("Seccion pantalla de bienvenida actualizadas", "success");
      setActive(0);
    } else {
      setToast(
        "Ocurrio un error al intentar actualizar la seccion pantalla de bienvenida",
        "danger"
      );
    }
  };

  const sendForm2 = async (values) => {
    setActiveSubmit(false);
    setIsLoading(true);

    const {ok, data} = await server.putAsync(
      `/users/subareas/editSubarea${userid ? `/${userid}` : ""}`,
      {
        subareaId: id,
        type: "update",
        filter: "interviews",
        data: values,
      }
    );

    if (ok) {
      reload();
      setIsLoading(false);
    } else {
      console.log(data);
    }
  };
  return (
    <div className="form-container">
      <div className="load__row mb-4">
        <h1 className="heading">
          Edita la sección
          <br />
          <strong className="heading--blue">pantalla de bienvenida</strong>
        </h1>
        <Formik
          enableReinitialize={true}
          validateOnChange={false}
          validationSchema={validationSchema}
          isValidating={false}
          onSubmit={(e) => {
            sendForm(e);
          }}
          initialValues={principal}
        >
          {({values, handleSubmit}) => {
            useEffect(() => {
              if (activeSubmit) {
                handleSubmit();
              }
            }, [activeSubmit]);
            return (
              <Form>
                <div style={{marginTop: "5rem"}}>
                  {" "}
                  <FormGroup
                    fieldData={fieldsData.title}
                    name="title"
                    type="text"
                  />
                  <FormGroup
                    fieldData={fieldsData.description}
                    name="description"
                    type="text"
                    asInput
                  />
                  <FormGroup
                    fieldData={fieldsData.comment}
                    name="comment"
                    type="text"
                    asInput
                  />{" "}
                  <FieldArray
                    name="all"
                    render={(arrayHelpers) => (
                      <div>
                        {values.all.map((comment, index) => (
                          <div key={`all.${index}`}>
                            <FormGroup
                              name={`all.${index}.title`}
                              type="text"
                              fieldData={fieldsData.allTitle}
                              asInput
                            />
                            <FormGroup
                              name={`all.${index}.comment`}
                              type="text"
                              fieldData={fieldsData.allComment}
                              asInput
                            />

                            {index >= 0 ? (
                              <div className="text-right mb-5">
                                <a
                                  className="btn-link btn-link--black"
                                  onClick={() => {
                                    arrayHelpers.remove(index);
                                  }}
                                >
                                  Eliminar
                                </a>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        ))}

                        <div className=" mb-5">
                          <a
                            className="btn-link"
                            role="button"
                            onClick={async () => {
                              arrayHelpers.push({
                                title: "",
                                id: uuidv4(),
                                comment: "",
                              });
                              //await props.submitFormData(values);
                            }}
                          >
                            Añadir nuevo comentario
                          </a>
                        </div>
                      </div>
                    )}
                  ></FieldArray>
                </div>
              </Form>
            );
          }}
        </Formik>
        <h1 className="heading">
          Edita la sección
          <br />
          <strong className="heading--blue">Entrevistas</strong>
        </h1>
        <Formik
          enableReinitialize={true}
          initialValues={interviews}
          validateOnChange={false}
          validationSchema={validationSchema2}
          isValidating={false}
          onSubmit={(e) => {
            sendForm2(e);
          }}
        >
          {({values, handleSubmit}) => {
            useEffect(() => {
              if (activeSubmit) {
                handleSubmit();
              }
            }, [activeSubmit]);
            return (
              <Form>
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    paddingBottom: "1.5rem",
                    color: "#303030",
                  }}
                >
                  Video-entrevistas{" "}
                  <span
                    style={{
                      paddingLeft: "1rem",
                      fontSize: "16px",
                      opacity: "0.5",
                      fontWeight: "300",
                    }}
                  >
                    (opcional)
                  </span>
                </p>
                <FieldArray
                  name="video"
                  render={(arrayHelpers) => (
                    <div>
                      <div className="form-group">
                        <label>Video</label>
                        {values.video.map((dir, index) => (
                          <div
                            className={`${index > 0 && "mt-5"}`}
                            key={`video.${index}`}
                          >
                            <Field
                              className="form-control"
                              placeholder="www.youtube/video-entrevista.com"
                              name={`video.${index}`}
                              type="text"
                            />

                            {index > 0 && (
                              <div className="text-right">
                                <a
                                  role="button"
                                  className="btn-link btn-link--black"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Eliminar
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className=" mb-5">
                        <a
                          className="btn-link"
                          role="button"
                          onClick={async () => {
                            arrayHelpers.push("");
                            //await props.submitFormData(values);
                          }}
                        >
                          Añadir nuevo video
                        </a>
                      </div>
                    </div>
                  )}
                />
                <FormGroup
                  fieldData={fieldsData2.phone}
                  name="phone"
                  type="tel"
                />
                <FormGroup
                  fieldData={fieldsData2.whatsapp}
                  name="whatsapp"
                  type="tel"
                />
                <FormGroup
                  fieldData={fieldsData2.email}
                  name="email"
                  type="email"
                />
                <FieldArray
                  name="direction"
                  render={(arrayHelpers) => (
                    <div>
                      <div className="form-group">
                        <label>Dirección</label>
                        {values.direction.map((dir, index) => (
                          <div
                            className={`${index > 0 && "mt-5"}`}
                            key={`direction.${index}`}
                          >
                            <Field
                              className="form-control"
                              placeholder="C/Velazquez, 155, 3ºA, 28005 Madrid"
                              name={`direction.${index}`}
                              type="text"
                            />

                            {index > 0 && (
                              <div className="text-right">
                                <a
                                  role="button"
                                  className="btn-link btn-link--black"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Eliminar
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="text-center mb-5">
                        <a
                          className="btn-link"
                          role="button"
                          onClick={async () => {
                            arrayHelpers.push("");
                            //await props.submitFormData(values);
                          }}
                        >
                          Nueva Dirección
                        </a>
                      </div>
                    </div>
                  )}
                />
              </Form>
            );
          }}
        </Formik>
        <Container>
          <button
            onClick={() => {
              setActiveSubmit(true);
            }}
            type="submit"
            style={{fontSize: "1.7rem"}}
            className={`fixed btn btn-primary
              } btn-block mb-5 d-flex justify-content-center`}
          >
            <>
              {" "}
              {isLoading ? (
                <ReactLoading
                  type="spin"
                  color={"currentColor"}
                  height={30}
                  width={30}
                />
              ) : (
                "Guardar"
              )}{" "}
            </>
          </button>
        </Container>
      </div>
    </div>
  );
}
