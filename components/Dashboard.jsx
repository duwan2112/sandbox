import {useState, useContext} from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
import Link from "next/link";
import Router from "next/router";
import {Alert} from "../components/contexts";

const Container = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  max-width: 30rem;

  .dash {
    &__title {
      font-family: var(--quicksand);
      font-size: 2rem;
      span {
        color: #ffa16f;
      }

      &--bold {
        font-weight: var(--bold);
      }
    }

    &__text {
      font-family: var(--quicksand);
      font-size: 1.5rem;
      line-height: 1.9rem;
      margin-bottom: 1.2em;
    }

    &__website-state {
      color: var(--color-primary);
      font-weight: var(--regular);
      span {
        color: var(--color-black);
      }
    }
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    max-width: 40rem;

    .dash {
      &__title {
        font-size: 2.4rem;
        line-height: 3.1rem;
        margin-bottom: 0.7em;
      }

      &__text {
        font-size: 1.8rem;
        margin-bottom: 1.8em;
      }
    }
  }
`;

const Section = styled.div`
  margin-bottom: 5rem;
`;

const ButtonStyled = styled.button`
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
`;

const Dashboard = ({
  userid,
  setEditInfo,
  initialValues,
  submitFormData,
  user,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {basic, visible, url, userId} = initialValues;
  const {setToast} = useContext(Alert.AlertContext);

  const onClickMarketing = () => {
    if (!visible)
      return setToast(
        "Suscribete a un plan para publicar tu web y crear tu campaña de marketing",
        "danger"
      );
    Router.push("/dashboard/campaign");
  };
  return (
    <>
      <Container className="container">
        <div className="form-container">
          <div className="dash__row">
            {" "}
            {!userid && user.email}
            <h1 className="heading m-md-2 text-capitalize">
              <strong>
                {basic && basic.bufeteName ? basic.bufeteName : null}
              </strong>
            </h1>
          </div>
          <div>
            <p className="text dash__website-state">
              Estado de mi web:{" "}
              <span>{visible ? "Visible" : "No visible"}</span>
            </p>
          </div>
          <div>
            {visible ? (
              <button className="btn btn-success btn-block btn-bold">
                Sitio web publicado
              </button>
            ) : (
              <Link href={`/dashboard/sub?web=${url}`} as="/dashboard/sub">
                <a className="btn btn-outline-primary btn-block">
                  Publicar mi web
                </a>
              </Link>
            )}
          </div>
          <div className="mt-4 mb-5 text-center">
            {visible ? (
              <a className="btn-link" target="_blank" href={`/p/${url}`}>
                Ver mi web
              </a>
            ) : (
              <Link href="/preview/[url]" as={`/preview/${url}`}>
                <a
                  className="btn-link"
                  target="_blank"
                  href={`/preview/${url}`}
                >
                  Ver mi web
                </a>
              </Link>
            )}
          </div>
        </div>

        <Section className="form-container">
          <div className="load__row mb-4">
            <h1 className="heading">
              Mi campaña de
              <br />
              <strong className="rainbow">Marketing digital</strong>
            </h1>
          </div>

          <a
            style={{color: "white"}}
            onClick={onClickMarketing}
            className="btn btn-rainbow btn-block btn-bold"
          >
            Editar
          </a>
        </Section>
        <Section className="form-container">
          <div className="load__row mb-4">
            <h1 className="heading">
              Incluye
              <br />
              <strong>A los abogados</strong>
            </h1>
          </div>
          <Link
            href={`/dashboard/a/[id]${userid ? `?userid=${userid}` : ""}`}
            as={`/dashboard/a/lawyers`}
          >
            <a className="btn btn-black btn-block btn-bold">Editar</a>
          </Link>
          <div className="mt-4 mb-5 text-center">
            <Link href="/dashboard/book" className="mt-4 mb-5 text-center">
              <a className="btn-link">Reservar sesión de fotos</a>
            </Link>
          </div>
        </Section>

        <Section className="form-container">
          <div className="load__row mb-4">
            <h1 className="heading">
              Edita la sección
              <br />
              <strong className="heading--blue">
                nombre del bufete, logotipo, teléfono, email y dirección
              </strong>
            </h1>
          </div>
          <Link
            href={`/dashboard/s/[id]${userid ? `?userid=${userid}` : ""}`}
            as={`/dashboard/s/basic`}
          >
            <a className="btn btn-primary btn-block">Editar</a>
          </Link>
        </Section>
        <Section className="form-container">
          <div className="load__row mb-4">
            <h1 className="heading">
              Edita la sección
              <br />
              <strong className="heading--blue"> pantalla de bienvenida</strong>
            </h1>
          </div>
          <Link
            href={`/dashboard/s/[id]${userid ? `?userid=${userid}` : ""}`}
            as={`/dashboard/s/welcome`}
          >
            <a className="btn btn-primary btn-block">Editar</a>
          </Link>
        </Section>
        <Section className="form-container">
          <div className="load__row mb-4">
            <h1 className="heading">
              Edita la sección
              <br />
              <strong className="heading--blue">como funciona</strong>
            </h1>
          </div>
          <Link
            href={`/dashboard/s/[id]${userid ? `?userid=${userid}` : ""}`}
            as={`/dashboard/s/howitworks`}
          >
            <a className="btn btn-primary btn-block">Editar</a>
          </Link>
        </Section>
        <Section className="form-container">
          <div className="load__row mb-4">
            <h1 className="heading">
              Edita la sección
              <br />
              <strong className="heading--blue">
                que dicen nuestros clientes
              </strong>
            </h1>
          </div>
          <Link
            href={`/dashboard/a/[id]${userid ? `?userid=${userid}` : ""}`}
            as={`/dashboard/a/clients`}
          >
            <a className="btn btn-primary btn-block">Editar</a>
          </Link>
        </Section>
        <Section className="form-container">
          <div className="load__row mb-4">
            <h1 className="heading">
              Edita la sección
              <br />
              <strong className="heading--blue">
                respondemos a tus preguntas
              </strong>
            </h1>
          </div>
          <Link
            href={`/dashboard/s/[id]${userid ? `?userid=${userid}` : ""}`}
            as={`/dashboard/s/questions`}
          >
            <a className="btn btn-primary btn-block">Editar</a>
          </Link>
        </Section>
        <Section className="form-container">
          <div className="load__row mb-4">
            <h1 className="heading">
              Edita la sección
              <br />
              <strong className="heading--blue">casos resueltos</strong>
            </h1>
          </div>
          <Link
            href={`/dashboard/a/solved${userid ? `?userid=${userid}` : ""}`}
            as="/dashboard/a/solved"
          >
            <a className="btn btn-primary btn-block">Editar</a>
          </Link>
        </Section>
        <Section className="form-container">
          <div className="load__row mb-4">
            <h1 className="heading">
              Edita la sección
              <br />
              <strong className="heading--blue">nuestro blog</strong>
            </h1>
          </div>
          <Link
            href={`/dashboard/a/blogs${userid ? `?userid=${userid}` : ""}`}
            as="/dashboard/a/blogs"
          >
            <a className="btn btn-primary btn-block">Editar</a>
          </Link>
        </Section>
        <Section className="form-container">
          <div className="load__row mb-4">
            <h1 className="heading">
              Edita la sección
              <br />
              <strong className="heading--blue">nuestras áreas</strong>
            </h1>
          </div>
          <Link
            href={`/dashboard/a/areas${userid ? `?userid=${userid}` : ""}`}
            as="/dashboard/a/areas"
          >
            <a className="btn btn-primary btn-block">Editar</a>
          </Link>
          <Link href={`/dashboard/landing${userid ? `?userid=${userid}` : ""}`}>
            <div className="mt-4 mb-5 text-center">
              <a className="btn-link">
                Crear web y campañas de marketing para una subarea
              </a>
            </div>
          </Link>
        </Section>
        <Section className="form-container">
          <div className="load__row mb-4">
            <h1 className="heading">
              Edita la sección
              <br />
              <strong className="heading--blue">nosotros</strong>
            </h1>
          </div>
          <Link
            href={`/dashboard/s/[id]${userid ? `?userid=${userid}` : ""}`}
            as={`/dashboard/s/aboutus`}
          >
            <a className="btn btn-primary btn-block">Editar</a>
          </Link>
          <div className="mt-4 mb-5 text-center">
            <Link href="/dashboard/book">
              <a className="btn-link">Reservar sesión de fotos</a>
            </Link>
          </div>
        </Section>
        <Section className="form-container">
          <div className="load__row mb-4">
            <h1 className="heading">
              Edita la sección
              <br />
              <strong className="heading--blue">
                politica de cookies, privacidad y aviso legal
              </strong>
            </h1>
          </div>
          <Link
            href={`/dashboard/politics${userid ? `?userid=${userid}` : ""}`}
            as={`/dashboard/politics`}
          >
            <a className="btn btn-outlined-black btn-block">Editar</a>
          </Link>
        </Section>
        {!visible ? (
          <>
            {" "}
            <div className="mt-5 mb-5 form-container">
              <ButtonStyled
                className="btn btn-gradient-primary btn-block btn-shadow d-flex justify-content-center"
                type="submit"
                onClick={() =>
                  Router.push(`/dashboard/sub?web=${url}`, "/dashboard/sub")
                }
              >
                {isLoading ? (
                  <ReactLoading
                    type="spin"
                    color={"currentColor"}
                    height={30}
                    width={30}
                  />
                ) : (
                  "Publicar mi web"
                )}
              </ButtonStyled>
            </div>{" "}
          </>
        ) : null}
      </Container>
    </>
  );
};

export default Dashboard;
