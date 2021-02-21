import { Formik, Form } from "formik";
import Head from "next/head";
import Router from "next/router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
import Layout from "../../../../components/layout";
import FormGroup from "../../../../components/blocks/dashboard/forms/FormGroup";
import { server } from "../../../../utils";

const Politics = ({ initialValues, userid }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(null);
  const [selectedForm, setSelectedForm] = useState("cookies");

  useEffect(() => {
    setWidth(screen.width);
  }, []);

  return (
    <Layout hideHeader={width < 768}>
      <Head>
        <title>Hifive | Marketing para abogados</title>
      </Head>
      <div className="container">
        <div className="mt-5 mb-5 d-md-none">
          <a>
            <img
              className="back-arrow"
              src={require("../../../../public/static/back-arrow.png")}
              onClick={async () => {
                Router.push("/dashboard");
              }}
            />
          </a>
        </div>
        <div className="form-container">
          <div className="load__row mb-4">
            <h1 className="heading">
              Edita la sección
              <br />
              <strong className="heading--blue">
                politica de cookies, privacidad y aviso legal
              </strong>
            </h1>
          </div>
        </div>
        <div className="form-container">
          <button
            className={`btn  btn-block mb-4 ${
              selectedForm === "cookies"
                ? "btn-primary"
                : "btn-outlined-primary"
            }`}
            onClick={() => setSelectedForm("cookies")}
          >
            Política de cookies
          </button>
          <button
            className={`btn  btn-block mb-4 ${
              selectedForm === "privacy"
                ? "btn-primary"
                : "btn-outlined-primary"
            }`}
            onClick={() => setSelectedForm("privacy")}
          >
            Política de privacidad
          </button>
          <button
            className={`btn  btn-block mb-4 ${
              selectedForm === "legal" ? "btn-primary" : "btn-outlined-primary"
            }`}
            onClick={() => setSelectedForm("legal")}
          >
            Aviso legal
          </button>
        </div>
        <div className="mt-5 form-container">
          <Formik
            initialValues={
              initialValues
                ? initialValues
                : { cookies: "", privacy: "", legal: "" }
            }
            onSubmit={async (values) => {
              setIsLoading(true);
              const { ok, data } = await server.putAsync(
                `/users/website/${userid}`,
                {
                  politics: { ...values },
                }
              );
              setIsLoading(false);
            }}
          >
            {({ values }) => {
              const debug = false;

              return (
                <Form>
                  {selectedForm === "cookies" ? (
                    <FormGroup
                      asInput="textarea"
                      name="cookies"
                      fieldData={{ label: "Politica de cookies" }}
                      type="text"
                      className="form-control--tall"
                    />
                  ) : null}
                  {selectedForm === "privacy" ? (
                    <FormGroup
                      asInput="textarea"
                      name="privacy"
                      fieldData={{ label: "Politica de privacidad" }}
                      type="text"
                      className="form-control--tall"
                    />
                  ) : null}
                  {selectedForm === "legal" ? (
                    <FormGroup
                      asInput="textarea"
                      name="legal"
                      fieldData={{ label: "Aviso legal" }}
                      type="text"
                      className="form-control--tall"
                    />
                  ) : null}

                  {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : null}

                  <button
                    type="submit"
                    className="btn btn-gradient-primary btn-block mb-5 d-flex justify-content-center"
                  >
                    {isLoading ? (
                      <ReactLoading
                        type="spin"
                        color={"currentColor"}
                        height={30}
                        width={30}
                      />
                    ) : (
                      "Guardar"
                    )}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

Politics.getInitialProps = async (ctx) => {
  const { userid } = ctx.query;

  const { ok, data } = await server.getAsync(`/users/website/${userid}`);
  if (ok) {
    return {
      initialValues: data.initialValues.politics,
      userid,
    };
  } else {
    ctx.res.redirect("/dashboard");
  }
};

export default Politics;
