import {useState, useContext, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import {Alert, User} from "../components/contexts";

import {
  Container,
  Header,
  AuthMethodButton,
  AuthForm,
  AuthFormGroup,
  AuthFormButton,
} from "../components/blocks/Auth";

import {server} from "../utils";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const {setToast} = useContext(Alert.AlertContext);
  const {setLogIn} = useContext(User.UserContext);

  const handleSubmit = async (event) => {
    let id = null;

    rewardful("ready", function () {
      if (Rewardful.affiliate) {
        id = Rewardful.affiliate.id;
      }
    });
    event.preventDefault();

    setIsLoading(true);

    const {ok, data} = await server.postAsync("/auth/register", {
      email,
      password,
      rewardful: id,
    });

    setIsLoading(false);

    if (ok && !data.emailVerified) {
      setToast("Usuario registrado correctamente", "success");
      setLogIn(ok, data);
      Router.push("/verify");
    } else if (ok) {
      setLogIn(ok, data);
      Router.push("/dashboard");
    } else {
      if (!data.id) setError({id: "email", message: data});
      else setError(data);
    }
  };

  useEffect(() => {
    if (error) setError({});
  }, [email, password]);

  return (
    <>
      <Head>
        <title>Hifive | Crear cuenta</title>
      </Head>
      <Container className="container">
        <Header>
          <div className="auth-header__link-wrapper">
            <Link href={`/login`}>
              <a className="auth-header__link">
                ¿Ya tienes cuenta? Inicia sesion
              </a>
            </Link>
            <div className="auth-header__mobile-link">
              <Link href="/login">
                <a className="">
                  <img
                    className="auth-header__arrow"
                    src={require("../public/static/left-arrow.png")}
                    alt="left arrow"
                  />
                  Crear cuenta
                </a>
              </Link>
            </div>
          </div>
          <Link href="/">
            <figure className="auth-header__logo">
              <img
                className="auth-header__img"
                src={require("../public/static/logo-vec-big.png")}
                alt="hifive abogados logo"
              />
            </figure>
          </Link>
        </Header>
        <div>
          <AuthMethodButton href={`${process.env.BASE_API_URL}/auth/google`}>
            <img
              className="method-btn__icon"
              src={require("../public/static/google-icon.png")}
            />
            Continuar con Google
          </AuthMethodButton>

          {!isOpen ? (
            <>
              <AuthMethodButton onClick={() => setIsOpen(!isOpen)}>
                <img
                  className="method-btn__icon"
                  src={require("../public/static/email-icon.png")}
                />
                Continuar con Email
              </AuthMethodButton>
              <AuthForm>
                <p className="auth-form__terms">
                  Acepto los
                  <Link href="/legal">
                    <a style={{color: "black"}}> términos y condiciones </a>
                  </Link>
                  y la
                  <Link href="/privacy">
                    <a style={{color: "black"}}> politica de privacidad </a>
                  </Link>
                </p>
              </AuthForm>
            </>
          ) : (
            ""
          )}
        </div>
        {isOpen ? (
          <AuthForm data-rewardful="true" onSubmit={handleSubmit}>
            <h3 className="auth-form__title">Continuar con Email</h3>
            <AuthFormGroup
              type="email"
              label="Email"
              onChange={setEmail}
              error={error.id === "email" ? error : null}
              icon={require("../public/static/email-icon.png")}
              required
            />
            <AuthFormGroup
              type="password"
              label="Contraseña"
              onChange={setPassword}
              error={error.id === "password" ? error : null}
              icon={require("../public/static/lock-icon.png")}
              required
            />
            <p className="auth-form__terms">
              Acepto los
              <Link href="/legal">
                <a style={{color: "black"}}> términos y condiciones </a>
              </Link>
              y la
              <Link href="/privacy">
                <a style={{color: "black"}}> politica de privacidad</a>
              </Link>
            </p>

            <Link href={`/login`}>
              <a className="auth-form__link d-md-none">
                ¿Ya tienes cuenta? Inicia sesión
              </a>
            </Link>
            <AuthFormButton type="primary" loading={isLoading}>
              Crear cuenta
            </AuthFormButton>
          </AuthForm>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};

export default Register;
