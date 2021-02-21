import styled from "styled-components";
import Router, {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import CardPlan from "../../../components/blocks/CardPlan";
import {useState, useContext, useEffect} from "react";
import {User, Alert} from "../../../components/contexts";
import {server} from "../../../utils";

const BackgroundContainer = styled.div`
  background-image: url(${require("../../../public/static/sub-mobile.png")});
  background-size: contain;
  padding-top: 5rem;
  padding-bottom: 5rem;
  position: relative;
  .btn__prueba {
    padding: 6.5px 5px;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    background-image: none;
    background-size: none;
    background: #ffce91;
  }
  @media ${(props) => props.theme.mediaQueries.large} {
    background: #ffe6a3;
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

    @media ${(props) => props.theme.mediaQueries.large} {
      font-size: 20px;
      line-height: 20px;
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
  a {
    padding: 7px 90px;
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

const Sub = ({data, web, lawyers}) => {
  const {prices} = data;

  const autonomo = prices.autonomo.toString().split(".");
  const asociados = prices.asociados.toString().split(".");
  const bufete = prices.bufete.toString().split(".");

  const {user, setUser} = useContext(User.UserContext);
  const {setToast} = useContext(Alert.AlertContext);

  const [plan, setPlan] = useState(user.sub);

  const [lawyer, setLawyer] = useState(lawyers.lawyers);

  useEffect(() => {
    setPlan(user.sub);
  }, [user]);

  const handleDameDeBaja = async () => {
    const {ok, data} = await server.putAsync("/users/v2/payments/unsubscribe");
    if (ok) {
      setUser({sub: null, allowedLawyers: null});
      setToast("Tu subscripcion ha sido eliminada", "success");
    } else {
      setToast(data);
    }
  };
  const router = useRouter();
  const onClickLink = (type, lawyerLimit) => {
    if (lawyer.length <= lawyerLimit) {
      router.push(
        `/dashboard/sub/[plan]?type=${type}&web=${web}`,
        `/dashboard/sub/${type}`
      );
    } else {
      setToast(
        "La cantidad de abogados que tienes registrados es mayor a la permitida por el plan que seleccionaste, sugerimos seleccionar otro plan o eliminar abogados de tu sitio web",
        "error"
      );
    }
  };
  return (
    <>
      <Head>
        <title>Hifive | Planes</title>
      </Head>
      <SubMobileHeader className="container d-lg-none">
        <div className="mt-5 mb-5 ">
          <a>
            <img
              className="back-arrow"
              src={require("../../../public/static/back-arrow.png")}
              onClick={() => {
                Router.push("/dashboard");
              }}
            />
          </a>
        </div>

        <h1 className="heading">
          Suscríbete
          <br />
          <strong className="heading--blue">a tu plan total</strong>
        </h1>
        <p className="header__text">
          Y empieza a captar clientes ya con tu tarifa fija
        </p>
      </SubMobileHeader>
      <BackgroundContainer className="container-fluid">
        <Overlay className="d-none d-lg-block">
          <img src={require("../../../public/static/sub.png")} alt="" />
        </Overlay>
        <div className="container">
          <div className="row">
            <div className="col-12 mb-5 col-md-6 mb-md-0 col-lg-4">
              <CardPlan subscribed>
                <figure className="card__icon-box">
                  <img
                    className="card__icon card__icon--first"
                    src={require("../../../public/static/card-2.png")}
                  />
                </figure>
                <h2 className="card__title">Autónomo</h2>
                <div className="card__price-box">
                  <p className="card__price">
                    {autonomo[0]}
                    <span>.{autonomo[1]}</span> €
                  </p>
                  <p className="card__time">mes+IVA</p>
                </div>
                <ul className="card__features">
                  <li className="card__feature">
                    <p>
                      Web
                      <br />+<br />
                      Campaña de publicidad en Google
                    </p>
                  </li>
                  <li className="card__feature">
                    <p>Añade 1 abogado a la web</p>
                  </li>
                </ul>
                <div className="card__button-box">
                  {plan &&
                  plan ===
                    "autonomo" ? null /* (
                    <>
                      <a
                        href="#"
                        className="btn btn-success  btn-block text-uppercase card__btn"
                      >
                        mi plan
                      </a>
                      <a
                        role="button"
                        className="btn-link d-block mt-3"
                        onClick={handleDameDeBaja}
                      >
                        Dame de baja
                      </a>
                    </>
                  ) */ : (
                    <button
                      onClick={() => {
                        onClickLink("autonomo", 1);
                      }}
                      href="#"
                      className="btn__prueba btn btn-outlined-primary btn-block text-uppercase card__btn"
                    >
                      Prueba 30 días gratis
                    </button>
                  )}
                </div>
              </CardPlan>
            </div>
            <div className="col-12 mb-5 col-md-6 mb-md-0 col-lg-4">
              <CardPlan>
                <figure className="card__icon-box">
                  <img
                    className="card__icon"
                    src={require("../../../public/static/card-1.png")}
                  />
                </figure>
                <h2 className="card__title">Asociados</h2>
                <div className="card__price-box">
                  <p className="card__price">
                    {asociados[0]}
                    <span>.{asociados[1]}</span> €
                  </p>
                  <p className="card__time">mes+IVA</p>
                </div>
                <ul className="card__features">
                  <li className="card__feature">
                    <p>
                      Web
                      <br />+<br />
                      Campaña de publicidad en Google
                    </p>
                  </li>
                  <li className="card__feature">
                    <p>Añade 2 abogados a la web</p>
                  </li>
                </ul>
                <div className="card__button-box">
                  {plan &&
                  plan ===
                    "asociados" ? null /* (
                    <>
                      <a
                        href="#"
                        className=" btn btn-success  btn-block text-uppercase card__btn"
                      >
                        mi plan
                      </a>
                      <a
                        role="button"
                        className="btn-link d-block mt-3"
                        onClick={handleDameDeBaja}
                      >
                        Dame de baja
                      </a>
                    </>
                  ) */ : (
                    <button
                      onClick={() => {
                        onClickLink("asociados", 2);
                      }}
                      href="#"
                      className="btn__prueba btn btn-outlined-primary btn-block text-uppercase card__btn"
                    >
                      Prueba 30 días gratis
                    </button>
                  )}
                </div>
              </CardPlan>
            </div>
            <div className="col-12 col-md-6 mt-md-5 col-lg-4 mt-lg-0">
              <CardPlan>
                <figure className="card__icon-box">
                  <img
                    className="card__icon"
                    src={require("../../../public/static/card-3.png")}
                  />
                </figure>
                <h2 className="card__title">Bufete</h2>
                <div className="card__price-box">
                  <p className="card__price">
                    {bufete[0]}
                    <span>.{bufete[1]}</span> €
                  </p>
                  <p className="card__time">mes+IVA</p>
                </div>
                <ul className="card__features">
                  <li className="card__feature">
                    <p>
                      Web
                      <br />+<br />
                      Campaña de publicidad en Google
                    </p>
                  </li>
                  <li className="card__feature">
                    <p>Añade mas de 2 abogados a la web</p>
                  </li>
                </ul>
                <div className="card__button-box">
                  {plan &&
                  plan ===
                    "bufete" ? null /* (
                    <>
                      <a
                        href="#"
                        className="btn btn-success  btn-block text-uppercase card__btn"
                      >
                        mi plan
                      </a>
                      <a
                        role="button"
                        className="btn-link d-block mt-3"
                        onClick={handleDameDeBaja}
                      >
                        Dame de baja
                      </a>
                    </>
                  ) */ : (
                    <button
                      onClick={() => {
                        onClickLink("bufete", 999);
                      }}
                      href="#"
                      className="btn__prueba btn btn-outlined-primary btn-block text-uppercase card__btn"
                    >
                      Prueba 30 días gratis
                    </button>
                  )}
                </div>
              </CardPlan>
            </div>
          </div>
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
        </div>
      </BackgroundContainer>
    </>
  );
};

Sub.getInitialProps = async (ctx) => {
  const {web} = ctx.query;
  const {ok, data} = await server.getAsync("/data/cms");
  const {ok: ok2, data: data2} = await server.getAsync(
    `/users/getwebsite/${web}`
  );

  if (!ok || !ok2) ctx.res.redirect("/dashboard");

  return {data, web, lawyers: data2};
};

export default Sub;
