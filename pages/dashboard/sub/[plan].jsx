import styled from "styled-components";
import Router from "next/router";
import {Formik, Form} from "formik";
import {useState, useContext} from "react";
import {
  useElements,
  useStripe,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import Link from "next/link";
import Head from "next/head";
import ReactLoading from "react-loading";
import * as yup from "yup";

import CreditForm from "../../../components/blocks/dashboard/forms/CreditForm";
import FormGroup from "../../../components/blocks/dashboard/forms/FormGroup";
import {Alert, User} from "../../../components/contexts";
import {server} from "../../../utils";
import CloseIcon from "@material-ui/icons/Close";
import {getAsync} from "../../../utils";

const BackgroundContainer = styled.div`
  background: white;
  padding-bottom: 5rem;
  height: 100%;

  @media ${(props) => props.theme.mediaQueries.large} {
    position: relative;
    background: white;
    min-height: 100vh;
  }
`;

const SubMobileHeader = styled.div`
  .header__text {
    font-family: var(--quicksand);
    font-weight: 300;
    font-size: 1.5rem;
    line-height: 1.9rem;
    margin-bottom: 2rem;
  }
`;

const Card = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 28rem;
  background: var(--color-white);
  border-radius: 10px;
  position: relative;
  color: var(--color-black);
  display: flex;
  flex-direction: column;
  justify-content: center;
  .container-card {
    text-align: center;
    padding-top: 0;
  }
  .card {
    &__free {
      margin-top: 10px;
      margin-bottom: 40px;
      font-size: 14px;
      line-height: 22px;
      font-weight: 300px;
    }
    &__icon-box {
      max-width: 90px;
      margin: 0 auto;
    }

    &__icon {
      width: 8rem;
    }

    &__title {
      display: block;
      font-weight: 600;
      font-size: 2rem;
      line-height: 1.9rem;
      text-transform: uppercase;
      margin-bottom: 2.5em;
      color: rgba(0, 0, 0, 0.8);
    }
    &__price,
    &__cupon,
    &__cupon-total {
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      text-align: left;

      span {
        font-size: 1.2rem;
      }
    }
    &__container_cupon {
      width: 100%;
      text-align: left;
      padding: 12px 0;
      margin: 7px 0;
    }
    &__active_cupon {
      background: #eeeeee;
      border-radius: 5px;
      .cupon-loading {
        padding: 0 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #808080;
        button {
          border: none;
          background: none;
          &:focus {
            outline: none;
          }
        }
      }
      form {
        padding: 0 18px;
        display: flex;
        position: relative;

        justify-content: space-between;
        .input-cupon {
          background: none;
          border: none;
          font-size: 14px;
          &:focus {
            outline: none;
          }
          &::placeholder {
            color: #808080;
          }
        }
        .input-submit {
          position: absolute;
          top: 0;
          right: 10px;
          border: none;
          font-size: 14px;
          color: #307dfe;
          background: transparent;
          &:focus {
            outline: none;
          }
        }
      }
    }
    &__cupon {
      color: #307dfe;
      padding: 0;
      border: none;
      margin: 0;
      background: transparent;
      &:focus {
        outline: none;
      }
    }
    &__cupon-total {
      font-weight: 600;
    }

    &__time {
      text-align: left;
      color: #676767;
      font-weight: 300;
      font-size: 1.2rem;
      line-height: 0;
      margin-top: 0.5rem;
    }
    &__fiscal {
      width: 105px;
    }
  }
  @media (max-width: 990px) {
    max-width: 31rem;
    .card {
      &__title {
        margin-bottom: 1rem;
      }
      &__free {
        margin-top: 0;
      }
    }
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    width: 400px;
    height: auto;
    max-width: none;
    padding: 30px 0px 30px 0px;

    .card {
      &__title {
        margin: 0;
        line-height: 1;
      }

      &__price {
        font-size: 16px;

        span {
          font-size: 1.8rem;
        }
      }
    }
  }
`;

const FormContainer = styled.div`
  margin-top: 2.5rem;
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
`;

const Overlay = styled.div`
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 0;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

const FaqWrapper = styled.div`
  @media ${(props) => props.theme.mediaQueries.large} {
    align-self: flex-end;
    position: relative;
    z-index: 2;
  }
`;

const Title = styled.div`
  margin-top: 5rem !important;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  padding: 1.5rem 5rem;
  flex-grow: 1;

  h1 {
    margin-top: 0;
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

const Confirmation = styled.p`
  font-size: 14px;
  padding-top: 20px;
  color: rgba(0, 0, 0, 0.7);
`;

const validationSchema = yup.object({
  fiscalName: yup.string().max(30, "Maximo 30 caracteres"),
  nif: yup.string().max(30, "Maximo 30 caracteres"),
  direction: yup.string().max(30, "Maximo 30 caracteres"),
});

const Plan = ({...props}) => {
  console.log(props);
  const {setToast} = useContext(Alert.AlertContext);
  const {setUser, user} = useContext(User.UserContext);

  const [sendCupon, setSendCupon] = useState(false);
  const [inputCupon, setInputCupon] = useState("");
  const [activeCupon, setActiveCupon] = useState(false);
  const [fiscalData, setFiscalData] = useState(false);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const {name, price, img, web} = props;

  const splittedPrice = price.toString().split(".");

  const handleSubmit = async (values) => {
    setLoading(true);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      setToast("Hay un error con los datos de su tarjeta");
      setLoading(false);
      return;
    }

    const {id} = paymentMethod;

    const {ok, data} = await server.postAsync("/users/v2/payments/plan", {
      plan: name,
      id,
      payload: {...values},
      coupon: sendCupon ? inputCupon : false,
    });

    if (ok) {
      rewardful("convert", {email: data});

      setToast(
        "Te has suscrito exitosamente, te enviaremos un email con más informacion",
        "success"
      );
      await setUser({sub: name}),
        setTimeout(() => {
          Router.push("/dashboard");
        }, 4000);
    } else {
      setToast(data, "danger", 6000);
    }

    setLoading(false);
  };

  const onChangeCupon = (e) => {
    setInputCupon(e.target.value);
  };
  const onSubmitCupon = async (e) => {
    e.preventDefault();
    const {ok, data} = await server.getAsync("/users/v2/payments/couponStripe");
    console.log(rewardful);

    if (ok) {
      const couponAccept = data.data.find((coupon) => inputCupon === coupon.id);
      if (couponAccept) {
        return setSendCupon(couponAccept.name);
      }
      setToast("El cupon es invalido");
    }
  };
  return (
    <>
      <Head>
        <title>Hifive | Plan {name[0].toUpperCase() + name.slice(1)}</title>
      </Head>
      <SubMobileHeader className="container-fluid d-lg-none">
        <div className="mt-5 mb-5">
          <Link href={`/dashboard/sub?web=${web}`} as="/dashboard/sub">
            <img
              className="back-arrow"
              src={require("../../../public/static/back-arrow.png")}
            />
          </Link>
        </div>
      </SubMobileHeader>
      <BackgroundContainer className="container-fluid">
        {/*    <Overlay className="d-none d-lg-block">
          <img src={require("../../../public/static/sub.png")} alt="" />
        </Overlay> */}
        <Card>
          <div className="container-card ">
            <figure className="card__icon-box">
              <img
                className="card__icon"
                src={require(`../../../public/static/${img}`)}
              />
            </figure>
            <div className="invisible ">holaasdañskdasdjajsdk</div>
            <h2 className="card__title ml-lg-auto">
              {name === "autonomo" ? "autónomo" : name}
            </h2>
            <div className="card__free">
              <p>Prueba 30 dias gratis</p>
              <p>Cancela cuando quieras</p>
            </div>
            <div className="card__price-box ml-lg-auto">
              <p className="card__price"> Subtotal: {price} €</p>
              <p className="card__price">
                {" "}
                IVA(21%): {(price * 0.21).toFixed(2)} €
              </p>
              <p className="card__price">
                {" "}
                Total tras la prueba: {(price + price * 0.21).toFixed(2)} €
              </p>

              <div
                className={`card__container_cupon ${
                  activeCupon && "card__active_cupon"
                }`}
              >
                {activeCupon ? (
                  sendCupon ? (
                    <div className="cupon-loading">
                      {" "}
                      <p>{sendCupon}</p>{" "}
                      <button
                        onClick={() => {
                          setSendCupon(false);
                        }}
                      >
                        {" "}
                        <CloseIcon
                          style={{fontSize: "20px", color: "#808080"}}
                        />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={onSubmitCupon}>
                      <input
                        className="input-cupon"
                        type="text"
                        placeholder="Añadir cupón"
                        onChange={onChangeCupon}
                      />{" "}
                      <input
                        className="input-submit"
                        type="submit"
                        value="Aplicar"
                      />
                    </form>
                  )
                ) : (
                  <button
                    onClick={() => {
                      setActiveCupon(true);
                    }}
                    className=" card__cupon"
                  >
                    Añadir cupón
                  </button>
                )}
              </div>

              <p className="card__cupon-total">Total ahora: 0,00 € </p>
            </div>
          </div>
          <FormContainer className="text-left">
            <Formik
              initialValues={{
                fiscalName: props.billing[0].fiscalName,
                direction: props.billing[0].direction,
                nif: props.billing[0].nif,
              }}
              validateOnChange={true}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({handleSubmit, values}) => (
                <Form data-rewardful>
                  <CreditForm />
                  <div className="">
                    {fiscalData ? (
                      <>
                        {" "}
                        <p className="stripe__text spacing">
                          Datos de facturación
                        </p>
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
                    ) : (
                      <button
                        className="btn add__billing"
                        onClick={() => {
                          setFiscalData(true);
                        }}
                      >
                        Añadir datos de facturación
                      </button>
                    )}
                  </div>

                  <ButtonWrapper className="text-center">
                    <button
                      type="submit"
                      className="btn  btn-block  d-flex justify-content-center "
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
                        "Empezar prueba"
                      )}
                    </button>
                  </ButtonWrapper>
                </Form>
              )}
            </Formik>
            <Confirmation>
              Si no cancelas tu prueba se te cargará {price}€+IVA al mes tras el
              periodo de prueba de 30 días.
            </Confirmation>
          </FormContainer>
        </Card>
        {/*    <div className="container d-none d-lg-block">
          <div className="d-flex justify-content-center  justify-content-lg-between align-items-baseline">
            <Title className="d-none d-lg-block mt-5">
              <h1 className="heading">
                Suscríbete
                <br />
                <strong className="heading--blue">a tu plan total</strong>
              </h1>
              <p className="header__text">
                Y empieza a captar clientes ya con tu tarifa fija
              </p>
            </Title>

            <FaqWrapper className="text-center mt-5 text-lg-right">
              <Link href="/faq">
                <a className="btn btn-ghost btn-center"> Ver faq</a>
              </Link>
            </FaqWrapper>
          </div>
        </div> */}
      </BackgroundContainer>
    </>
  );
};

// Validar si el usuario esta suscrito a este plan

Plan.getInitialProps = async (ctx) => {
  const response = await server.getAsync("/auth/session");
  const {init} = require("./plans");
  const plans = await init();

  if (!plans || !plans.find) ctx.res.redirect("/dashboard");

  const {type, web} = ctx.query;
  const plansFilter = plans.find((item) => item.name === type);
  plansFilter.web = web;
  return {...plansFilter, ...response.data};
};

export default Plan;
