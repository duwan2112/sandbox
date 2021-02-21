import { useState } from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
import Link from "next/link";

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

const Dashboard = ({ initialValues, userid, ...props }) => {
  const { basic, visible, url } = initialValues;

  return (
    <Container className="container">
      <div className="form-container">
        <div className="dash__row mb-5">
          <h1 className="heading m-md-2 text-capitalize  ">
            Panel de Administración
          </h1>
        </div>
        <div className="dash__row">
          <h1 className="heading m-md-2 text-capitalize">
            {basic && basic.type ? basic.type : null}
            <br />
            <strong>
              {basic && basic.bufeteName ? basic.bufeteName : null}
            </strong>
          </h1>
        </div>
        <div>
          <p className="text dash__website-state">
            Estado de la web: <span>{visible ? "Visible" : "No visible"}</span>
          </p>
        </div>
        <div>
          {/* {visible ? (
            <button className="btn btn-success btn-block btn-bold">
              Sitio web publicado
            </button>
          ) : (
            <Link href="/dashboard/sub">
              <a className="btn btn-outline-primary btn-block">
                Publicar mi web
              </a>
            </Link>
          )} */}
        </div>
        <div className="mt-4 mb-5 text-center">
          {visible ? (
            <a className="btn-link" href={`/p/${url}`}>
              Ver la web
            </a>
          ) : (
            <Link href="/preview/[url]" as={`/preview/${url}`}>
              <a className="btn-link" href={`/preview/${url}`}>
                Ver la web
              </a>
            </Link>
          )}
        </div>
      </div>
      <Section className="form-container">
        <div className="load__row mb-4">
          <h1 className="heading">
            Incluye
            <br />
            <strong>A los abogados</strong>
          </h1>
        </div>
        <Link
          href={{
            pathname: "/dashboard/admin/manage/a/[id]",
            query: { id: "lawyers", userid },
          }}
          as={`/dashboard/admin/manage/a/lawyers`}
        >
          <a className="btn btn-black btn-block btn-bold">Editar</a>
        </Link>
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
          href={{
            pathname: "/dashboard/admin/manage/s/[id]",
            query: { id: "basic", userid },
          }}
          as={`/dashboard/admin/manage/s/basic`}
        >
          <a className="btn btn-primary btn-block">Editar</a>
        </Link>
      </Section>
      <Section className="form-container">
        <div className="load__row mb-4">
          <h1 className="heading">
            Edita la sección
            <br />
            <strong className="heading--blue">bienvenida</strong>
          </h1>
        </div>
        <Link
          href={{
            pathname: "/dashboard/admin/manage/s/[id]",
            query: { id: "welcome", userid },
          }}
          as={`/dashboard/admin/manage/s/welcome`}
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
          href={{
            pathname: "/dashboard/admin/manage/s/[id]",
            query: { id: "howitworks", userid },
          }}
          as={`/dashboard/admin/manage/s/howitworks`}
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
          href={{
            pathname: "/dashboard/admin/manage/a/[id]",
            query: { id: "clients", userid },
          }}
          as={`/dashboard/admin/manage/a/clients`}
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
          href={{
            pathname: "/dashboard/admin/manage/s/[id]",
            query: { id: "questions", userid },
          }}
          as={`/dashboard/admin/manage/s/questions`}
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
          href={{
            pathname: "/dashboard/admin/manage/a/[id]",
            query: { id: "solvedcases", userid },
          }}
          as={`/dashboard/admin/manage/a/solvedcases`}
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
          href={{
            pathname: "/dashboard/admin/manage/a/blogs",
            query: { userid },
          }}
        >
          <a className="btn btn-primary btn-block">Editar</a>
        </Link>
      </Section>
      <Section className="form-container">
        <div className="load__row mb-4">
          <h1 className="heading">
            Edita la sección
            <br />
            <strong className="heading--blue">nuestras areas</strong>
          </h1>
        </div>
        <Link
          href={{
            pathname: "/dashboard/admin/manage/a/[id]",
            query: { id: "areas", userid },
          }}
          as={`/dashboard/admin/manage/a/areas`}
        >
          <a className="btn btn-primary btn-block">Editar</a>
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
          href={{
            pathname: "/dashboard/admin/manage/s/[id]",
            query: { id: "aboutus", userid },
          }}
          as={`/dashboard/admin/manage/s/aboutus`}
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
              politica de cookies, privacidad y aviso legal
            </strong>
          </h1>
        </div>
        <Link
          href={{
            pathname: "/dashboard/admin/manage/politics",
            query: { userid },
          }}
        >
          <a className="btn btn-outlined-black btn-block">Editar</a>
        </Link>
      </Section>
    </Container>
  );
};

export default Dashboard;
