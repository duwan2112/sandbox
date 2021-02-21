import React, {useState, useEffect, useContext} from "react";
import {Field} from "formik";
import {Alert} from "../../../../contexts/index";
export default function Lawyers({lawyers, updateState}) {
  const [selectLawyers, setSelectedLawyers] = useState([]);
  const [option, setOption] = useState("");
  const {state} = useContext(Alert.AlertContext);
  const onSelect = (e) => {
    const newLayers = selectLawyers.find(
      (element) => element.id === e.target.value
    );
    if (newLayers) return;

    setOption(e.target.value);
    const newLawyer = lawyers.find((element) => element.id === e.target.value);
    setSelectedLawyers([...selectLawyers, newLawyer]);
    updateState({lawyers: [...selectLawyers, newLawyer]});
    setOption("");
  };

  const deleteLawyer = (id) => {
    const newLayers = selectLawyers.filter((element) => element.id !== id);

    updateState({lawyers: newLayers});
    setSelectedLawyers(newLayers);
  };

  useEffect(() => {
    if (state.activeLanding) {
      updateState({lawyers: selectLawyers});
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
        Abogados
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
        <option value="">Elige un abogado</option>
        {lawyers.map((element, i) => {
          return (
            <option key={i} value={element.id}>
              {element.fullName}
            </option>
          );
        })}
      </select>
      <div className="form-group">
        {selectLawyers.map((element, i) => {
          return (
            <div key={i}>
              <label className="mt-5" htmlFor="">
                Abogado
              </label>{" "}
              <input
                onChange={console.log("change")}
                value={element.fullName}
                className="form-control "
                type="text"
              />{" "}
              <div className="d-flex justify-content-end mt-3 pl-4 pr-4">
                {" "}
                <button
                  onClick={() => {
                    deleteLawyer(element.id);
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
      </div>
    </>
  );
}
