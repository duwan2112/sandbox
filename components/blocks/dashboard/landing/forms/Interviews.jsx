import React, {useContext, useEffect, useState} from "react";
import {Formik, Form, FieldArray, Field} from "formik";
import * as yup from "yup";
import FormGroup from "../../forms/FormGroup";
import {v4 as uuidv4} from "uuid";
import {Alert} from "../../../../contexts/index";
import Handler from "./Handler";
const fieldsData = {
  video: {
    label: "Video",
    placeholder: "www.youtube/video-entrevista.com",
  },
  phone: {label: "Contácto por teléfono", placeholder: "916504211"},
  whatsapp: {label: "Contácto por WhatsApp", placeholder: "625678945"},
  email: {
    label: "Contácto por email",
    placeholder: "info@bufetevelazquez.com",
  },
  direction: {
    label: "Dirección",
    placeholder: "C/Velazquez, 155, 3ºA, 28005 Madrid",
  },
};

const validationSchema = yup.object({
  video: yup.string(),
  phone: yup
    .string()
    .max(16, "Maximo 20 caracteres")
    .required("Este campo es requerido"),
  whatsapp: yup
    .string()
    .max(16, "Maximo 20 caracteres")
    .required("Este campo es requerido"),
  email: yup
    .string()
    .email("El email no es valido")
    .required("Este campo es requerido"),
  direction: yup.string().required("Este campo es requerido"),
});

const ActiveSubmit = ({handleSubmit}) => {
  const {state} = useContext(Alert.AlertContext);
  useEffect(() => {
    if (state.activeLanding) handleSubmit();
  }, [state.activeLanding]);

  return null;
};

export default function Interviews({updateState}) {
  const [values, setValues] = useState({
    video: [""],
    phone: "",
    whatsapp: "",
    email: "",
    direction: [""],
  });
  const [errorDir, setErrorDir] = useState(false);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={values}
      validateOnChange={false}
      validationSchema={validationSchema}
      isValidating={false}
      onSubmit={(e) => {
        updateState({interviews: e});
      }}
    >
      {({values, handleSubmit, errors, touched}) => (
        <Form>
          <ActiveSubmit handleSubmit={handleSubmit} />
          <p
            style={{
              fontSize: "20px",
              fontWeight: "600",
              paddingBottom: "1.5rem",
              color: "#303030",
            }}
          >
            Video-entrevistas{" "}
          </p>
          <FieldArray
            name="video"
            render={(arrayHelpers) => (
              <div>
                <div className="form-group">
                  <label>Video</label>
                  {values.video.map((dir, index) => (
                    <div
                      className={`${index > 0 && "mt-5"}`}
                      key={`video.${index}`}
                    >
                      <Field
                        className="form-control"
                        placeholder="www.youtube/video-entrevista.com"
                        name={`video.${index}`}
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
                </div>

                <div className=" mb-5">
                  <a
                    className="btn-link"
                    role="button"
                    onClick={async () => {
                      arrayHelpers.push("");
                      //await props.submitFormData(values);
                    }}
                  >
                    Añadir nuevo video
                  </a>
                </div>
              </div>
            )}
          />
          <FormGroup fieldData={fieldsData.phone} name="phone" type="tel" />
          <FormGroup
            fieldData={fieldsData.whatsapp}
            name="whatsapp"
            type="tel"
          />
          <FormGroup fieldData={fieldsData.email} name="email" type="email" />
          <FieldArray
            name="direction"
            render={(arrayHelpers) => (
              <div>
                <div className="form-group">
                  <label>
                    Dirección{" "}
                    {errorDir && (
                      <span className="btn-link--danger ">
                        (rellena antes el campo de dirección)
                      </span>
                    )}
                  </label>
                  {values.direction.map((dir, index) => (
                    <div
                      className={`${index > 0 && "mt-5"}`}
                      key={`direction.${index}`}
                    >
                      <Field
                        className={`form-control   ${
                          errors.direction &&
                          touched.direction &&
                          "form-control--error"
                        } `}
                        placeholder="C/Velazquez, 155, 3ºA, 28005 Madrid"
                        name={`direction.${index}`}
                        type="text"
                      />
                      {errors.direction && touched.direction && (
                        <span className="form-group__error">
                          {errors.direction}
                        </span>
                      )}

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
                </div>
                <div className="text-center mb-5">
                  <a
                    className="btn-link"
                    role="button"
                    onClick={async () => {
                      if (values.direction[0] !== "") {
                        setErrorDir(false);
                        return arrayHelpers.push("");
                      }
                      setErrorDir(true);

                      //await props.submitFormData(values);
                    }}
                  >
                    Añadir nueva dirección
                  </a>
                </div>{" "}
              </div>
            )}
          />
          <Handler
            updateFormState={updateState}
            validationSchema={validationSchema}
            formName="interviews"
          ></Handler>
        </Form>
      )}
    </Formik>
  );
}
