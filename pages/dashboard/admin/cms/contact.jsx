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
  email: yup.string().required("Este campo es requerido"),
});

const Prices = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState("contacto");

  const debug = false;

  const onFormSubmit = async (values) => {
    setIsLoading(true);
    const { ok } = await server.putAsync("/admin/cms", {
      contact: values,
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
              Información de Contacto
              <br />
              <strong className="heading--gray">Tu sitio web</strong>
            </h1>
          </div>
          <div className="mb-5">
            <button
              className={`btn btn-block ${
                selectedForm === "contacto"
                  ? "btn-primary"
                  : "btn-outlined-primary"
              }`}
              onClick={() => setSelectedForm("contacto")}
            >
              Contacto
            </button>
          </div>

          <div>
            <Formik
              initialValues={!data ? { email: "" } : data}
              onSubmit={onFormSubmit}
              validationSchema={validationSchema}
            >
              {({ values, errors }) => (
                <Form className="mt-5">
                  <h2 className="mt-5 mb-5">Información de Contacto</h2>
                  <FormGroup
                    fieldData={{ label: "Email" }}
                    name="email"
                    type="text"
                  />

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

  return { data: data.contact };
};

export default Prices;
