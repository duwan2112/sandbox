import React, {useState, useContext, useEffect} from "react";
import FormGroup from "../components/blocks/dashboard/forms/FormGroup";
import styled from "styled-components";
import {Formik, Form} from "formik";
import * as yup from "yup";
import Router from "next/router";
import {server} from "../utils";
import ReactLoading from "react-loading";

import {User, Alert} from "../components/contexts";

const FormContainer = styled.div`
  margin-top: 2.5rem;
  width: 40rem;
  margin: 10rem auto;
  @media (max-width: 768px) {
    width: 80%;
  }
  .title-billing {
    font-size: 30px;
    font-weight: 300;
    padding-bottom: 5rem;
    text-align: center;
  }
  .stripe {
    &__text {
      font-size: 15px;
      line-height: 25px;
      font-weight: 400;
      letter-spacing: 0.04em;
      @media (max-width: 990px) {
        color: #484848;
      }
    }
  }
  .add__billing {
    width: 100%;
    color: #307dfe;
    text-align: left;
    font-size: 15px;
    font-weight: normal;
    margin: 0;
    padding: 0;
    padding-top: 7px;
  }
  .spacing {
    margin: 10px 0;
  }
  .form-group {
    margin-bottom: 0;

    .form-control {
      position: relative;
      border: 1px solid #adadad;
      border-radius: 5px;
      padding: 18px 15px;
      width: 100%;
    }
    .top-border {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    .center-border {
      border-radius: 0;
      border-top: 0;
      border-bottom: 0;
    }
    .bottom-border {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    }
  }
  .back-arrow-top {
    position: absolute;
    top: 2rem;
    left: 2rem;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 3rem;
  background: #5591f5;
  padding: 5px 0;
  border-radius: 5px;

  button {
    color: #ffffff;
    &:hover {
      color: #ffffff;
    }
  }
`;

const validationSchema = yup.object({
  fiscalName: yup.string().max(30, "Maximo 30 caracteres"),
  nif: yup.string().max(30, "Maximo 30 caracteres"),
  direction: yup.string().max(30, "Maximo 30 caracteres"),
});

export default function Billing() {
  const {user} = useContext(User.UserContext);
  const {setToast} = useContext(Alert.AlertContext);
  if (!user.subId && user === {}) Router.push("/dashboard");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const {ok, data} = await server.postAsync(
      "/users/v2/payments/updateBilling",
      {
        ...values,
        userId: user._id,
        stripeCustomerId: user.stripeCustomerId,
      }
    );
    if (ok) {
      setToast("La informacion fue actualizada", "success");
      setTimeout(() => {
        Router.push("/dashboard");
      }, 1000);
    } else {
      setToast("No se pudo actualizar la informacion", "danger");
    }
    setLoading(false);
  };

  if (user.billing === undefined) return <h1></h1>;
  return (
    <FormContainer className="text-left">
      <Formik
        initialValues={{
          fiscalName: user.billing ? user.billing[0].fiscalName : "",
          direction: user.billing ? user.billing[0].direction : "",
          nif: user.billing ? user.billing[0].nif : "",
        }}
        validateOnChange={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({handleSubmit, values}) => (
          <Form data-rewardful>
            <div className="">
              <>
                <div className="back-arrow-top  mb-5 d-md-none">
                  <a>
                    <img
                      className="back-arrow"
                      src={require("../public/static/back-arrow.png")}
                      onClick={() => {
                        Router.push("/dashboard");
                      }}
                    />
                  </a>
                </div>
                <h3 className="title-billing">Datos facturacion</h3>

                <p className="stripe__text spacing">Datos de facturación</p>
                <FormGroup
                  radius="top"
                  name="nif"
                  type="text"
                  fieldData={{
                    placeholder: "ID fiscal / NIF-IVA",
                  }}
                />
                <FormGroup
                  radius="center"
                  name="fiscalName"
                  type="text"
                  fieldData={{
                    placeholder: "Nombre fiscal",
                  }}
                />
                <FormGroup
                  cvc={true}
                  radius="bottom"
                  name="direction"
                  type="text"
                  fieldData={{
                    placeholder: "Dirección fiscal",
                  }}
                />
              </>
            </div>

            <ButtonWrapper className="text-center">
              <button
                type="submit"
                className="btn outline btn-block  d-flex justify-content-center "
                disabled={loading}
              >
                {loading ? (
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
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
