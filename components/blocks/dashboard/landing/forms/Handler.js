import {useEffect} from "react";
import {useFormikContext} from "formik";

const Handler = ({updateFormState, formName, validationSchema}) => {
  const {values, submitForm} = useFormikContext();

  useEffect(() => {
    if (validationSchema) {
      validationSchema
        .validate(values)
        .then(() => {
          updateFormState({[formName]: {...values}});
        })
        .catch((error) => {});
    }
  }, [values]);

  return null;
};

export default Handler;
