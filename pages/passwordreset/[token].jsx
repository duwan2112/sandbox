import { useState, useContext, useEffect } from "react";
import { server } from "../../utils";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import fetch from "isomorphic-unfetch";

import { Alert } from "../../components/contexts";

import {
  Container,
  Header,
  AuthForm,
  AuthFormGroup,
  AuthFormButton
} from "../../components/blocks/Auth";

const PasswordResetToken = ({ token, valid }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setToast } = useContext(Alert.AlertContext);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    const { data, ok } = await server.putAsync(
      `/users/account/passwordreset/${token}`,
      {
        password
      }
    );

    if (ok) {
      setToast(data, "success");

      setTimeout(() => {
        Router.push("/login");
      }, 2000);
    } else {
      setError({ message: data });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (error) setError(null);
  }, [password]);

  return (
    <>
      <Head>
        <title>Hifive | Crear contraseña</title>
      </Head>
      <Container className="container">
        <Header>
          <div className="auth-header__link-wrapper">
            <Link href="/register">
              <a className="auth-header__link">¿No tienes cuenta? Registrate</a>
            </Link>
            <div className="auth-header__mobile-link">
              <Link href="/passwordreset">
                <a className="">
                  <img
                    className="auth-header__arrow"
                    src={require("../../public/static/left-arrow.png")}
                    alt="left arrow"
                  />
                  Restablecer contraseña
                </a>
              </Link>
            </div>
          </div>
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
            <AuthForm onSubmit={handleSubmit}>
              <AuthFormGroup
                type="password"
                label="Contraseña"
                onChange={setPassword}
                error={error}
                icon={require("../../public/static/lock-icon.png")}
              />
              <AuthFormButton type="primary" outlined loading={isLoading}>
                Guardar
              </AuthFormButton>
            </AuthForm>
          </>
        ) : (
          <>
            <p className="text">El enlace es invalido o esta expirado</p>
            <br></br>
            <Link href="/passwordreset">
              <a className="auth-container__link">
                Haga click aqui para cambiar su contraseña.
              </a>
            </Link>
          </>
        )}
      </Container>
    </>
  );
};

PasswordResetToken.getInitialProps = async ctx => {
  const { token } = ctx.query;
  const { ok } = await fetch(
    `${process.env.SERVER_API_URL}/users/account/${token}`
  );

  if (ok)
    return {
      token,
      valid: true
    };

  return {
    token: null,
    valid: false
  };
};

export default PasswordResetToken;
