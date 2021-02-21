import {useEffect} from "react";
import {useFormikContext} from "formik";

const Handler = ({updateFormState, formName, validationSchema}) => {
  const {values, submitForm} = useFormikContext();

  useEffect(() => {
    if (validationSchema) {
      validationSchema
        .validate(values)
        .then(() => {
          if (!formName) updateFormState(values);
          else {
            updateFormState({[formName]: {...values}});
          }
        })
        .catch((error) => {
          if (!formName) updateFormState({});
          else {
            updateFormState({[formName]: null});
          }
        });
    }
  }, [values]);

  return null;
};

export default Handler;
