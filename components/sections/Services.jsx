import styled from "styled-components";
import Link from "next/link";
import InfoList from "../blocks/InfoList";

const StyledServices = styled.section`
  padding: 12rem 0;
  .services {
    &__row:not(:last-child) {
      margin-bottom: 10rem;
    }

    &__btn {
      display: none;
    }

    &__img {
      width: 80%;
      display: block;
      margin: 0 auto;
    }

    @media ${(props) => props.theme.mediaQueries.medium} {
      &__row:last-child {
        justify-content: flex-end;
      }

      &__row:not(:last-child) {
        margin-bottom: 20rem;
      }

      &__iphone-col {
        &--one {
          display: flex;
          justify-content: flex-end;
        }
      }

      &__img {
        position: absolute;
      }

      &__btn {
        display: block;
        width: 80%;
        margin: 0 auto;
        margin-top: 3em;
      }
    }

    @media ${(props) => props.theme.mediaQueries.large} {
      &__row:not(:last-child) {
        margin-bottom: 25rem;
      }

      &__iphone-col {
        display: flex;
        justify-content: center;
      }

      &__img {
        width: 70%;
      }

      &__btn {
        width: 70%;
      }
    }
    @media ${(props) => props.theme.mediaQueries.largest} {
      &__img {
        width: 60%;
        &--one {
          width: 55%;
        }
      }
      &__btn {
        width: 60%;
      }
    }
  }
`;

const Services = () => {
  return (
    <StyledServices>
      <div className="container">
        <div className="row services__row">
          <div className="col-12 col-md-6">
            <div className="text-center">
              <h1 className="title">Tu Web</h1>
              <p className="text">
                Crea tu web rellenando un simple <br></br>formulario
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 services__iphone-col services__iphone-col--one">
            <img
              className="services__img services__img--one"
              src={require("../../public/static/iphone.png")}
              alt=""
            />
          </div>
          <div className="col-12 col-md-6">
            <InfoList>
              <li className="d-flex align-items-center list__item">
                <figure className="list__figure">
                  <img
                    className="list__img"
                    src={require("../../public/static/verificado.png")}
                    alt=""
                  />
                </figure>
                <p className="list__text">
                  Diseñada especialmente para smartphones
                </p>
              </li>
              <li className="d-flex align-items-center list__item">
                <figure className="list__figure">
                  <img
                    className="list__img"
                    src={require("../../public/static/verificado.png")}
                    alt=""
                  />
                </figure>
                <p className="list__text">
                  Diseños y funcionalidades especiales para abogados
                </p>
              </li>
              <li className="d-flex align-items-center list__item">
                <figure className="list__figure">
                  <img
                    className="list__img"
                    src={require("../../public/static/verificado.png")}
                    alt=""
                  />
                </figure>
                <p className="list__text">
                  Carga rápida en todo tipo de dispositivos
                </p>
              </li>
              <li className="d-flex align-items-center list__item">
                <figure className="list__figure">
                  <img
                    className="list__img"
                    src={require("../../public/static/verificado.png")}
                    alt=""
                  />
                </figure>
                <p className="list__text">
                  Actualiza y añade contenidos a tu web en cualquier momento
                </p>
              </li>
            </InfoList>
            {/*  <Link href="/register">
              <a
                href=""
                className="btn btn-gradient-primary btn-block services__btn"
              >
                Crear mi web
              </a>
            </Link> */}
          </div>
        </div>
        <div className="row services__row">
          <div className="col-12 col-md-6 order-md-1">
            <div className="text-center">
              <h1 className="title">Tu Campaña de publicidad en Google</h1>
              <p className="text">
                Solo debes indicar el área jurídica a promocionar, el área
                geográfica donde quieres que se vea tu anuncio y la cantidad
                mensual que quieres invertir
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 order-md-0  services__iphone-col">
            <img
              className="services__img services__img--two"
              src={require("../../public/static/iphone-google.png")}
              alt=""
            />
          </div>
          <div className="col-12 col-md-6 order-md-2">
            <InfoList>
              <li className="d-flex align-items-center list__item">
                <figure className="list__figure">
                  <img
                    className="list__img"
                    src={require("../../public/static/verificado.png")}
                    alt=""
                  />
                </figure>
                <p className="list__text">Especializados en Abogados</p>
              </li>
              <li className="d-flex align-items-center list__item">
                <figure className="list__figure">
                  <img
                    className="list__img"
                    src={require("../../public/static/verificado.png")}
                    alt=""
                  />
                </figure>
                <p className="list__text">
                  Solo pagas por cada click que recibe tu anuncio
                </p>
              </li>
              <li className="d-flex align-items-center list__item">
                <figure className="list__figure">
                  <img
                    className="list__img"
                    src={require("../../public/static/verificado.png")}
                    alt=""
                  />
                </figure>
                <p className="list__text">Reducimos el coste de cada click</p>
              </li>
              <li className="d-flex align-items-center list__item">
                <figure className="list__figure">
                  <img
                    className="list__img"
                    src={require("../../public/static/verificado.png")}
                    alt=""
                  />
                </figure>
                <p className="list__text">
                  Tests A/B de distintos titles, body texts y call to actions
                  que minimicen el coste de cada click
                </p>
              </li>
              <li className="d-flex align-items-center list__item">
                <figure className="list__figure">
                  <img
                    className="list__img"
                    src={require("../../public/static/verificado.png")}
                    alt=""
                  />
                </figure>
                <p className="list__text">
                  Búsqueda de keywords en el longtail que reduzcan el coste de
                  cada click
                </p>
              </li>
              <li className="d-flex align-items-center list__item">
                <figure className="list__figure">
                  <img
                    className="list__img"
                    src={require("../../public/static/verificado.png")}
                    alt=""
                  />
                </figure>
                <p className="list__text">
                  Búsqueda de keywords cercanas al momento de transacción que
                  reduzcan el coste de cada click
                </p>
              </li>
              <li className="d-flex align-items-center list__item">
                <figure className="list__figure">
                  <img
                    className="list__img"
                    src={require("../../public/static/verificado.png")}
                    alt=""
                  />
                </figure>
                <p className="list__text">
                  Segmentación de audiencias que minimicen el coste de cada
                  click
                </p>
              </li>
            </InfoList>
          </div>
        </div>
      </div>
    </StyledServices>
  );
};

export default Services;
