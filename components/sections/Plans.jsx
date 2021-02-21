import styled from "styled-components";
import CardPlan from "../blocks/CardPlan";
import banner from "../../public/static/banner-2.png";
import {server} from "../../utils";
import {useEffect, useState} from "react";
import Link from "next/link";

const StyledSection = styled.section`
  position: relative;

  .banner,
  .footer-box {
    display: none;
  }

  .col-card:not(:last-child) {
    margin-bottom: 7rem;
  }

  .row-card {
    margin: 5rem 0;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding-top: 25rem;

    color: var(--color-white);

    .banner,
    .footer-box {
      display: block;
    }

    .banner {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
    }

    .col-card:not(:last-child) {
      margin-bottom: 0rem;
    }

    .footer-box {
      color: var(--color-black);
      display: flex;
      justify-content: flex-end;
    }

    .content-box {
      text-align: left !important;
    }

    .plan {
      &__title {
        font-size: 4rem;
        font-weight: var(--black);
        margin-bottom: 0.6em;
      }

      &__text {
        font-size: 2rem;
      }
    }
  }

  @media ${(props) => props.theme.mediaQueries.largest} {
    padding-top: 35rem;

    .row-card {
      justify-content: space-between;
    }

    .col-card {
      padding: 0;
      flex: 0 0 0;
      max-width: none;
    }
  }
`;

const Plans = () => {
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      const {ok, data} = await server.getAsync("/data/cms");

      if (ok)
        setPrices({
          autonomo: data.prices.autonomo.toString().split("."),
          asociados: data.prices.asociados.toString().split("."),
          bufete: data.prices.bufete.toString().split("."),
        });
    };

    fetchPrices();
  }, []);

  return (
    <StyledSection>
      <div id="plan" className="container-fluid banner-container">
        <div className="banner">
          <img src={banner} alt="" />
        </div>

        <div className="container ">
          <div className="content-box text-center">
            <h1 className="title plan__title">Elige tu plan</h1>
            <p className="text plan__text">
              Marketing para Abogados. Nos encargamos de todo.
            </p>
          </div>
          <div className="row row-card">
            <div className="col-12 col-md-6 col-lg-4 col-card">
              <CardPlan>
                <figure className="card__icon-box">
                  <img
                    className="card__icon card__icon--first"
                    src={require("../../public/static/card-2.png")}
                  />
                </figure>
                <h2 className="card__title">Autónomo</h2>
                <div className="card__price-box">
                  <p className="card__price">
                    {prices && (
                      <>
                        {prices.autonomo[0]}
                        <span>
                          {!prices.autonomo[1] ? "" : `.${prices.autonomo[1]}`}
                        </span>{" "}
                        €
                      </>
                    )}
                  </p>
                  <p className="card__time">mes + IVA</p>
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
                  <Link href="/register">
                    <a
                      href=""
                      className="btn btn-outlined-primary btn-block card__btn"
                    >
                      Empieza gratis
                    </a>
                  </Link>
                </div>
              </CardPlan>
            </div>
            <div className="col-12  col-md-6 col-lg-4 col-card">
              <CardPlan>
                <figure className="card__icon-box">
                  <img
                    className="card__icon"
                    src={require("../../public/static/card-1.png")}
                  />
                </figure>
                <h2 className="card__title">Asociados</h2>
                <div className="card__price-box">
                  <p className="card__price">
                    {prices && (
                      <>
                        {prices.asociados[0]}
                        <span>
                          {!prices.asociados[1] ? "" : `.${prices.bufete[1]}`}
                        </span>{" "}
                        €
                      </>
                    )}
                  </p>
                  <p className="card__time">mes + IVA</p>
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
                  <Link href="/register">
                    <a
                      href=""
                      className="btn btn-outlined-primary btn-block card__btn"
                    >
                      Empieza gratis
                    </a>
                  </Link>
                </div>
              </CardPlan>
            </div>
            <div className="col-12 col-lg-4 col-card  d-flex">
              <CardPlan>
                <figure className="card__icon-box">
                  <img
                    className="card__icon"
                    src={require("../../public/static/card-3.png")}
                  />
                </figure>
                <h2 className="card__title">Bufete</h2>
                <div className="card__price-box">
                  <p className="card__price">
                    {prices && (
                      <>
                        {prices.bufete[0]}
                        <span>
                          {!prices.bufete[1] ? "" : `.${prices.bufete[1]}`}
                        </span>{" "}
                        €
                      </>
                    )}
                  </p>
                  <p className="card__time">mes + IVA</p>
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
                    <p>Añade más de 2 abogados a la web </p>
                  </li>
                </ul>
                <div className="card__button-box">
                  <Link href="/register">
                    <a
                      href=""
                      className="btn btn-outlined-primary btn-block card__btn"
                    >
                      Empieza gratis
                    </a>
                  </Link>
                </div>
              </CardPlan>
            </div>
          </div>
          <div className="footer-box">
            <h1>
              Tu equipo de <br />
              <span className="rainbow">Marketing Digital</span>
            </h1>
          </div>
        </div>
      </div>
    </StyledSection>
  );
};

export default Plans;
