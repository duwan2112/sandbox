import styled from "styled-components";
import FormGroup from "./FormGroup";
import * as yup from "yup";
import { Field, useField } from "formik";

export const fieldsData = {
  number: {
    label: "Número de la tarjeta",
    placeholder: "1111 2222 3333 4444",
  },
  expiration: {
    label: "Caducidad",
  },

  code: {
    label: "Código de seguridad",
    placeholder: "123",
  },
};

export const creditValSchema = yup.object({
  number: yup
    .number()
    .min(16, "Faltan numeros")
    .required("Este campo es requerido"),
  expiration: yup.object({
    month: yup.string().required("Falta un campo por llenar"),
    year: yup
      .number()
      .min(4, "Año invalido")
      .required("Falta un campo por llenar"),
  }),
  code: yup
    .number()
    .min(3, "Codigo invalido")
    .required("Este campo es requerido"),
});

export const creditInitVals = {
  number: "",
  expiration: {
    month: "",
    year: "",
  },
  code: "",
};

const CardsWrapper = styled.div`
  img {
    width: 3.5rem;
    height: 2.2rem;

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const DateForm = () => {
  const [monthField, monthMeta] = useField("expiration.month");
  const [yearField, yearMeta] = useField("expiration.year");

  return (
    <div className="form-group">
      <label>Expriation</label>
      <div className="form-row">
        <div className="col-3">
          <Field
            name="expiration.month"
            placeholder="Month"
            type="string"
            className={`form-control  ${
              monthMeta.error && monthMeta.touched ? "form-control--error" : ""
            } `}
          />
        </div>
        <div className="col-3">
          <Field
            placeholder="Year"
            maxLength="4"
            type="string"
            className="form-control"
            className={`form-control  ${
              yearMeta.error && yearMeta.touched ? "form-control--error" : ""
            } `}
            name="expiration.year"
          />
        </div>
      </div>
      {/* 
        Si moth fue tocado y tiene error y 
      
      */}

      {(monthMeta.error && monthMeta.touched) || yearMeta.error ? (
        <span className="form-group__error">{monthMeta.error}</span>
      ) : null}
    </div>
  );
};

const CodeForm = () => {
  const [field, meta] = useField("code");

  return (
    <div className="form-group">
      <label htmlFor="code">{fieldsData.code.label}</label>
      <div className="form-row">
        <div className="col-3">
          <Field
            typo="number"
            maxLength="3"
            placeholder="123"
            name="code"
            id="code"
            className={`form-control  ${
              meta.error && meta.touched ? "form-control--error" : ""
            } `}
          />
        </div>
      </div>
      {meta.error && meta.touched && (
        <span className="form-group__error">{meta.error}</span>
      )}
    </div>
  );
};

const Credit = () => {
  return (
    <>
      <CardsWrapper className="d-flex mb-3">
        <img src={require("../../../../public/static/visa.png")} />
        <img src={require("../../../../public/static/mastercard.png")} />
      </CardsWrapper>
      <FormGroup fieldData={fieldsData.number} name="number" type="number" />
      <DateForm />
      <CodeForm />
    </>
  );
};

export default Credit;
