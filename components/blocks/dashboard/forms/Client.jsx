import {useState, useEffect, useContext} from "react";
import {Formik, Form, FieldArray} from "formik";
import FormGroup from "./FormGroup";
import Handler from "./Handler";
import * as yup from "yup";
import {Alert} from "../../../contexts/index";

const fieldsData = {
  name: {label: "Nombre del cliente", placeholder: "Lucas G."},
  location: {label: "Localización del cliente", placeholder: "Madrid"},
  comment: {
    label: "Comentario",
    placeholder:
      "Javier me ayudó con la herencia de mis padres. Se nota que sabe mucho del tema y hizo que todo el proceso fuese muy fácil.",
  },
};

const Client = ({root}) => {
  return (
    <>
      <FormGroup
        fieldData={fieldsData.name}
        name="name"
        root={root}
        type="text"
      />
      <FormGroup
        fieldData={fieldsData.location}
        name="location"
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
    </>
  );
};

const validationSchema = yup.object({
  clients: yup.array().of(
    yup.object({
      name: yup.string().required("Este campo es requerido"),
      location: yup.string().required("Este campo es requerido"),
      comment: yup
        .string()
        .max(700, "Maximo 700 caracteres")
        .required("Este campo es requerido"),
    })
  ),
});

const ActiveSubmit = ({handleSubmit}) => {
  const {state} = useContext(Alert.AlertContext);
  useEffect(() => {
    if (state.active) handleSubmit();
  }, [state.active]);

  return null;
};

export const ClientArray = ({debug, initialValues, ...props}) => {
  const [values, setValues] = useState({
    clients: [{name: "", location: "", comment: ""}],
  });

  useEffect(() => {
    if (initialValues.length > 0) setValues({clients: initialValues});
  }, [initialValues]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={values}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={() => {}}
    >
      {({values, isValidating, errors, handleSubmit}) => {
        return (
          <Form>
            <ActiveSubmit handleSubmit={handleSubmit} />

            <FieldArray
              name="clients"
              render={(arrayHelpers) => (
                <div>
                  <div className="form-array-wrapper">
                    {values.clients.map((lawyer, index) => (
                      <div key={`clients.${index}`} className="form-array">
                        <Client root={`clients.${index}`} />
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
                      onClick={async () => {
                        arrayHelpers.push({
                          name: "",
                          location: "",
                          comment: "",
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
            {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
            <Handler
              updateFormState={props.updateFormState}
              validationSchema={validationSchema}
              formName="clients"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

const updateValidationSchema = yup.object({
  name: yup.string().required("Este campo es requerido"),
  location: yup.string().required("Este campo es requerido"),
  comment: yup
    .string()
    .max(700, "Maximo 700 caracteres")
    .required("Este campo es requerido"),
});

export const ClientUpdate = ({debug, initialValues, ...props}) => {
  const {bindSubmitForm, onFormSubmit} = props;

  const operation = initialValues ? "update" : "create";

  return (
    <Formik
      initialValues={
        initialValues ? initialValues : {name: "", location: "", comment: ""}
      }
      enableReinitialize={true}
      validationSchema={updateValidationSchema}
      onSubmit={(data) => onFormSubmit(data, operation)}
    >
      {({values, errors, handleSubmit, submitForm}) => {
        bindSubmitForm(submitForm);

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
            {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
            {debug ? <pre>{JSON.stringify(errors, null, 2)}</pre> : ""}
          </form>
        );
      }}
    </Formik>
  );
};

export default Client;
