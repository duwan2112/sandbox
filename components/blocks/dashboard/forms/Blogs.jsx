import {useEffect, useState, useContext} from "react";
import FormGroup from "./FormGroup";
import {Formik, Form, FieldArray} from "formik";
import Handler from "./Handler";
import * as yup from "yup";
import {Alert} from "../../../contexts/index";
import ReactLoading from "react-loading";
import {v4 as uuidv4} from "uuid";
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

const validationSchema = yup.object({
  blogs: yup.array().of(
    yup.object({
      area: yup.string().required("Este campo es requerido"),
      question: yup.string().required("Este campo es requerido"),
      answer: yup.string().required("Este campo es requerido"),
    })
  ),
});

const Blogs = ({root}) => {
  return (
    <>
      <FormGroup
        fieldData={fieldsData.area}
        name="area"
        root={root}
        type="text"
      />
      <FormGroup
        fieldData={fieldsData.question}
        name="question"
        root={root}
        type="text"
      />
      <FormGroup
        fieldData={fieldsData.answer}
        asInput="textarea"
        name="answer"
        root={root}
        type="text"
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

export const BlogArray = ({debug, initialValues, ...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {setToast} = useContext(Alert.AlertContext);
  const [values, setValues] = useState({
    blogs: [{area: "", question: "", answer: "", id: uuidv4()}],
  });

  useEffect(() => {
    if (initialValues.length > 0) setValues({blogs: initialValues});
  }, [initialValues]);
  let validating;
  return (
    <Formik
      initialValues={values}
      enableReinitialize={true}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        props.updateFormState({["blogs"]: {...values}});
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
              name="blogs"
              render={(arrayHelpers) => (
                <div>
                  <div className="form-array-wrapper">
                    {values.blogs.map((lawyer, index) => (
                      <div key={`blogs.${index}`} className="form-array">
                        <Blogs root={`blogs.${index}`} />
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
                          question: "",
                          answer: "",
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
              formName="blogs"
            /> */}
          </Form>
        );
      }}
    </Formik>
  );
};

const updateValidationSchema = yup.object({
  area: yup.string().required("Este campo es requerido"),
  question: yup.string().required("Este campo es requerido"),
  answer: yup.string().required("Este campo es requerido"),
});

export const BlogsUpdate = ({debug, initialValues, ...props}) => {
  const {bindSubmitForm, onFormSubmit} = props;

  let operation = initialValues ? "update" : "create";
  if (initialValues && (!initialValues.question || !initialValues.answer))
    operation = "create";

  useEffect(() => {
    return () => {
      initialValues = null;
    };
  }, []);

  return (
    <Formik
      initialValues={
        initialValues
          ? initialValues
          : {area: "", question: "", answer: "", id: uuidv4()}
      }
      enableReinitialize={true}
      onSubmit={(data) => {
        onFormSubmit(data, operation);
      }}
    >
      {({values, errors, handleSubmit, submitForm}) => {
        bindSubmitForm(submitForm);

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
            />
            {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
            {debug ? <pre>{JSON.stringify(errors, null, 2)}</pre> : ""}
          </form>
        );
      }}
    </Formik>
  );
};

export default Blogs;
