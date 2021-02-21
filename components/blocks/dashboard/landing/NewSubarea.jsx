import React, {useState, useEffect} from "react";
import {Input} from "reactstrap";
import styled from "styled-components";
import {Formik, Form} from "formik";
import FormGroup from "../forms/FormGroup";
import Principal from "./forms/Principal";
import Interviews from "./forms/Interviews";
import Lawyers from "./forms/Lawyers";
import Testimonials from "./forms/Testimonials";
import SolvedCases from "./forms/SolvedCases";
import Blogs from "./forms/Blogs";
import {CodeSharp} from "@material-ui/icons";

const Container = styled.div`
  select {
    padding: 1.8rem 0;
    border-radius: 3px;
    background: #eeeeee;
    width: 100%;
    border: none;
    color: black;
    font-size: 2rem;
    padding-left: 3rem;
    background: #5591f5;
    color: white;
    &:focus {
      outline: none;
      border: none;
    }

    option {
      background: #ededed !important ;
      color: black;
      border: none;
      &:hover {
      }
    }
  }

  .subtitle {
    font-size: 1.6rem;
    font-weight: 600;
    padding: 1rem;
  }

  a {
    font-family: "Quicksand", sans-serif;
    font-weight: bold;
  }
  .btn-link--black,
  .delete {
    font-weight: 500;
  }
`;

export default function NewSubarea({
  areas,
  lawyers,
  solvedCases,
  blogs,
  updateState,
}) {
  const [filterAreas, setFilterAreas] = useState(null);
  const [selectArea, setSelectArea] = useState("");
  const [selectSubArea, setSelectSubArea] = useState("select");
  const [infoSubarea, setInfoSubArea] = useState(null);

  const onClickSelect = (e) => {
    setSelectArea(e.target.value);
    setSelectSubArea("select");
    setInfoSubArea(null);
    updateState({
      subareaId: "",
      subareaName: "",
    });
  };
  const onClickSelectSub = (e) => {
    if (e.target.value === "select") {
      setSelectSubArea(e.target.value);
      updateState({
        subareaId: "",
        subareaName: "",
      });
      return setInfoSubArea(null);
    }

    const area = areas.find((element) => element.id === e.target.value);

    setSelectSubArea(e.target.value);
    setInfoSubArea(e.target.value);
    updateState({
      subareaId: e.target.value,
      subareaName: area.cases[0].subarea,
    });
  };

  useEffect(() => {
    const removeDuplicates = (data) => {
      let newAreas = [];

      data.map((area) => {
        if (newAreas.length === 0) {
          newAreas.push({area: area.area});
        } else {
          const findOne = newAreas.find(
            (element) => element.area === area.area
          );
          if (!findOne) {
            return newAreas.push({area: area.area});
          }
        }
      });

      setFilterAreas(newAreas);
    };

    removeDuplicates(areas);
  }, []);
  return (
    <Container className="container">
      <div className="form-container">
        <p className="subtitle">Elegir una subárea</p>
        {filterAreas && (
          <>
            <select onChange={onClickSelect} value={selectArea} name="" id="">
              <option value="">Area</option>
              {filterAreas.map((element, i) => {
                return (
                  <option key={i} value={element.area}>
                    {element.area}
                  </option>
                );
              })}
            </select>
            <select
              onChange={onClickSelectSub}
              value={selectSubArea}
              className="mt-3"
              name=""
              id=""
              disabled={selectArea === "" && true}
            >
              <option value={"select"}>Subárea</option>
              {areas.map((element, i) => {
                if (element.area === selectArea) {
                  return (
                    <option key={i} value={element.id}>
                      {element.cases[0].subarea === ""
                        ? "---"
                        : element.cases[0].subarea}
                    </option>
                  );
                }
              })}
            </select>
          </>
        )}

        {/* Formularios */}
        {infoSubarea && (
          <>
            <Principal updateState={updateState} />
            <Interviews updateState={updateState} />
            <Lawyers updateState={updateState} lawyers={lawyers} />
            <Testimonials updateState={updateState} />
            <SolvedCases solvedCases={solvedCases} updateState={updateState} />
            <Blogs blogs={blogs} updateState={updateState} />{" "}
          </>
        )}
      </div>
    </Container>
  );
}
