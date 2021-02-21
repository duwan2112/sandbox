import React, {useState, useContext} from "react";
import {Formik, Form, FieldArray} from "formik";
import {v4 as uuidv4} from "uuid";
import * as yup from "yup";
import FormGroup from "../../forms/FormGroup";
import styled from "styled-components";
import {server} from "../../../../../utils";
import ReactLoading from "react-loading";
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
  name: {label: "Nombre del cliente", placeholder: "Lucas G."},
  location: {label: "Localización del cliente", placeholder: "Madrid"},
  comment: {
    label: "Comentario",
    placeholder:
      "Javier me ayudó con la herencia de mis padres. Se nota que sabe mucho del tema y hizo que todo el proceso fuese muy fácil.",
  },
};

const updateValidationSchema = yup.object({
  name: yup.string().required("Este campo es requerido"),
  location: yup.string().required("Este campo es requerido"),
  comment: yup
    .string()
    .max(700, "Maximo 700 caracteres")
    .required("Este campo es requerido"),
});
export default function FormClients({
  id,
  type,
  setActiveForm,
  reload,
  initialValues,
  area,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const {setToast} = useContext(Alert.AlertContext);

  const sendForm = async (values) => {
    setIsLoading(true);

    const {ok, data} = await server.putAsync("/users/subareas/editSubarea", {
      subareaId: id,
      type,
      filter: "testimonials",
      data: values,
    });
    if (ok) {
      reload();
      setIsLoading(false);
      setActiveForm(null);
      setToast("Seccion de testimonios actualizadas", "success");
    } else {
      setToast(
        "Ocurrio un error al intentar actualizar la seccion de testimonios",
        "danger"
      );
    }
  };
  return (
    <Formik
      initialValues={
        initialValues
          ? initialValues
          : {name: "", location: "", comment: "", id: uuidv4()}
      }
      enableReinitialize={true}
      validationSchema={updateValidationSchema}
      onSubmit={(data) => sendForm(data)}
    >
      {({values, errors, handleSubmit, submitForm}) => {
        return (
          <form onSubmit={handleSubmit}>
            <FormGroup fieldData={fieldsData.name} name="name" type="text" />
            <FormGroup
              fieldData={fieldsData.location}
              name="location"
              type="text"
            />
            <FormGroup
              fieldData={fieldsData.comment}
              asInput="textarea"
              name="comment"
              type="text"
              className="form-control--tall"
              count="700"
            />
            <Container>
              <button
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
          </form>
        );
      }}
    </Formik>
  );
}
