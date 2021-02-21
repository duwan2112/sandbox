import React, {useState, useContext, useEffect} from "react";
import {Formik, Form, FieldArray} from "formik";
import FormGroup from "../../forms/FormGroup";
import * as yup from "yup";
import {v4 as uuidv4} from "uuid";
import {Alert} from "../../../../contexts/index";
const fieldsData = {
  name: {label: "Nombre del cliente", placeholder: "Lucas G."},
  location: {label: "Localización del cliente", placeholder: "Madrid"},
  comment: {
    label: "Comentario",
    placeholder:
      "Javier me ayudó con la herencia de mis padres. Se nota que sabe mucho del tema y hizo que todo el proceso fuese muy fácil.",
  },
};
import Handler from "./Handler";

const validationSchema = yup.object({
  testimonials: yup.array().of(
    yup.object({
      name: yup.string().required("es requerido"),
      location: yup.string().required("es requerido"),
      comment: yup
        .string()
        .max(700, "Maximo 700 caracteres")
        .required("es requerido"),
    })
  ),
});

export default function Testimonials({updateState}) {
  const [values, setValues] = useState({
    testimonials: [{name: "", location: "", comment: "", id: uuidv4()}],
  });
  return (
    <>
      <p
        style={{
          fontSize: "20px",
          fontWeight: "600",
          paddingBottom: "1.5rem",
          color: "#303030",
          paddingTop: "3rem",
        }}
      >
        Testimonios de clientes
        <span
          style={{
            paddingLeft: "1rem",
            fontSize: "16px",
            opacity: "0.5",
            fontWeight: "300",
          }}
        >
          (opcional)
        </span>
      </p>
      <Formik
        enableReinitialize={true}
        initialValues={values}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={(e) => {
          const newE = e.clients.filter(
            (element) =>
              element.name !== "" &&
              element.location !== "" &&
              element.comment !== ""
          );

          updateState({testimonials: newE});
        }}
      >
        {({values, handleSubmit}) => (
          <>
            <FieldArray
              name="testimonials"
              render={(arrayHelpers) => (
                <div>
                  <div className="form-array-wrapper">
                    {values.testimonials.map((lawyer, index) => (
                      <div key={`testimonials.${index}`} className="form-array">
                        <FormGroup
                          fieldData={fieldsData.name}
                          name="name"
                          root={`testimonials.${index}`}
                          type="text"
                        />
                        <FormGroup
                          fieldData={fieldsData.location}
                          name="location"
                          root={`testimonials.${index}`}
                          type="text"
                        />
                        <FormGroup
                          fieldData={fieldsData.comment}
                          asInput="textarea"
                          name="comment"
                          root={`testimonials.${index}`}
                          type="text"
                        />
                        {index > 0 ? (
                          <div className="text-right mb-5">
                            <a
                              className="btn-link delete"
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
                  <div className=" mb-5">
                    <a
                      className="btn-link"
                      onClick={async () => {
                        arrayHelpers.push({
                          name: "",
                          location: "",
                          comment: "",
                          id: uuidv4(),
                        });
                        //await props.submitFormData(values);
                      }}
                    >
                      Añadir nuevo testimonio
                    </a>
                  </div>
                </div>
              )}
            />
            <Handler
              updateFormState={updateState}
              validationSchema={validationSchema}
              formName="testimonials"
            ></Handler>
          </>
        )}
      </Formik>
    </>
  );
}
