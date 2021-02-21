import React, {useState, useContext} from "react";
import styled from "styled-components";
import {server} from "../../../../../utils";
import ReactLoading from "react-loading";
import FormLawyers from "../formEdit/FormLawyers";
import {Alert} from "../../../../../components/contexts/index";
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
export default function EditLawyers({lawyers, reload, id, userid}) {
  const [activeDelete, setActiveDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeForm, setActiveForm] = useState(false);
  const {setToast} = useContext(Alert.AlertContext);

  const EditSubarea = async () => {
    setIsLoading(true);
    const {ok, data} = await server.putAsync(
      `/users/subareas/editSubarea${userid ? `/${userid}` : ""}`,
      {
        subareaId: id,
        type: "remove",
        filter: "lawyers",
        data: activeDelete,
      }
    );
    if (ok) {
      reload();
      setIsLoading(false);
      setActiveDelete(null);
      setToast("Seccion de abogados actualizada", "success");
    } else {
      setToast(
        "Ocurrio un error al intentar actualizar la seccion de abogados",
        "danger"
      );
    }
  };
  return (
    <>
      <div className="form-container">
        <div className="load__row mb-4">
          <h1 className="heading">
            Edita la sección
            <br />
            <strong className="heading--blue">nuestros abogados</strong>
          </h1>
        </div>
      </div>

      {activeForm ? (
        <>
          <div style={{position: "relative"}} className="text-center mb-5 mt-5">
            {" "}
            <p style={{fontSize: "1.7rem"}}>Nuevo Abogado</p>
            <button
              onClick={() => {
                setActiveForm(null);
              }}
              role="button"
              style={{
                fontSize: "18px",
                position: "absolute",
                top: "-7px",
                right: "0",
              }}
              className="p-2 pt-1  btn btn-link btn-link--danger "
            >
              Volver
            </button>
          </div>
          <FormLawyers
            id={id}
            setActiveForm={setActiveForm}
            reload={reload}
            type={activeForm.type}
            area={activeForm.area}
            initialValues={activeForm.initialValues}
          />
        </>
      ) : (
        <>
          <div>
            {" "}
            <button
              style={{width: "100%", fontSize: "17px", height: "50px"}}
              onClick={() => {
                setActiveForm({
                  type: "create",
                  area: null,
                  initialValues: null,
                });
              }}
              role="button"
              className="p-2 mt-3 pt-1  btn btn-primary"
            >
              Añadir nuevo abogado
            </button>
          </div>
          <div className="form-group">
            {lawyers.map((element, i) => {
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
                  <div
                    className="d-flex mt-3 pl-4 pr-4"
                    style={{justifyContent: "space-between"}}
                  >
                    {" "}
                    <button
                      onClick={() => {
                        setActiveForm({
                          type: "update",
                          area: null,
                          initialValues: element,
                        });
                      }}
                      role="button"
                      style={{fontSize: "18px"}}
                      className="p-2 pt-1  btn btn-link btn-link--black "
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        if (activeDelete && activeDelete.id === element.id) {
                          return setActiveDelete(null);
                        }
                        setActiveDelete(element);
                      }}
                      role="button"
                      style={{fontSize: "18px"}}
                      className={`p-2 pt-1  btn btn-link btn-link--${
                        activeDelete && activeDelete.id === element.id
                          ? "danger"
                          : "black"
                      }`}
                    >
                      {activeDelete && activeDelete.id === element.id
                        ? "Cancelar"
                        : "Eliminar"}
                    </button>{" "}
                  </div>{" "}
                </div>
              );
            })}
          </div>{" "}
          {activeDelete && (
            <Container>
              <button
                onClick={() => {
                  EditSubarea();
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
        </>
      )}
    </>
  );
}
