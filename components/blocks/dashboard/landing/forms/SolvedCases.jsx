import React, {useState, useEffect, useContext} from "react";
import {Formik, Form, FieldArray} from "formik";
import {Alert} from "../../../../contexts/index";
import {v4 as uuidv4} from "uuid";
import * as yup from "yup";
import Handler from "./Handler";
import FormGroup from "../../forms/FormGroup";
const fieldsData = {
  area: {label: "Área", placeholder: "Tráfico"},
  title: {
    label: "Título",
    placeholder:
      "Reducción de la pena bajo las influencias de bebidas alcohólicas",
  },
  comment: {
    label: "Comentario",
    placeholder: `Conseguida conformidad de 40 días de trabajo en beneficio de la comunidad en un delito de conducción bajo las influencias de bebidas alcohólicas que puede conllevar una pena de prisión de entre tres y seis meses.

Asimismo, se ha conseguido que una pena por un delito contra la seguridad Vial por negativa a realizar las pruebas se haya rebajado a 4 meses de prisión y privación del derecho a conducir vehículos a motor durante 8 meses, pudiendo haber alcanzado una pena de prisión de 6 meses a un año con privación del derecho a conducir vehículos a motor y ciclomotores por tiempo superior a 1 y hasta cuatro años, tal y como se establece en el Código Penal.
  
En esta ocasión, la labor del despacho ha evitado peores consecuencias, aunque siempre se hace importante recordar, y más en estas fechas, la necesidad de evitar conducir bajo los efectos del alcohol, cuyo consumo puede suponer no solo la comisión de un delito castigado con penas de prisión, sino fatales consecuencias.
  `,
  },
  honors: {
    label: "Honorarios",
    placeholder: "350€",
    optional: true,
  },
};

const validationSchema = yup.object({
  solvedCases: yup.array().of(
    yup.object({
      area: yup.string().required("Este campo es requerido"),
      title: yup.string().required("Este campo es requerido"),
      comment: yup.string().required("Este campo es requerido"),

      honors: yup.string().notRequired(),
    })
  ),
});

const SolvedCasesNew = ({root}) => {
  return (
    <>
      <FormGroup
        fieldData={fieldsData.area}
        name="area"
        root={root}
        type="text"
      />
      <FormGroup
        fieldData={fieldsData.title}
        name="title"
        root={root}
        type="text"
      />
      <FormGroup
        fieldData={fieldsData.comment}
        asInput="textarea"
        name="comment"
        root={root}
        type="text"
      />
      <FormGroup
        fieldData={fieldsData.honors}
        name="honors"
        root={root}
        type="number"
      />
    </>
  );
};

export default function SolvedCases({solvedCases, updateState}) {
  const [selectSolved, setSelectedSolved] = useState([]);
  const [option, setOption] = useState("");
  const [listOfSolved, setListOfSolved] = useState(solvedCases);
  const [newSolvedCases, setNewSolvedCases] = useState({solvedCases: []});
  const {state} = useContext(Alert.AlertContext);
  const onSelect = (e) => {
    const newSolveds = selectSolved.find(
      (element) => element.id === e.target.value
    );
    if (newSolveds) return;

    const newSolved = solvedCases.find(
      (element) => element.id === e.target.value
    );

    const newListOfBlogs = listOfSolved.filter(
      (element) => element.id !== newSolved.id
    );
    setListOfSolved(newListOfBlogs);
    updateState({solvedCases: [...selectSolved, newSolved]});
    setSelectedSolved([...selectSolved, newSolved]);
    setOption("");
  };

  const deleteSolved = (id) => {
    const deleteSolved = selectSolved.filter((element) => element.id === id);
    const newListOfSolved = listOfSolved;
    newListOfSolved.push(...deleteSolved);
    setListOfSolved(newListOfSolved);

    const newSolveds = selectSolved.filter((element) => element.id !== id);
    updateState({solvedCases: newSolveds});
    setSelectedSolved(newSolveds);
  };

  useEffect(() => {
    if (state.activeLanding) {
      updateState({solvedCases: selectSolved});
    }
  }, [state.activeLanding]);

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
        Casos Resueltos
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
        <option value="">Elige un caso resuelto</option>
        {listOfSolved.map((element, i) => {
          return (
            <option key={i} value={element.id}>
              {element.title}
            </option>
          );
        })}
      </select>
      <div className="form-group">
        {selectSolved.map((element, i) => {
          return (
            <div key={i}>
              <label className="mt-5" htmlFor="">
                Caso resuelto
              </label>{" "}
              <input
                onChange={console.log("change")}
                value={element.title}
                className="form-control "
                type="text"
              />{" "}
              <div className="d-flex justify-content-end mt-3 pl-4 pr-4">
                {" "}
                <button
                  onClick={() => {
                    deleteSolved(element.id);
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
            initialValues={newSolvedCases}
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
                    name="solvedCases"
                    render={(arrayHelpers) => (
                      <div>
                        <div className="form-array-wrapper">
                          {values.solvedCases.map((lawyer, index) => (
                            <div
                              key={`solvedCases.${index}`}
                              className="form-array"
                            >
                              <SolvedCasesNew root={`solvedCases.${index}`} />
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
                                title: "",
                                comment: "",
                                honors: "",
                                id: uuidv4(),
                              });
                              //await props.submitFormData(values);
                            }}
                          >
                            Añadir nuevo caso resuelto
                          </a>
                        </div>
                      </div>
                    )}
                  />
                  <Handler
                    updateFormState={updateState}
                    validationSchema={validationSchema}
                    formName="solvedCases2"
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
