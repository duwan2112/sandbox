import {useState, useEffect, useContext} from "react";
import {Formik, Form, FieldArray} from "formik";
import FormGroup from "./FormGroup";
import Handler from "./Handler";
import ReactLoading from "react-loading";
import {Alert} from "../../../contexts/index";
import {v4 as uuidv4} from "uuid";

import * as yup from "yup";

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

const validationSchema = yup.object({
  solvedCases: yup.array().of(
    yup.object({
      area: yup.string().required("Este campo es requerido"),
      title: yup.string().required("Este campo es requerido"),
      comment: yup.string().required("Este campo es requerido"),

      honors: yup.string().notRequired(),
    })
  ),
});

const SolvedCases = ({root}) => {
  return (
    <>
      <FormGroup
        fieldData={fieldsData.area}
        name="area"
        root={root}
        type="text"
      />
      <FormGroup
        fieldData={fieldsData.title}
        name="title"
        root={root}
        type="text"
      />
      <FormGroup
        fieldData={fieldsData.comment}
        asInput="textarea"
        name="comment"
        root={root}
        type="text"
      />
      <FormGroup
        fieldData={fieldsData.honors}
        name="honors"
        root={root}
        type="number"
      />
    </>
  );
};

const ErrorSend = () => {
  const {setToast} = useContext(Alert.AlertContext);
  useEffect(() => {
    setToast(
      "No se ha podido guardar su seccion. Compruebe que a rellenado todos los campos obligatorios correctamente",
      "danger"
    );
  }, [setToast]);
  return null;
};
export const SolvedCasesArray = ({debug, initialValues, ...props}) => {
  const [values, setValues] = useState({
    solvedCases: [{area: "", title: "", comment: "", honors: "", id: uuidv4()}],
  });
  const [isLoading, setIsLoading] = useState(false);
  const {setToast} = useContext(Alert.AlertContext);
  useEffect(() => {
    if (initialValues.length > 0) setValues({solvedCases: initialValues});
  }, [initialValues]);
  let validating = false;
  return (
    <Formik
      initialValues={values}
      enableReinitialize={true}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={(values) => {
        props.updateFormState({["solvedCases"]: {...values}});
        setToast("Tu seccion ha sido guardado con exito!", "success");
      }}
    >
      {({values, isValidating, errors}) => {
        return (
          <Form>
            {isValidating ? (validating = true) : null}

            {validating === true && Object.entries(errors).length !== 0 ? (
              <>
                <ErrorSend />
                {(validating = false)}
              </>
            ) : null}

            <FieldArray
              name="solvedCases"
              render={(arrayHelpers) => (
                <div>
                  <div className="form-array-wrapper">
                    {values.solvedCases.map((lawyer, index) => (
                      <div key={`solvedCases.${index}`} className="form-array">
                        <SolvedCases root={`solvedCases.${index}`} />
                        {index > 0 ? (
                          <div className="text-right mb-5">
                            <a
                              className="btn-link"
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
                  </div>
                  <div className="text-center mb-5">
                    <a
                      className="btn-link"
                      role="button"
                      onClick={async () => {
                        arrayHelpers.push({
                          area: "",
                          title: "",
                          comment: "",
                          honors: "",
                          id: uuidv4(),
                        });
                        //await props.submitFormData(values);
                      }}
                    >
                      Añadir nuevo
                    </a>
                  </div>
                </div>
              )}
            />
            <div className="mt-5 mb-5 form-container">
              <button
                className="btn btn-gradient-primary btn-block btn-shadow d-flex justify-content-center"
                type="submit"
                onClick={() => {
                  setIsLoading(true);

                  setTimeout(() => {
                    setIsLoading(false);
                  }, 1000);
                }}
              >
                {isLoading === true ? (
                  <ReactLoading
                    type="spin"
                    color={"currentColor"}
                    height={30}
                    width={30}
                  />
                ) : (
                  "Guardar"
                )}
              </button>
            </div>
            {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
            {/*  <Handler
              updateFormState={props.updateFormState}
              validationSchema={validationSchema}
              formName="solvedCases"
            /> */}
          </Form>
        );
      }}
    </Formik>
  );
};

const updateValidationSchema = yup.object({
  area: yup.string().required("Este campo es requerido"),
  title: yup.string().required("Este campo es requerido"),
  comment: yup.string().required("Este campo es requerido"),
  honors: yup.number(),
});

export const SolvedCasesUpdate = ({debug, area, initialValues, ...props}) => {
  const {bindSubmitForm, onFormSubmit} = props;

  const operation = initialValues ? "update" : "create";

  return (
    <Formik
      initialValues={
        initialValues
          ? initialValues
          : {area: area, title: "", comment: "", honors: "", id: uuidv4()}
      }
      enableReinitialize={true}
      validationSchema={updateValidationSchema}
      onSubmit={(data) => onFormSubmit(data, operation)}
    >
      {({values, errors, handleSubmit, submitForm}) => {
        bindSubmitForm(submitForm);

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
            {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
            {debug ? <pre>{JSON.stringify(errors, null, 2)}</pre> : ""}
          </form>
        );
      }}
    </Formik>
  );
};

export default SolvedCases;
