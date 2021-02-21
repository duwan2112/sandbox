import {Field, useField} from "formik";
import TextareaAutosize from "react-autosize-textarea";
import styled from "styled-components";

const StyledForm = ({value, count}) => {
  return (
    <>
      <style jsx>
        {`
          position: relative;
          bottom: 25px;
          font-size: 15px;
          color: rgba(0, 0, 0, 0.7);
          text-align: right;
          padding-right: 10px;
        `}
      </style>
      <div>
        {" "}
        {value} / {count === "700" ? "700" : "3500"}{" "}
      </div>
    </>
  );
};

const FormGroup = ({
  name,
  root,
  fieldData,
  type,
  asInput,
  className,
  maxLength,
  radius,
  count,
}) => {
  const {label, placeholder, optional} = fieldData;
  const indentifier = root ? `${root}.${name}` : name;
  const [field, meta] = useField(indentifier);

  let style = null;
  if (className) {
    style = className.split(" ");
  }

  return (
    <>
      <div className="form-group">
        {label ? (
          <label htmlFor={indentifier}>
            {label} {optional ? <span>(opcional)</span> : ""}
          </label>
        ) : (
          ""
        )}
        <Field
          as={asInput ? TextareaAutosize : null}
          className={`form-control 
           ${className ? className : ""} 
           ${meta.error && meta.touched ? "form-control--error" : ""} 
           ${radius === "top" && "top-border"}
           ${radius === "center" && "center-border"}
           ${radius === "bottom" && "bottom-border"}
        `}
          name={indentifier}
          type={type}
          placeholder={placeholder}
          id={indentifier}
          maxLength={maxLength}
        />

        {meta.error && meta.touched && (
          <span className="form-group__error">{meta.error}</span>
        )}
      </div>

      {style && <StyledForm count={count} value={meta.value.length} />}
    </>
  );
};

export default FormGroup;
