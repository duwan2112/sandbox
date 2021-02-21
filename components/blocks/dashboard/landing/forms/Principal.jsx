import React, {useContext, useEffect, useState} from "react";
import {Formik, Form, FieldArray} from "formik";
import * as yup from "yup";
import FormGroup from "../../forms/FormGroup";
import {v4 as uuidv4} from "uuid";
import {Alert} from "../../../../contexts/index";
import Handler from "./Handler";
const fieldsData = {
  title: {
    label: "Titulo principal",
    placeholder: "Separación, divorcio y nulidad",
  },
  description: {
    label: "Descripción principal",
    placeholder:
      "Nuestro equipo de abogados expertos en divorcios te asesorá en todo momento",
  },
  comment: {
    label: "Comentario",
    placeholder:
      "¿Eres infeliz en tu matrimonio y estás pensando en el divorcio? ¿O tal vez su pareja tuvo una aventura y se mudó? Independientemente de las circunstancias, es natural preocuparse por el futuro, sus finanzas, su hogar y sus hijos. No te preocupes, estamos aquí para ayudarte.",
  },
  allTitle: {
    label: "Titulo del comentario",
    placeholder: "Qué esperar de la primera reunión con su abogado",
  },
  allComment: {
    label: "Comentario",
    placeholder:
      "En la primera reunión, discutirá los motivos de la ruptura de su matrimonio. Se le pedirá que proporcione la fecha de separación, los detalles de los hijos de la familia, incluidos los arreglos futuros propuestos para su cuidado, los detalles de sus propios activos y los de su pareja, ingresos, ahorros e intereses de pensión. La primera reunión es en gran medida un ejercicio de búsqueda de hechos para permitir que su abogado le asesore adecuadamente sobre los mejores próximos pasos. En esa reunión, puede esperar obtener más información sobre sus opciones, incluidos los procesos que puede utilizar para llegar a una resolución en su caso, ya sea mediante negociación, colaboración, mediación, arbitraje o litigio. También tendrá una mejor comprensión de cómo podría ser su futuro",
  },
};

const validationSchema = yup.object({
  title: yup.string().required("Este campo es requerido"),
  comment: yup.string().required("Este campo es requerido"),
  description: yup.string().required("Este campo es requerido"),
  all: yup.array().of(
    yup.object({
      title: yup.string().required("Este campo es requerido"),
      comment: yup.string().required("Este campo es requerido"),
    })
  ),
});

const ActiveSubmit = ({handleSubmit}) => {
  const {state} = useContext(Alert.AlertContext);
  useEffect(() => {
    if (state.activeLanding) handleSubmit();
  }, [state.activeLanding]);

  return null;
};

export default function Principal({updateState}) {
  const [values, setValues] = useState({
    title: "",
    description: "",
    comment: "",
    all: [],
    id: uuidv4(),
  });

  return (
    <Formik
      enableReinitialize={true}
      validateOnChange={false}
      validationSchema={validationSchema}
      isValidating={false}
      onSubmit={(e) => {
        updateState({principal: e});
      }}
      initialValues={values}
    >
      {({values, handleSubmit}) => {
        return (
          <Form>
            <ActiveSubmit handleSubmit={handleSubmit} />
            <div style={{marginTop: "5rem"}}>
              {" "}
              <FormGroup
                fieldData={fieldsData.title}
                name="title"
                type="text"
              />
              <FormGroup
                fieldData={fieldsData.description}
                name="description"
                type="text"
                asInput
              />
              <FormGroup
                fieldData={fieldsData.comment}
                name="comment"
                type="text"
                asInput
              />{" "}
              <FieldArray
                name="all"
                render={(arrayHelpers) => (
                  <div>
                    {values.all.map((comment, index) => (
                      <div key={`all.${index}`}>
                        <FormGroup
                          name={`all.${index}.title`}
                          type="text"
                          fieldData={fieldsData.allTitle}
                          asInput
                        />
                        <FormGroup
                          name={`all.${index}.comment`}
                          type="text"
                          fieldData={fieldsData.allComment}
                          asInput
                        />

                        {index >= 0 ? (
                          <div className="text-right mb-5">
                            <a
                              className="btn-link btn-link--black"
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

                    <div className=" mb-5">
                      <a
                        className="btn-link"
                        role="button"
                        onClick={async () => {
                          arrayHelpers.push({
                            title: "",
                            id: uuidv4(),
                            comment: "",
                          });
                          //await props.submitFormData(values);
                        }}
                      >
                        Añadir nuevo comentario
                      </a>
                    </div>
                  </div>
                )}
              ></FieldArray>
            </div>
            <Handler
              updateFormState={updateState}
              validationSchema={validationSchema}
              formName="principal"
            ></Handler>
          </Form>
        );
      }}
    </Formik>
  );
}
