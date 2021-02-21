import React, {useState, useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import Router from "next/router";
import {getAsync} from "../../utils/server";

import {server} from "../../utils";
const Header = ({isLoggedIn, setLogOut, ...props}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(null);
  const dashboard = router.pathname != "/";

  const toggleHeader = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const handleLinkClick = (evt) => {
    if (evt.target.nodeName === "A" && screen.width <= 768) toggleHeader();
  };

  useEffect(() => {
    const UrlLoading = async () => {
      const {data, ok} = await getAsync("/users/website");
      if (ok) {
        setUrl(data.initialValues.url);
      }
    };
    UrlLoading();
  }, []);

  const onClickPlan = async () => {
    if (url) {
      fetch(`${process.env.SERVER_API_URL}/users/getstripe/${url}`)
        .then((response) => response.json())
        .then(async (result) => {
          const stripeCustomer = await server.postAsync(
            "/users/v2/payments/customer",
            {
              stripeCustomer: result.data,
            }
          );
          if (stripeCustomer.ok) {
            location.href = `${stripeCustomer.data.url}`;
          }
        });
    }
  };

  return (
    <>
      <style jsx>{`
        header {
          box-shadow: 0.4px 0.4px 10px rgba(0, 0, 0, 0.2);
        }

        a:hover {
          text-decoration: none !important;
        }
        .row {
          align-items: center;
        }
        /* Logo */
        .logo-link {
          transition: opacity 0.3s ease;
        }
        .logo-link:hover {
          opacity: 0.7;
        }
        .logo {
          display: flex;
          align-items: center;
        }
        .logo__text {
          color: black;
          font-weight: 300;
          font-size: 7px;
          line-height: 1.3;
        }

        .logo__wrapper {
          display: block;
          margin-top: 5px;
        }

        .logo__vector img {
          width: 70px;
        }
        .logo__hifive img {
          width: 90px;
        }

        /* navigation */
        .nav {
          margin-left: auto;
          margin-top: 20px;
        }
        .nav__toggle,
        .nav__icon {
          display: none;
        }
        .nav__list {
          list-style: none;
          display: flex;
        }
        .nav__item:not(:last-child) {
          margin-right: 20px;
        }
        .nav__link {
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 300;
          font-size: 16px;
          line-height: 30px;
          transition: opacity 0.3s ease;
          color: black !important;
        }
        .nav__link:focus {
          outline: none;
        }
        .nav__link:hover {
          opacity: 0.8;
        }
        @media only screen and (max-width: 768px) {
          header {
            background: ${!dashboard ? "#1a79ec" : "var(--color-white)"};
          }
          .row {
            flex-flow: row !important;
          }
          /* Logo */
          .logo {
            position: relative;
            z-index: 5;
          }
          .logo__vector img {
            width: 50px;
          }
          .logo__hifive img {
            width: 70px;
          }
          .logo__text {
            font-size: 5.3px;
            line-height: 5px;
            color: ${dashboard || isOpen ? "black" : "white"};
          }
          .logo__wrapper {
            margin: 0;
          }
          /* Navigation */
          .nav {
            margin: 0;
            margin-left: auto;
          }
          .nav__background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: white;
            z-index: 4;
            transition: all 0.3s ease;
            transform: ${isOpen ? "translateY(0%)" : "translateY(-100%)"};
            opacity: ${isOpen ? "1" : "0"};
          }
          .nav__list {
            position: fixed;
            z-index: 5;
            flex-direction: column;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            text-transform: uppercase;
            transition: opacity 0.2s 0.35s ease;
            visibility: ${isOpen ? "visible" : "hidden"};
            opacity: ${isOpen ? "1" : "0"};
            pointer-envents: ${isOpen ? "none" : "all"};
          }
          .nav__link {
            font-weight: 300;
            font-size: 24px;
            line-height: 30px;
          }
          .nav__item:not(:last-child) {
            margin-right: 0px;
            margin-bottom: 31px;
          }
          .nav__menu {
            position: relative;
            z-index: 5;
            display: block;
            width: 22px;
            height: 22px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 0;
          }
          .nav__icon,
          .nav__icon::before,
          .nav__icon::after {
            position: relative;
            display: block;
            height: 2px;
            width: 100%;
            border-radius: 4px;
            transition: all 0.3s ease;
            background: ${dashboard
              ? isOpen
                ? "white"
                : "black"
              : isOpen
              ? "white"
              : "white"};
          }
          .nav__icon::before,
          .nav__icon::after {
            content: "";
            position: absolute;
          }
          .nav__icon::before {
            top: ${isOpen ? "0" : "-6px"};
            transform: ${isOpen ? "rotate(45deg)" : "rotate(0)"};
            background: ${dashboard || isOpen ? "black" : "white"};
          }
          .nav__icon::after {
            bottom: ${isOpen ? "0" : "-6px"};
            transform: ${isOpen ? "rotate(-45deg)" : "rotate(0)"};
            background: ${dashboard || isOpen ? "black" : "white"};
          }
        }
        @media only screen and (max-width: 680px) {
          .nav__link {
            font-size: 22px;
          }
        }
      `}</style>
      <header className="container-fluid header-shadow">
        <div className="container">
          <div className="row">
            <Link href={`${isLoggedIn ? "/dashboard" : "/"}`}>
              <a className="logo-link">
                <div className="logo">
                  <figure className="logo__vector">
                    <img
                      src={require("../../public/static/logo_vec.png")}
                    ></img>
                  </figure>
                  <div className="logo__wrapper">
                    <figure className="logo__hifive">
                      <img
                        src={require("../../public/static/hifive.png")}
                        alt=""
                      />
                    </figure>
                    <h1 className="logo__text">Marketing para Abogados</h1>
                  </div>
                </div>
              </a>
            </Link>
            <nav className="nav">
              <div className="nav__background"></div>
              <label
                htmlFor="toggler"
                className="nav__menu"
                onClick={toggleHeader}
              >
                <span className="nav__icon"></span>
              </label>
              <ul className="nav__list" onClick={handleLinkClick}>
                {!isLoggedIn ? (
                  <>
                    {router && router.pathname != "/" ? (
                      <li className="nav__item">
                        <Link href={isLoggedIn ? "/dashboard" : "/"}>
                          <a className="nav__link">Inicio</a>
                        </Link>
                      </li>
                    ) : null}
                    <li className="nav__item">
                      <Link href="/faq">
                        <a className="nav__link">FAQ</a>
                      </Link>
                    </li>
                    <li className="nav__item">
                      <Link href="#plan">
                        <a className="nav__link">Precios</a>
                      </Link>
                    </li>
                    <li className="nav__item">
                      <Link href="/register">
                        <a className="nav__link">Crear mi web</a>
                      </Link>
                    </li>
                    <li className="nav__item">
                      <Link href={`/login`}>
                        <a className="nav__link">Iniciar sesión</a>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {router && router.pathname != "/dashboard" ? (
                      <li className="nav__item">
                        <Link href={isLoggedIn ? "/dashboard" : "/"}>
                          <a className="nav__link">Inicio</a>
                        </Link>
                      </li>
                    ) : null}
                    <li className="nav__item">
                      <Link href="/faq">
                        <a className="nav__link">FAQ</a>
                      </Link>
                    </li>

                    <li className="nav__item">
                      <button onClick={onClickPlan} className="nav__link">
                        Cambiar plan
                      </button>
                    </li>

                    <li className="nav__item">
                      <button
                        onClick={() => {
                          location.href = `/billing`;
                        }}
                        className="nav__link"
                      >
                        Datos facturación
                      </button>
                    </li>

                    {/* <li className="nav__item">
                      <Link href={`/${websiteUrl}`}>
                        <a className="nav__link">Ver mi web</a>
                      </Link>
                    </li> */}
                    <li className="nav__item">
                      <a
                        className="nav__link"
                        onClick={setLogOut}
                        role="button"
                      >
                        Cerrar sesión
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
