import { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import ReactLoading from "react-loading";
import FormGroup from "../../../../components/blocks/dashboard/forms/FormGroup";
import { server } from "../../../../utils";
import Head from "next/head";
import styled from "styled-components";
import Layout from "../../../../components/layout";

const Container = styled.div`
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
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

const Prices = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState("web");

  const debug = false;

  const onFormSubmit = async (values) => {
    setIsLoading(true);
    const { ok, data } = await server.putAsync("/admin/cms", {
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
      <Head>
        <title>Hifive | Panel de Administracion</title>
      </Head>
      <Layout>
        <Container className="container">
          <div className="mt-5">
            <h1 className="heading">
              Panel de
              <br />
              <strong>Administración</strong>
            </h1>
          </div>
          <div className="mt-2">
            <h1 className="heading" style={{ marginTop: "2rem" }}>
              PLanes y Suscripciones
              <br />
              <strong className="heading--gray">Precios</strong>
            </h1>
          </div>
          <div className="mb-5">
            <button
              className={`btn btn-block ${
                selectedForm === "web" ? "btn-primary" : "btn-outlined-primary"
              }`}
              onClick={() => setSelectedForm("web")}
            >
              Planes Web
            </button>
          </div>
          <div>
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
          <div>
            <Formik
              initialValues={
                !data || !data.prices
                  ? {
                      autonomo: "",
                      asociados: "",
                      bufete: "",
                      fotos: "",
                      videos: "",
                      gastos: "",
                      notFees: "",
                    }
                  : { ...data.prices }
              }
              onSubmit={onFormSubmit}
              validationSchema={validationSchema}
            >
              {({ values, errors, isSubmitting }) => (
                <Form className="mt-5">
                  {selectedForm === "web" ? (
                    <div>
                      <FormGroup
                        fieldData={{ label: "Autonomo" }}
                        name="autonomo"
                        type="number"
                      />
                      <FormGroup
                        fieldData={{ label: "Asociados" }}
                        name="asociados"
                        type="number"
                      />
                      <FormGroup
                        fieldData={{ label: "Bufete" }}
                        name="bufete"
                        type="number"
                      />
                    </div>
                  ) : (
                    <div>
                      <FormGroup
                        fieldData={{ label: "Fotos" }}
                        name="fotos"
                        type="number"
                      />

                      <FormGroup
                        fieldData={{ label: "Videos" }}
                        name="videos"
                        type="number"
                      />
                      <FormGroup
                        fieldData={{ label: "Gastos de viajes" }}
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
      </Layout>
    </>
  );
};

Prices.getInitialProps = async (ctx) => {
  const { ok, data } = await server.getAsync("/admin/cms");

  if (!ok) ctx.res.redirect("/dashboard/admin");

  return { data };
};

export default Prices;
