import {useEffect, useState, useContext} from "react";
import FormGroup from "./FormGroup";
import {Formik, Form} from "formik";
import Handler from "./Handler";
import * as yup from "yup";
import {server} from "../../../../utils";
import {Alert} from "../../../contexts/index";
import ReactLoading from "react-loading";

const fieldsData = {
  stepOne: {
    label: "Primer paso",
    placeholder: "Preguntanos y explicanos tu caso",
  },
  stepTwo: {
    label: "Segundo paso",
    placeholder:
      "Respondemos a tus preguntas y si te podemos ayudar te damos un presupuesto",
  },
  stepThree: {
    label: "Tercer paso",
    placeholder:
      "Si estas conforme te acompañamos y asesoramos en todo el proceso legal",
  },
};

const validationSchema = yup.object({
  stepOne: yup.string().required("Este campo es requerido"),
  stepTwo: yup.string().required("Este campo es requerido"),
  stepThree: yup.string().required("Este campo es requerido"),
});

const ActiveSubmit = ({handleSubmit}) => {
  const {state} = useContext(Alert.AlertContext);
  useEffect(() => {
    if (state.active) {
      handleSubmit();
    }
  }, [state.active]);

  return null;
};

const HowItWorks = ({debug, initialValues, ...props}) => {
  const [values, setValues] = useState({
    stepOne: "",
    stepTwo: "",
    stepThree: "",
  });

  const {confirmationActive, state} = useContext(Alert.AlertContext);

  useEffect(() => {
    if (initialValues) setValues(initialValues);
  }, [initialValues]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={values}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({values, isValidating, errors, handleSubmit}) => {
          return (
            <Form>
              <ActiveSubmit handleSubmit={handleSubmit} />
              <FormGroup
                fieldData={fieldsData.stepOne}
                asInput="textarea"
                name="stepOne"
                type="text"
              />
              <FormGroup
                fieldData={fieldsData.stepTwo}
                asInput="textarea"
                name="stepTwo"
                type="text"
              />
              <FormGroup
                fieldData={fieldsData.stepThree}
                asInput="textarea"
                name="stepThree"
                type="text"
              />

              <Handler
                updateFormState={props.updateFormState}
                validationSchema={validationSchema}
                formName="howItWorks"
              ></Handler>
              {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export const HowItWorksUpdate = ({debug, initialValues, userid, ...props}) => {
  const {bindSubmitForm} = props;
  const [flag, setFlag] = useState(true);

  const onHowItWorksSubmit = async (values) => {
    if (userid)
      await server.putAsync(`/users/website/${userid}`, {
        howItWorks: {...values},
      });
    else await server.putAsync("/users/website", {howItWorks: {...values}});
  };
  const Changeflag = () => {
    setFlag(false);
  };

  return (
    <>
      <Formik
        initialValues={
          initialValues
            ? initialValues
            : {
                stepOne: "",
                stepTwo: "",
                stepThree: "",
              }
        }
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={onHowItWorksSubmit}
      >
        {({values, submitForm, handleSubmit}) => {
          useEffect(() => {
            Changeflag();
            if (flag === false) {
              bindSubmitForm(submitForm);
            }
          }, [values]);
          return (
            <form onSubmit={handleSubmit}>
              <FormGroup
                fieldData={fieldsData.stepOne}
                asInput="textarea"
                name="stepOne"
                type="text"
              />
              <FormGroup
                fieldData={fieldsData.stepTwo}
                asInput="textarea"
                name="stepTwo"
                type="text"
              />
              <FormGroup
                fieldData={fieldsData.stepThree}
                asInput="textarea"
                name="stepThree"
                type="text"
              />

              {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default HowItWorks;
