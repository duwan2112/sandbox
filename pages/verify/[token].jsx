import {useEffect} from "react";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import ReactLoading from "react-loading";

import {server} from "../../utils";

import {Container, Header} from "../../components/blocks/Auth";

const VerifyToken = ({token, valid}) => {
  useEffect(() => {
    const verifyUser = async () => {
      const {ok} = await server.putAsync(`/users/account/emailverify/${token}`);

      if (ok) {
        setTimeout(() => {
          Router.push("/dashboard");
        }, 2000);
      }
    };

    verifyUser();
  });

  return (
    <>
      <Head>
        <title>Hifive | Crear contraseña</title>
      </Head>
      <Container className="container">
        <Header>
          <Link href="/">
            <figure className="auth-header__logo">
              <img
                className="auth-header__img"
                src={require("../../public/static/logo-vec-big.png")}
                alt="hifive abogados logo"
              />
            </figure>
          </Link>
        </Header>
        {valid ? (
          <>
            <p className="text">Tu email ha sido verificado exitosamente</p>
            <br></br>
            <p className="text">Redireccionando...</p>
            <div className="d-flex justify-content-center">
              <ReactLoading
                type="spin"
                color="var(--color-primary)"
                height={30}
                width={30}
              />
            </div>
          </>
        ) : (
          <>
            <p className="text">El enlace es invalido o esta expirado</p>
            <br></br>
            <Link href="/verify">
              <a className="auth-container__link">
                Haga click aqui para solicitar otro enlace.
              </a>
            </Link>
          </>
        )}
      </Container>
    </>
  );
};

VerifyToken.getInitialProps = async (ctx) => {
  const {token} = ctx.query;
  const {ok} = await fetch(
    `${process.env.SERVER_API_URL}/users/account/${token}`
  );

  if (ok)
    return {
      token,
      valid: true,
    };

  return {
    token: null,
    valid: false,
  };
};

export default VerifyToken;
