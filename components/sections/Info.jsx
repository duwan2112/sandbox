import styled from "styled-components";
import InfoList from "../blocks/InfoList";

const StyledSection = styled.section`
  padding-top: 10rem;
  padding-bottom: 10rem;

  .row:not(:last-child) {
    margin-bottom: 10rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    .info {
      &__col {
        &--first {
          padding: 0 5em;
          display: flex;
          align-items: center;
          div p {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding-top: 12.5rem;
    padding-bottom: 12.5rem;

    .row:not(:last-child) {
      margin-bottom: 12.5rem;
    }
  }
`;

const Info = () => {
  return (
    <StyledSection>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 info__col info__col--first">
            <div className="text-center">
              <h1 className="title">Consigue más clientes</h1>
              <p className="text">
                Nuestro objetivo es que consiguas más clientes al menor coste
                posible
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <InfoList className="list">
              <li className="d-flex align-items-center list__item">
                <figure className="list__figure">
                  <img
                    className="list__img"
                    src={require("../../public/static/verificado.png")}
                    alt=""
                  />
                </figure>
                <p className="list__text">
                  Agencia especializada en Marketing Digital para Abogados
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
                  Tu web especialmente diseñada para smartphones
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
                  Creamos y gestionamos tu campaña de publicidad en Google
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
                  Más fácil imposible. Para crear tu web sube tus datos y wala
                  ¡ya está!
                </p>
              </li>
            </InfoList>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 order-1 order-md-0">
            <InfoList className="list">
              <li className="d-flex align-items-center list__item">
                <figure className="list__figure">
                  <img
                    className="list__img"
                    src={require("../../public/static/verificado.png")}
                    alt=""
                  />
                </figure>
                <p className="list__text">Creación de tus anuncios en Google</p>
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
                  Paga solo cuando un usuario haga click en tu anuncio
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
                  Testeo de diferentes versiones de los anuncios que maximizen
                  el ROI
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
                  Búsqueda de keywords en el longtail que maximizen el ROI
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
                  Tu eliges cuanto invertir, no hay una cantidad mínima ni
                  máxima
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
                  Tu eliges la zona geográfica en donde aparecerá tu anuncio
                </p>
              </li>
            </InfoList>
          </div>
          <div className="col-12 col-md-6 order-0 order-md-1">
            <div className="text-center">
              <h1 className="title">Tu equipo de Marketing Digital</h1>
              <p className="text">
                Mejoramos continuamente tu página web para que esté siempre a la
                última y periódicamente probamos distintos diseños para mejorar
                la conversión de los usuarios que visitan tu web
              </p>
              <p className="text">
                Creamos y gestionamos tu campaña de publicidad en Google
                testeando distintos anuncios y palabras claves para encontrar
                aquellos que ofrezcan mayor retorno de la inversión
              </p>
            </div>
          </div>
        </div>
      </div>
    </StyledSection>
  );
};

export default Info;
