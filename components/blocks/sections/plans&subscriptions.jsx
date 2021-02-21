import {useState} from "react";
import {Formik, Form} from "formik";
import * as yup from "yup";
import ReactLoading from "react-loading";
import FormGroup from "../dashboard/forms/FormGroup";
import {server} from "../../../utils";
import Head from "next/head";
import styled from "styled-components";
import Layout from "../../layout";

const Container = styled.div`
  padding-top: 4rem;
  padding: 6rem 10rem 4rem 0rem;
  margin: 0;
  width: 50%;
  position: relative;
  left: 0;
  .selected {
    width: 100%;
    .btn {
      font-size: 15px;
      height: 50px;
      padding: 10px 10px;
    }
  }
  input {
    border-radius: 5px;
    width: 40%;
  }
`;

const validationSchema = yup.object({
  autonomo: yup
    .number()
    .positive("Debe ser un numero mayor a 0")
    .required("Este campo es requerido")
    .test("is-decimal", "Ingrese al menos 2 decimales", (value) =>
      (value + "").match(/^\d+\.\d\d$/)
    ),
  asociados: yup
    .number()
    .positive("Debe ser un numero mayor a 0")
    .required("Este campo es requerido")
    .test("is-decimal", "Ingrese al menos 2 decimales", (value) =>
      (value + "").match(/^\d+\.\d\d$/)
    ),
  bufete: yup
    .number()
    .positive("Debe ser un numero mayor a 0")
    .required("Este campo es requerido")
    .test("is-decimal", "Ingrese al menos 2 decimales", (value) =>
      (value + "").match(/^\d+\.\d\d$/)
    ),
  fotos: yup
    .number()
    .positive("Debe ser un numero mayor a 0")
    .required("Este campo es requerido"),
  videos: yup
    .number()
    .positive("Debe ser un numero mayor a 0")
    .required("Este campo es requerido"),
  gastos: yup
    .number()
    .positive("Debe ser un numero mayor a 0")
    .required("Este campo es requerido"),
  notFees: yup
    .number()
    .positive("Debe ser un numero mayor a 0")
    .required("Este campo es requerido"),
});

const Plans_subscriptions = ({data}) => {
  console.log(data);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState("web");

  const debug = false;

  const onFormSubmit = async (values) => {
    setIsLoading(true);
    const {ok, data} = await server.putAsync("/admin/cms", {
      prices: values,
    });
    if (!ok) {
      // enviamos la alerta
    } else {
      // hacemos otra cosa
    }
    setIsLoading(false);
  };

  return (
    <>
      <Container className="container">
        <div className="row selected">
          <div className="col-5">
            <button
              className={`btn btn-block ${
                selectedForm === "web" ? "btn-primary" : "btn-outlined-primary"
              }`}
              onClick={() => setSelectedForm("web")}
            >
              Planes Web
            </button>
          </div>
          <div className="col-5">
            <button
              className={`btn btn-block ${
                selectedForm === "sessions"
                  ? "btn-primary"
                  : "btn-outlined-primary"
              }`}
              onClick={() => setSelectedForm("sessions")}
            >
              Sesiones
            </button>
          </div>
        </div>

        <div>
          <Formik
            initialValues={
              !data
                ? {
                    autonomo: "",
                    asociados: "",
                    bufete: "",
                    fotos: "",
                    videos: "",
                    gastos: "",
                    notFees: "",
                  }
                : {...data}
            }
            onSubmit={onFormSubmit}
            validationSchema={validationSchema}
          >
            {({values, errors, isSubmitting}) => (
              <Form className="mt-5">
                {selectedForm === "web" ? (
                  <div>
                    <FormGroup
                      fieldData={{label: "Autonomo"}}
                      name="autonomo"
                      type="number"
                    />
                    <FormGroup
                      fieldData={{label: "Asociados"}}
                      name="asociados"
                      type="number"
                    />
                    <FormGroup
                      fieldData={{label: "Bufete"}}
                      name="bufete"
                      type="number"
                    />
                  </div>
                ) : (
                  <div>
                    <FormGroup
                      fieldData={{label: "Fotos"}}
                      name="fotos"
                      type="number"
                    />

                    <FormGroup
                      fieldData={{label: "Videos"}}
                      name="videos"
                      type="number"
                    />
                    <FormGroup
                      fieldData={{label: "Gastos de viajes"}}
                      name="gastos"
                      type="number"
                    />
                    <FormGroup
                      fieldData={{
                        label: "Importe para no cobrar gastos de viaje",
                      }}
                      name="notFees"
                      type="number"
                    />
                  </div>
                )}

                <button
                  className="btn btn-gradient-primary btn-block mb-5 d-flex justify-content-center"
                  type="submit"
                >
                  {isLoading ? (
                    <ReactLoading
                      type="spin"
                      color={"var(--color-white)"}
                      height={30}
                      width={30}
                    />
                  ) : (
                    "Guardar"
                  )}
                </button>
                {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
                {debug ? <pre>{JSON.stringify(errors, null, 2)}</pre> : ""}
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default Plans_subscriptions;
