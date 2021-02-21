import React, {useState, useEffect, useContext} from "react";
import {Field} from "formik";
import {Alert} from "../../../../contexts/index";
import {Formik, Form, FieldArray} from "formik";
import * as yup from "yup";
import {v4 as uuidv4} from "uuid";
import FormGroup from "../../forms/FormGroup";
import Handler from "./Handler";
const fieldsData = {
  area: {label: "Área", placeholder: "Laboral"},
  question: {
    label: "Pregunta",
    placeholder: "¿Qué hacer ante una situación de acoso laboral o mobbing?",
  },
  answer: {
    label: "Respuesta",
    placeholder: `El acoso laboral es castigado por el artículo 173.1 del Código Penal (CP) con una pena de prisión de seis meses a dos años. Dicho precepto penaliza a quien, en el ámbito laboral o funcionarial, y prevaliéndose de una relación de superioridad, realice contra un empleado, de forma reiterada, actos hostiles o humillantes que supongan un grave acoso contra el trabajador.

La jurisprudencia ha definido el mobbing como "toda situación o conducta que, por su reiteración en el tiempo, por su carácter degradante de las condiciones de trabajo y por la hostilidad o intimidación del ambiente laboral que general, tiene por finalidad o como resultado atentar o poner en peligro la integridad del trabajador".
  
Así, para que los tribunales lo aprecien, tienen que darse tres elementos. En primer lugar no puede ser un hecho aislado, requiere que la presión a la que se está sometiendo al trabajador sea sistemática (por ejemplo, varias veces a la semana) y prolongada (durante varios meses). En segundo término, el tipo de actos sufridos deben ser hostiles (gritos, enfados, comentarios que le atemoricen, etc.) o (se le deja en ridículo, se desprecia su trabajo, se le sitúa a hacer funciones muy por debajo de su cualificación, etc.). Finalmente, el resultado o la finalidad de estas conductas debe ser poner en peligro o menoscabar la integridad del trabajador.
  
Las fórmulas a través de las cuales se puede manifestar el acoso laboral son múltiples: ninguneo, hostigamiento, amilanamiento, amenazas, arrinconar, vejar, etc.
  `,
  },
};

const validationSchema = yup.object({
  blogs: yup.array().of(
    yup.object({
      area: yup.string().required("Este campo es requerido"),
      question: yup.string().required("Este campo es requerido"),
      answer: yup.string().required("Este campo es requerido"),
    })
  ),
});

const Blogs = ({root}) => {
  return (
    <>
      <FormGroup
        fieldData={fieldsData.area}
        name="area"
        root={root}
        type="text"
      />
      <FormGroup
        fieldData={fieldsData.question}
        name="question"
        root={root}
        type="text"
      />
      <FormGroup
        fieldData={fieldsData.answer}
        asInput="textarea"
        name="answer"
        root={root}
        type="text"
      />
    </>
  );
};

export default function SolvedCases({blogs, updateState}) {
  const [selectBlog, setSelectedBlog] = useState([]);
  const [listOfBlogs, setListOfBlogs] = useState(blogs);
  const [option, setOption] = useState("");
  const {state} = useContext(Alert.AlertContext);
  const [newBlogs, setNewBlogs] = useState({
    blogs: [],
  });
  const onSelect = (e) => {
    const newBlogs = selectBlog.find(
      (element) => element.id === e.target.value
    );
    if (newBlogs) return;

    const newBlog = blogs.find((element) => element.id === e.target.value);

    const newListOfBlogs = listOfBlogs.filter(
      (element) => element.id !== newBlog.id
    );

    setListOfBlogs(newListOfBlogs);
    setSelectedBlog([...selectBlog, newBlog]);
    updateState({blogs: [...selectBlog, newBlog]});
    setOption("");
  };

  const deleteBlog = (id) => {
    const deleteBlog = selectBlog.filter((element) => element.id === id);
    const newListOfBlogs = listOfBlogs;
    newListOfBlogs.push(...deleteBlog);
    setListOfBlogs(newListOfBlogs);

    const newBlogs = selectBlog.filter((element) => element.id !== id);
    updateState({blogs: newBlogs});
    setSelectedBlog(newBlogs);
  };

  useEffect(() => {
    if (state.activeLanding) {
      updateState({blogs: selectBlog});
    }
  }, [state.activeLanding]);

  const onClickNewBlog = () => {
    const getNewBlogs = newBlogs;
    getNewBlogs.push({area: "", question: "", answer: ""});
    console.log(getNewBlogs);
  };

  return (
    <>
      <p
        style={{
          fontSize: "20px",
          fontWeight: "600",
          paddingBottom: "1.5rem",
          color: "#303030",
        }}
      >
        Entradas de blogs
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
      <select onChange={onSelect} value={option} name="" id="">
        <option value="">Elige una entra de blog</option>
        {listOfBlogs.map((element, i) => {
          return (
            <option key={i} value={element.id}>
              {element.question}
            </option>
          );
        })}
      </select>
      <div className="form-group">
        {selectBlog.map((element, i) => {
          return (
            <div key={i}>
              <label className="mt-5" htmlFor="">
                Entradas de blogs
              </label>{" "}
              <input
                onChange={console.log("change")}
                value={element.question}
                className="form-control "
                type="text"
              />{" "}
              <div className="d-flex justify-content-end mt-3 pl-4 pr-4">
                {" "}
                <button
                  onClick={() => {
                    deleteBlog(element.id);
                  }}
                  role="button"
                  className="p-2 pt-3 btn btn-link btn-link--black "
                >
                  Eliminar
                </button>{" "}
              </div>{" "}
            </div>
          );
        })}
        <div className="mt-5">
          <Formik
            initialValues={newBlogs}
            enableReinitialize={true}
            validateOnChange={false}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("send");
            }}
          >
            {({values, isValidating, errors}) => {
              return (
                <Form>
                  <FieldArray
                    name="blogs"
                    render={(arrayHelpers) => (
                      <div>
                        <div className="form-array-wrapper">
                          {values.blogs.map((lawyer, index) => (
                            <div key={`blogs.${index}`} className="form-array">
                              <Blogs root={`blogs.${index}`} />
                              {index >= 0 ? (
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
                        <div className=" mb-5 ">
                          <a
                            className="btn-link"
                            role="button"
                            onClick={async () => {
                              arrayHelpers.push({
                                area: "",
                                question: "",
                                answer: "",
                                id: uuidv4(),
                              });
                              //await props.submitFormData(values);
                            }}
                          >
                            Añadir nueva entrada de blog
                          </a>
                        </div>
                      </div>
                    )}
                  />
                  <Handler
                    updateFormState={updateState}
                    validationSchema={validationSchema}
                    formName="blogs2"
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}
