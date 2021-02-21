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
  privacy: yup.string().required("Este campo es requerido"),
  cookies: yup.string().required("Este campo es requerido"),
  legal: yup.string().required("Este campo es requerido"),
});

const Prices = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState("privacy");

  const debug = false;

  const onFormSubmit = async (values) => {
    setIsLoading(true);
    const { ok } = await server.putAsync("/admin/cms", {
      documents: values,
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
                selectedForm === "privacy"
                  ? "btn-primary"
                  : "btn-outlined-primary"
              }`}
              onClick={() => setSelectedForm("privacy")}
            >
              Política de Privacidad
            </button>
          </div>
          <div className="mb-5">
            <button
              className={`btn btn-block ${
                selectedForm === "cookies"
                  ? "btn-primary"
                  : "btn-outlined-primary"
              }`}
              onClick={() => setSelectedForm("cookies")}
            >
              Política de Cookies
            </button>
          </div>
          <div>
            <button
              className={`btn btn-block ${
                selectedForm === "legal"
                  ? "btn-primary"
                  : "btn-outlined-primary"
              }`}
              onClick={() => setSelectedForm("legal")}
            >
              Aviso legal
            </button>
          </div>
          <div>
            <Formik
              initialValues={
                !data
                  ? {
                      privacy: "",
                      legal: "",
                      cookies: "",
                    }
                  : data
              }
              onSubmit={onFormSubmit}
              validationSchema={validationSchema}
            >
              {({ values, errors, isSubmitting }) => (
                <Form className="mt-5">
                  {selectedForm === "privacy" && (
                    <div>
                      <FormGroup
                        asInput
                        fieldData={{ label: "Política de Privacidad" }}
                        name="privacy"
                        type="text"
                      />
                    </div>
                  )}
                  {selectedForm === "cookies" && (
                    <div>
                      <FormGroup
                        asInput
                        fieldData={{ label: "Política de Cookies" }}
                        name="cookies"
                        type="text"
                      />
                    </div>
                  )}
                  {selectedForm === "legal" && (
                    <div>
                      <FormGroup
                        asInput
                        fieldData={{ label: "Aviso Legal" }}
                        name="legal"
                        type="text"
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

  return { data: data.documents };
};

export default Prices;
