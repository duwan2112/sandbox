import { useState, useEffect, useContext } from "react";
import { server } from "../../utils";
import Head from "next/head";
import Link from "next/link";

import { Alert } from "../../components/contexts";

import {
  Container,
  Header,
  AuthForm,
  AuthFormGroup,
  AuthFormButton
} from "../../components/blocks/Auth";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setToast } = useContext(Alert.AlertContext);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    const { ok, data } = await server.postAsync(
      "/users/account/passwordreset",
      {
        email
      }
    );

    if (ok) {
      setToast(data, "success");
    } else {
      setError({ message: data });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (error) setError(null);
  }, [email]);

  return (
    <>
      <Head>
        <title>Hifive | Restablecer contraseña</title>
      </Head>
      <Container className="container">
        <Header>
          <div className="auth-header__link-wrapper">
            <div className="auth-header__mobile-link">
              <Link href="/login">
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

        <AuthForm onSubmit={handleSubmit}>
          <AuthFormGroup
            type="email"
            label="Email"
            onChange={setEmail}
            error={error}
            icon={require("../../public/static/email-icon.png")}
          />
          <p className="auth-form__text">
            Te enviaremos un email con un enlace desde el que podrás establecer
            una nueva contraseña
          </p>

          <AuthFormButton type="primary" outlined loading={isLoading}>
            Enviar
          </AuthFormButton>
        </AuthForm>
      </Container>
    </>
  );
};

export default PasswordReset;
