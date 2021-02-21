import {useState, useEffect, useContext} from "react";
import {Formik, Form} from "formik";
import FormGroup from "./FormGroup";
import Handler from "./Handler";
import {server} from "../../../../utils";
import * as yup from "yup";
import ReactLoading from "react-loading";
import {Alert} from "../../../contexts/index";
const fieldsData = {
  cases: {
    label: "Ejemplos de casos",
    placeholder: "Herencia, divorcio, tráfico, etc",
  },
};

const validationSchema = yup.object({
  cases: yup.string().required("Este campo es requerido"),
});

const ActiveSubmit = ({handleSubmit}) => {
  const {state} = useContext(Alert.AlertContext);
  useEffect(() => {
    if (state.active) handleSubmit();
  }, [state.active]);

  return null;
};

const Questions = ({debug, initialValues, ...props}) => {
  const [values, setValues] = useState({cases: ""});

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
        {({values, isValidating, errors, handleSubmit}) => (
          <Form>
            <ActiveSubmit handleSubmit={handleSubmit} />

            <FormGroup fieldData={fieldsData.cases} name="cases" type="text" />
            {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}

            <Handler
              updateFormState={props.updateFormState}
              validationSchema={validationSchema}
              formName="questions"
            ></Handler>
          </Form>
        )}
      </Formik>
    </>
  );
};

export const QuestionsUpdate = ({debug, initialValues, userid, ...props}) => {
  const {bindSubmitForm} = props;
  const [flag, setFlag] = useState(true);

  const onQuestionsSubmit = async (values) => {
    if (userid)
      await server.putAsync(`/users/website/${userid}`, {
        questions: {...values},
      });
    else await server.putAsync("/users/website", {questions: {...values}});
  };

  const Changeflag = () => {
    setFlag(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues ? initialValues : {cases: ""}}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={onQuestionsSubmit}
      >
        {({values, handleSubmit, submitForm}) => {
          useEffect(() => {
            Changeflag();
            if (flag === false) {
              bindSubmitForm(submitForm);
            }
          }, [values]);

          return (
            <form onSubmit={handleSubmit}>
              <FormGroup
                fieldData={fieldsData.cases}
                name="cases"
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

export default Questions;
