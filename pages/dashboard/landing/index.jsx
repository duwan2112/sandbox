import React, {useState, useEffect, useContext} from "react";
import Layout from "../../../components/layout";
import Head from "next/head";
import Router from "next/router";
import styled from "styled-components";
import {server} from "../../../utils";
import NewSubarea from "../../../components/blocks/dashboard/landing/NewSubarea";
import {Alert} from "../../../components/contexts/index";
import EditSubArea from "../../../components/blocks/dashboard/landing/EditSubArea";
import ReactLoading from "react-loading";
const Container = styled.div`
  padding-bottom: 40px;
  .fixed {
    position: fixed;
    max-width: 27rem;
    margin: 10px auto;
    left: 0;
    right: 0;
    bottom: 0;
    @media ${(props) => props.theme.mediaQueries.medium} {
      position: fixed;
      bottom: 0;
      max-width: 37rem;
      right: 0;
      left: inherit;
      margin: 10px;
    }
  }
`;

export default function Landing({initialValues, userid}) {
  const [subAreasCreated, setSubAreasCreated] = useState([]);
  const [width, setWidth] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newSubarea, setNewSubarea] = useState(false);
  const [activeEdit, setActiveEdit] = useState(null);
  const [activeDelete, setActiveDelete] = useState(null);
  const [active, setActive] = useState(0);
  const {activeLanding, setToast} = useContext(Alert.AlertContext);

  const [formAll, setFormAll] = useState({
    testimonials: [],
    subareaId: "",
    subareaName: "",
    blogs: [],
    blogsNew: [],
    lawyers: [],
    solvedCases: [],
    solvedCasesNew: [],
  });

  useEffect(() => {
    setWidth(screen.width);
  }, []);

  useEffect(() => {
    const petition = async () => {
      const {ok, data} = await server.getAsync(
        `/users/subareas${userid ? `/${userid}` : ""}`
      );
      if (ok) {
        setSubAreasCreated(data);
      }
    };
    if (!newSubarea || !activeDelete) {
      petition();
    }
  }, [newSubarea, activeDelete]);

  const updateState = (values) => {
    if (Object.keys(values)[0] === "blogs2") {
      return setFormAll({...formAll, blogsNew: values.blogs2.blogs});
    } else if (Object.keys(values)[0] === "solvedCases2") {
      return setFormAll({
        ...formAll,
        solvedCasesNew: values.solvedCases2.solvedCases,
      });
    }
    setFormAll({...formAll, ...values});
  };

  const sendForm = async () => {
    console.log(formAll);
    if (!formAll.principal || !formAll.interviews) {
      activeLanding(true);
      setTimeout(() => {
        activeLanding(false);
      }, 1000);
    } else {
      const info = {
        testimonials: formAll.testimonials.testimonials
          ? formAll.testimonials.testimonials
          : [],
        subareaId: formAll.subareaId,
        subareaName: formAll.subareaName,
        blogs: [...formAll.blogs, ...formAll.blogsNew],
        interviews: formAll.interviews,
        lawyers: formAll.lawyers,
        solvedCases: [...formAll.solvedCases, ...formAll.solvedCasesNew],
        principal: formAll.principal,
      };

      const {ok, data} = await server.postAsync(
        `/users/subareas${userid ? `/${userid}` : ""}`,
        info
      );
      if (ok) {
        setNewSubarea(false);
        setFormAll({
          testimonials: [],
          subareaId: "",
          subareaName: "",
          blogs: [],
          blogsNew: [],
          lawyers: [],
          solvedCases: [],
          solvedCasesNew: [],
        });
        return setToast(data, "success");
      }
      return setToast(data, "danger");
    }
  };

  const deleteSubArea = async () => {
    setIsLoading(true);
    const {ok, data} = await server.putAsync("/users/subareas/delete", {
      id: activeDelete,
    });
    if (ok) {
      setActiveDelete(null);
      setIsLoading(false);
      return setToast(data, "success");
    }
    setActiveDelete(null);
    setIsLoading(false);
    return setToast(data, "danger");
  };

  const reload = async () => {
    const {ok, data} = await server.getAsync(
      `/users/subareas${userid ? `/${userid}` : ""}`
    );
    if (ok) {
      setSubAreasCreated(data);
      if (activeEdit) {
        data.map((element) => {
          if (element._id === activeEdit._id) {
            setActiveEdit(element);
          }
        });
      }
    }
  };

  return (
    <Layout hideHeader={width < 768}>
      {" "}
      <Head>
        <title>Hifive | Marketing para abogados</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="container">
        <div className="mt-5">
          <a>
            <img
              className="back-arrow"
              style={{cursor: "pointer"}}
              src={require("../../../public/static/back-arrow.png")}
              onClick={async () => {
                if (active !== 0) return setActive(0);
                else if (newSubarea) {
                  setFormAll({
                    testimonials: [],
                    subareaId: "",
                    subareaName: "",
                    blogs: [],
                    blogsNew: [],
                    lawyers: [],
                    solvedCases: [],
                    solvedCasesNew: [],
                  });
                  return setNewSubarea(false);
                } else if (activeEdit) return setActiveEdit(null);
                if (userid) {
                  return Router.push(`/dashboard?userid=${userid}`);
                }
                Router.push("/dashboard");
              }}
            />
          </a>
        </div>

        {!active && (
          <div className="form-container">
            <div className="load__row mb-4">
              <h1 className="heading">
                Crear web y campaña de marketing
                <br />
                <strong className="heading--blue">para un subárea</strong>
              </h1>
            </div>
          </div>
        )}

        {newSubarea ? (
          <>
            <NewSubarea
              updateState={updateState}
              blogs={initialValues.blogs}
              solvedCases={initialValues.solvedCases}
              lawyers={initialValues.lawyers}
              areas={initialValues.areas}
            />
          </>
        ) : (
          <div className="form-container">
            {activeEdit ? (
              <EditSubArea
                userid={userid}
                url={initialValues.url}
                visible={initialValues.visible}
                reload={reload}
                activeEdit={activeEdit}
                active={active}
                setActive={setActive}
              />
            ) : (
              <>
                {" "}
                <button
                  style={{marginTop: "6rem"}}
                  className={`btn  btn-block mb-4 btn-outline-primary `}
                  onClick={() => setNewSubarea(true)}
                >
                  Crear para nueva subárea
                </button>
                <div className="form-group">
                  {subAreasCreated.map((element, i) => {
                    return (
                      <div key={i}>
                        <label className="mt-5" htmlFor="">
                          Subarea creada
                        </label>{" "}
                        <input
                          onChange={console.log("change")}
                          value={element.subareaName}
                          className="form-control "
                          type="text"
                        />{" "}
                        <div
                          className="d-flex mt-3 pl-4 pr-4"
                          style={{justifyContent: "space-between"}}
                        >
                          {" "}
                          <button
                            onClick={() => {
                              setActiveEdit(element);
                              setActiveDelete(null);
                            }}
                            role="button"
                            style={{fontSize: "18px"}}
                            className="p-2 pt-1  btn btn-link btn-link--black "
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => {
                              if (activeDelete === element._id) {
                                return setActiveDelete(null);
                              }
                              setActiveDelete(element._id);
                            }}
                            role="button"
                            style={{fontSize: "18px"}}
                            className={`p-2 pt-1  btn btn-link btn-link--${
                              activeDelete === element._id ? "danger" : "black"
                            }`}
                          >
                            {activeDelete === element._id
                              ? "Cancelar"
                              : "Eliminar"}
                          </button>{" "}
                        </div>{" "}
                      </div>
                    );
                  })}
                </div>{" "}
              </>
            )}
          </div>
        )}
        {activeDelete && (
          <Container>
            <button
              onClick={() => {
                deleteSubArea();
              }}
              type="submit"
              style={{fontSize: "1.7rem"}}
              className={`fixed btn btn-danger
              } btn-block mb-5 d-flex justify-content-center`}
            >
              <>
                {" "}
                {isLoading ? (
                  <ReactLoading
                    type="spin"
                    color={"currentColor"}
                    height={30}
                    width={30}
                  />
                ) : (
                  "Eliminar"
                )}{" "}
              </>
            </button>
          </Container>
        )}
        {newSubarea && (
          <Container>
            <button
              disabled={formAll.subareaId === "" ? true : false}
              onClick={() => {
                sendForm();
              }}
              type="submit"
              className={`fixed btn btn-gradient-primary
              } btn-block mb-5 d-flex justify-content-center`}
            >
              <>
                {" "}
                {isLoading ? (
                  <ReactLoading
                    type="spin"
                    color={"currentColor"}
                    height={30}
                    width={30}
                  />
                ) : (
                  "Guardar"
                )}{" "}
              </>
            </button>
          </Container>
        )}
      </div>
    </Layout>
  );
}

Landing.getInitialProps = async (ctx) => {
  const {userid} = ctx.query;
  const {ok, data} = await server.getAsync(
    `/users/website${userid ? `/${userid}` : ""}`
  );
  if (ok) {
    return {
      initialValues: data.initialValues,
      userid: userid,
    };
  } else {
    ctx.res.redirect("/dashboard");
  }
};
