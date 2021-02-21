import {useEffect, useState, useContext} from "react";
import {Formik, Form, FieldArray} from "formik";
import FormGroup from "./FormGroup";
import Handler from "./Handler";
import * as yup from "yup";
import ReactLoading from "react-loading";
import {Alert} from "../../../contexts/index";
import {v4 as uuidv4} from "uuid";
const fieldsData = {
  area: {label: "Área", placeholder: "Familia"},
  subarea: {
    label: "Subárea",
    placeholder: "Separación, divorcio y nulidad - 99€",
    optional: true,
  },
  comment: {
    label: "Comentario",
    placeholder: `Separación: Interrupción de la vida en común de dos personas casadas, por común acuerdo y sin mediar documentación (separación de hecho), o por decisión de un tribunal.

    Sus principales efectos son:
    
    No disuelve el vínculo matrimonial, sólo queda suspendido.
    No permite volver a contraer matrimonio con una tercera persona.
    Suspende la vida en común de los casados, cesando la posibilidad de vincular bienes del otro cónyuge en el ejercicio de la potestad doméstica.
    Cesan deberes y presunciones legales.
    
    Divorcio: Es la consecuencia de la decisión acordada entre los dos cónyuges (Divorcio de mutuo acuerdo), o tan solo la voluntad de uno de ellos (Divorcio contencioso), de disolver su vínculo matrimonial.
    
    DIVORCIO BÁSICO
    Sin Hijos menores de edad
    Sin Bienes
    99€
    Por cónyuge
    
    DIVORCIO CON HIJOS
    Con Hijos menores de edad
    Sin Bienes
    
    150€
    Por cónyuge
    
    DIVORCIO NOTARIAL
    Sin Hijos menores de edad
    Con Bienes
    220€
    Por cónyuge  
  `,
    optional: true,
  },
};

const validationSchema = yup.object({
  areas: yup.array().of(
    yup.object({
      area: yup.string().required("Este campo es requerido"),
      cases: yup.array().of(
        yup
          .object({
            subarea: yup.string(),
          })
          .notRequired()
      ),
    })
  ),
});

const Areas = ({root, ...props}) => {
  const {cases} = props;

  return (
    <>
      <FormGroup
        fieldData={fieldsData.area}
        name="area"
        root={root}
        type="text"
      />
      <FieldArray
        name={`${root}.cases`}
        render={(arrayHelpers) => (
          <div>
            {cases.map((item, index) => (
              <div key={`${root}.cases.${index}`}>
                <FormGroup
                  fieldData={fieldsData.subarea}
                  name={`${root}.cases.${index}.subarea`}
                  type="text"
                />
                <FormGroup
                  asInput="textarea"
                  fieldData={fieldsData.comment}
                  name={`${root}.cases.${index}.comment`}
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
            <div className="text-center mb-5">
              {/*  <a
                role="button"
                className="btn-link"
                onClick={() => arrayHelpers.push({subarea: "", comment: ""})}
              >
                Nueva Subárea
              </a> */}
            </div>
          </div>
        )}
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

export const AreasArray = ({debug, initialValues, ...props}) => {
  const [values, setValues] = useState({
    areas: [{id: uuidv4(), area: "", cases: [{subarea: "", comment: ""}]}],
  });
  const [isLoading, setIsLoading] = useState(false);
  const {setToast} = useContext(Alert.AlertContext);

  useEffect(() => {
    if (initialValues.length > 0) setValues({areas: initialValues});
  }, [initialValues]);
  let validating = false;
  return (
    <Formik
      initialValues={values}
      enableReinitialize={true}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={(values) => {
        props.updateFormState({["areas"]: {...values}});
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
              name="areas"
              render={(arrayHelpers) => (
                <div>
                  <div className="form-array-wrapper">
                    {values.areas.map((area, index) => (
                      <div key={`areas.${index}`} className="form-array">
                        <Areas root={`areas.${index}`} cases={area.cases} />
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
                          cases: [{subarea: "", comment: ""}],
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
              formName="areas"
            /> */}
          </Form>
        );
      }}
    </Formik>
  );
};

const updateValidationSchema = yup.object({
  areas: yup.array().of(
    yup.object({
      area: yup.string().required("Este campo es requerido"),
      cases: yup.array().of(
        yup.object({
          subarea: yup.string(),
        })
      ),
    })
  ),
});

export const AreasUpdate = ({debug, area, initialValues, ...props}) => {
  const {bindSubmitForm, onFormSubmit} = props;

  const operation = initialValues ? "update" : "create";
  return (
    <Formik
      initialValues={
        initialValues
          ? initialValues
          : {area: area, cases: [{subarea: "", comment: ""}], id: uuidv4()}
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
            <FieldArray
              name={`cases`}
              render={(arrayHelpers) => (
                <div>
                  {values.cases.map((item, index) => (
                    <div key={`cases.${index}`}>
                      <FormGroup
                        fieldData={fieldsData.subarea}
                        name={`cases.${index}.subarea`}
                        type="text"
                      />
                      <FormGroup
                        asInput="textarea"
                        fieldData={fieldsData.comment}
                        name={`cases.${index}.comment`}
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
                  <div className="text-center mb-5">
                    {/* <a
                      role="button"
                      className="btn-link"
                      onClick={() =>
                        arrayHelpers.push({subarea: "", comment: ""})
                      }
                    >
                      Nueva Subárea
                    </a> */}
                  </div>
                </div>
              )}
            />
            {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
            {debug ? <pre>{JSON.stringify(errors, null, 2)}</pre> : ""}
          </form>
        );
      }}
    </Formik>
  );
};

export default Areas;
