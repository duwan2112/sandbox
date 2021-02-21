import {useState, useContext, useEffect} from "react";
import Head from "next/head";
import Router, {useRouter} from "next/router";
import Link from "next/link";
import {User} from "../components/contexts";
import {
  Container,
  Header,
  AuthMethodButton,
  AuthForm,
  AuthFormGroup,
  AuthFormButton,
} from "../components/blocks/Auth";

import {server} from "../utils";

const Login = () => {
  const {setLogIn} = useContext(User.UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const {ok, data} = await server.postAsync("/auth/login", {
      email,
      password,
    });
    setIsLoading(false);

    if (ok && !data.emailVerified) {
      setLogIn(ok, data);
      Router.push("/verify");
    } else if (ok) {
      setLogIn(ok, data);
      Router.push("/dashboard");
    } else {
      Router.push("/login?fail=1");
    }
  };
  return (
    <>
      <Head>
        <title>Hifive | Inicia sesión</title>
      </Head>
      <Container className="container">
        <Header>
          <div className="auth-header__link-wrapper">
            <Link href={`/register`}>
              <a className="auth-header__link">¿No tienes cuenta? Registrate</a>
            </Link>
            <div className="auth-header__mobile-link">
              <Link href="/">
                <a className="">
                  <img
                    className="auth-header__arrow"
                    src={require("../public/static/left-arrow.png")}
                    alt="left arrow"
                  />
                  Iniciar sesión
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
        </div>
        <AuthForm onSubmit={handleSubmit}>
          {router && router.query && !router.query.fail ? (
            <h3 className="auth-form__title">Continuar con Email</h3>
          ) : (
            <h3
              className="auth-form__title"
              css={`
                color: var(--color-danger);
              `}
            >
              Email and password combination is not correct
            </h3>
          )}

          <AuthFormGroup
            type="email"
            label="Email"
            onChange={setEmail}
            required
            icon={require("../public/static/email-icon.png")}
          />
          <AuthFormGroup
            type="password"
            label="Contraseña"
            onChange={setPassword}
            required
            icon={require("../public/static/lock-icon.png")}
          />
          <Link href="/passwordreset">
            <a className="auth-form__link">
              ¿Has olvidado la contraseña? Recuperala
            </a>
          </Link>
          <Link href={`/register`}>
            <a className="auth-form__link d-md-none">
              ¿No tienes cuenta? Registrate
            </a>
          </Link>
          <AuthFormButton type="primary" loading={isLoading}>
            Inicia sesión
          </AuthFormButton>
        </AuthForm>
      </Container>
    </>
  );
};

export default Login;
