import {useState} from "react";
import {Formik, Form} from "formik";
import * as yup from "yup";
import ReactLoading from "react-loading";
import FormGroup from "../dashboard/forms/FormGroup";
import {server} from "../../../utils";

import styled from "styled-components";

const Container = styled.div`
  padding-top: 4rem;
  padding: 6rem 10rem 4rem 0rem;
  margin: 0;
  width: 100%;
  .selected {
    width: 70%;
    .btn {
      font-size: 15px;
      height: 50px;
      padding: 10px 10px;
    }
  }
  .save {
    width: 40%;
    margin: 0 auto;
    border-radius: 3px;
  }
`;

const validationSchema = yup.object({
  privacy: yup.string().required("Este campo es requerido"),
  cookies: yup.string().required("Este campo es requerido"),
  legal: yup.string().required("Este campo es requerido"),
});

const LegalDocument = ({data}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState("privacy");

  const debug = false;

  const onFormSubmit = async (values) => {
    setIsLoading(true);
    const {ok} = await server.putAsync("/admin/cms", {
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
      <Container className="container">
        <div className="row selected">
          <div className="col-4">
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
          <div className="col-4">
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
          <div className="col-4">
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
            {({values, errors, isSubmitting}) => (
              <Form className="mt-5">
                {selectedForm === "privacy" && (
                  <div>
                    <FormGroup
                      asInput
                      fieldData={{label: "Política de Privacidad"}}
                      name="privacy"
                      type="text"
                    />
                  </div>
                )}
                {selectedForm === "cookies" && (
                  <div>
                    <FormGroup
                      asInput
                      fieldData={{label: "Política de Cookies"}}
                      name="cookies"
                      type="text"
                    />
                  </div>
                )}
                {selectedForm === "legal" && (
                  <div>
                    <FormGroup
                      asInput
                      fieldData={{label: "Aviso Legal"}}
                      name="legal"
                      type="text"
                    />
                  </div>
                )}

                <button
                  className="btn save btn-gradient-primary btn-block mb-5 d-flex justify-content-center"
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

export default LegalDocument;
