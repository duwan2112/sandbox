import React, {useState, useContext} from "react";
import {v4 as uuidv4} from "uuid";
import FormGroup from "../../forms/FormGroup";
2;
import ReactLoading from "react-loading";
import * as yup from "yup";
import {server} from "../../../../../utils";
import {Formik, Form, FieldArray} from "formik";
import styled from "styled-components";
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
  area: {label: "Área", placeholder: "Tráfico"},
  title: {
    label: "Título",
    placeholder:
      "Reducción de la pena bajo las influencias de bebidas alcohólicas",
  },
  comment: {
    label: "Comentario",
    placeholder: `Conseguida conformidad de 40 días de trabajo en beneficio de la comunidad en un delito de conducción bajo las influencias de bebidas alcohólicas que puede conllevar una pena de prisión de entre tres y seis meses.

Asimismo, se ha conseguido que una pena por un delito contra la seguridad Vial por negativa a realizar las pruebas se haya rebajado a 4 meses de prisión y privación del derecho a conducir vehículos a motor durante 8 meses, pudiendo haber alcanzado una pena de prisión de 6 meses a un año con privación del derecho a conducir vehículos a motor y ciclomotores por tiempo superior a 1 y hasta cuatro años, tal y como se establece en el Código Penal.
  
En esta ocasión, la labor del despacho ha evitado peores consecuencias, aunque siempre se hace importante recordar, y más en estas fechas, la necesidad de evitar conducir bajo los efectos del alcohol, cuyo consumo puede suponer no solo la comisión de un delito castigado con penas de prisión, sino fatales consecuencias.
  `,
  },
  honors: {
    label: "Honorarios",
    placeholder: "350€",
    optional: true,
  },
};

const updateValidationSchema = yup.object({
  area: yup.string().required("Este campo es requerido"),
  title: yup.string().required("Este campo es requerido"),
  comment: yup.string().required("Este campo es requerido"),
  honors: yup.number(),
});

export default function FormSolvedCases({
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
      filter: "solvedCases",
      data: values,
    });
    if (ok) {
      reload();
      setIsLoading(false);
      setActiveForm(null);
      setToast("Entradas de casos resueltos actualizadas", "success");
    } else {
      setToast(
        "Ocurrio un error al intentar actualizar las entradas de casos resueltos",
        "danger"
      );
    }
  };
  return (
    <Formik
      initialValues={
        initialValues
          ? initialValues
          : {
              area: area ? area : "",
              title: "",
              comment: "",
              honors: "",
              id: uuidv4(),
            }
      }
      enableReinitialize={true}
      validationSchema={updateValidationSchema}
      onSubmit={(data) => sendForm(data)}
    >
      {({values, errors, handleSubmit, submitForm}) => {
        return (
          <form onSubmit={handleSubmit}>
            <FormGroup fieldData={fieldsData.area} name="area" type="text" />
            <FormGroup fieldData={fieldsData.title} name="title" type="text" />
            <FormGroup
              fieldData={fieldsData.comment}
              asInput="textarea"
              name="comment"
              type="text"
            />
            <FormGroup
              fieldData={fieldsData.honors}
              name="honors"
              type="number"
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
