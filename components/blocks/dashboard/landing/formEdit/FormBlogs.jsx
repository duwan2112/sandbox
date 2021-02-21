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
  area: {label: "Área", placeholder: "Laboral"},
  question: {
    label: "Pregunta",
    placeholder: "¿Qué hacer ante una situación de acoso laboral o mobbing?",
  },
  answer: {
    label: "Respuesta",
    placeholder: `El acoso laboral es castigado por el artículo 173.1 del Código Penal (CP) con una pena de prisión de seis meses a dos años. Dicho precepto penaliza a quien, en el ámbito laboral o funcionarial, y prevaliéndose de una relación de superioridad, realice contra un empleado, de forma reiterada, actos hostiles o humillantes que supongan un grave acoso contra el trabajador.

La jurisprudencia ha definido el mobbing como "toda situación o conducta que, por su reiteración en el tiempo, por su carácter degradante de las condiciones de trabajo y por la hostilidad o intimidación del ambiente laboral que general, tiene por finalidad o como resultado atentar o poner en peligro la integridad del trabajador".
  
Así, para que los tribunales lo aprecien, tienen que darse tres elementos. En primer lugar no puede ser un hecho aislado, requiere que la presión a la que se está sometiendo al trabajador sea sistemática (por ejemplo, varias veces a la semana) y prolongada (durante varios meses). En segundo término, el tipo de actos sufridos deben ser hostiles (gritos, enfados, comentarios que le atemoricen, etc.) o (se le deja en ridículo, se desprecia su trabajo, se le sitúa a hacer funciones muy por debajo de su cualificación, etc.). Finalmente, el resultado o la finalidad de estas conductas debe ser poner en peligro o menoscabar la integridad del trabajador.
  
Las fórmulas a través de las cuales se puede manifestar el acoso laboral son múltiples: ninguneo, hostigamiento, amilanamiento, amenazas, arrinconar, vejar, etc.
  `,
  },
};

const updateValidationSchema = yup.object({
  area: yup.string().required("Este campo es requerido"),
  question: yup.string().required("Este campo es requerido"),
  answer: yup.string().required("Este campo es requerido"),
});

export default function formBlogs({
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
      filter: "blogs",
      data: values,
    });
    if (ok) {
      reload();
      setIsLoading(false);
      setActiveForm(null);
      setToast("Entradas de blogs actualizadas", "success");
    } else {
      setToast(
        "Ocurrio un error al intentar actualizar las entradas de blogs",
        "danger"
      );
    }
  };

  return (
    <Formik
      initialValues={
        initialValues
          ? initialValues
          : {area: area ? area : "", question: "", answer: "", id: uuidv4()}
      }
      enableReinitialize={true}
      validateOnChange={false}
      validationSchema={updateValidationSchema}
      onSubmit={(data) => {
        sendForm(data);
      }}
    >
      {({values, errors, handleSubmit, submitForm}) => {
        return (
          <form onSubmit={handleSubmit}>
            <FormGroup fieldData={fieldsData.area} name="area" type="text" />
            <FormGroup
              fieldData={fieldsData.question}
              name="question"
              type="text"
            />
            <FormGroup
              fieldData={fieldsData.answer}
              asInput="textarea"
              name="answer"
              type="text"
            />{" "}
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
