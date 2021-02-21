import {useState, useContext} from "react";
import Head from "next/head";
import Link from "next/link";

import {server} from "../../utils";

import {Alert, User} from "../../components/contexts";

import {
  Container,
  Header,
  AuthForm,
  AuthFormButton,
} from "../../components/blocks/Auth";

const Verify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {user, setLogOut} = useContext(User.UserContext);
  const {setToast} = useContext(Alert.AlertContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const {ok, data} = await server.postAsync("/users/account/emailverify", {
      email: user.email,
    });

    setToast(data, ok ? "Success" : "error");
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Hifive | Restablecer contraseña</title>
      </Head>
      <Container className="container">
        <Header>
          <Link href="/verify">
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
          <p className="auth-form__text">
            Te enviaremos un email con un enlace desde el que podrás confirmar
            tu email.
          </p>

          <AuthFormButton type="primary" outlined loading={isLoading}>
            Verificar email
          </AuthFormButton>
        </AuthForm>

        <Link href="#">
          <a className="auth-container__link" onClick={setLogOut}>
            Iniciar sesión
          </a>
        </Link>
      </Container>
    </>
  );
};

export default Verify;
