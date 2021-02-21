import {Formik, Form} from "formik";
import Head from "next/head";
import Router from "next/router";
import {useState, useEffect} from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
import Layout from "../../../components/layout";
import FormGroup from "../../../components/blocks/dashboard/forms/FormGroup";
import {server} from "../../../utils";

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

const FormContainer = styled.div;

const Politics = ({initialValues, userid}) => {
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
              src={require("../../../public/static/back-arrow.png")}
              onClick={async () => {
                if (userid) {
                  return Router.push(`/dashboard?userid=${userid}`);
                }
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
                : {cookies: "", privacy: "", legal: ""}
            }
            onSubmit={async (values) => {
              setIsLoading(true);
              const {ok, data} = await server.putAsync(
                `/users/website${userid ? `/${userid}` : ""}`,
                {
                  politics: {...values},
                }
              );
              setIsLoading(false);
              setTimeout(() => {
                if (userid) {
                  return Router.push(`/dashboard?userid=${userid}`);
                }
                Router.push("/dashboard");
              }, 1250);
            }}
          >
            {({values}) => {
              const debug = false;

              return (
                <Form>
                  {selectedForm === "cookies" ? (
                    <FormGroup
                      asInput="textarea"
                      name="cookies"
                      fieldData={{label: "Política de cookies"}}
                      type="text"
                    />
                  ) : null}
                  {selectedForm === "privacy" ? (
                    <FormGroup
                      asInput="textarea"
                      name="privacy"
                      fieldData={{label: "Política de privacidad"}}
                      type="text"
                    />
                  ) : null}
                  {selectedForm === "legal" ? (
                    <FormGroup
                      asInput="textarea"
                      name="legal"
                      fieldData={{label: "Aviso legal"}}
                      type="text"
                    />
                  ) : null}

                  {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : null}
                  <Container>
                    <button
                      type="submit"
                      className="fixed btn btn-gradient-primary btn-block mb-5 d-flex justify-content-center"
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
                  </Container>
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
  const {userid} = ctx.query;
  const {ok, data} = await server.getAsync(
    `/users/website${userid ? `/${userid}` : ""}`
  );
  if (ok) {
    return {
      initialValues: data.initialValues.politics,
      userid: userid,
    };
  } else {
    ctx.res.redirect("/dashboard");
  }
};

export default Politics;
