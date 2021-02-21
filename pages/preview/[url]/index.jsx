import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import {server} from "../../../utils";
import styled from "styled-components";
import Branding from "../../../components/sections/website/Components/Branding";
import Heading from "../../../components/sections/website/Components/Heading";
import {useEffect, useState, useContext} from "react";
import {useWindowDimensions} from "../../../hooks";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackSharpIcon from "@material-ui/icons/ArrowBackSharp";
import Router from "next/router";

import {
  Welcome,
  Lawyers,
  HowItWorks,
  Clients,
  Questions,
  Footer,
  Cases,
  Areas,
  Blogs,
  Presentation,
  WelcomeDesktop,
} from "../../../components/sections/website";

const Container = styled.div``;

const BannerDesktop = styled.div`
  height: 100vh;

  width: 100%;
  background-image: ${(props) =>
    `url(${require(`../../../public/static/website-${props.background}`)})`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const ButtonPolitics = styled.div`
  p {
    font-family: Poppins;
    font-weight: 300;

    color: black;
    position: absolute;
    bottom: 40px;
    right: 30px;
    padding: 2rem;
    background: #fff;
    border-radius: 15px;
    padding-right: 5rem;

    a {
      text-decoration: none;
      font-family: Poppins;
      font-weight: 300;
      color: black;
    }
    .btn-close {
      border: none;
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      &:focus {
        outline: none;
      }
    }

    transition: 1s all;
  }
  .off {
    opacity: 0;
    display: none;
    transition: 1s all;
  }
`;

const Terms = styled.p`
  font-size: 1.1rem;
  font-weight: 300;
  strong {
    font-weight: var(--semiBold);
  }
`;

const Slogan = styled.p`
  font-family: var(--quicksand);
  font-weight: bold;
  font-size: 12px;
  line-height: 12px;
`;

const Website = ({website, url}) => {
  const {width} = useWindowDimensions();
  const [theme, setTheme] = useState({});
  const [activePolitic, setActivePolitics] = useState(true);
  const {
    basic,
    welcomeScreen,
    lawyers,
    howItWorks,
    clients,
    solvedCases,
    blogs,
    areas,
    aboutUs,
    questions,
    politics,
  } = website;

  const prueba = async () => {
    const {ok: sessionRequest} = await server.getAsync("/auth/session");
    if (!sessionRequest) {
      Router.push("/");
    }
  };
  prueba();

  useEffect(() => {
    if (width <= 768) {
      setTheme({...welcomeScreen.mobileColor});
    } else {
      setTheme({...welcomeScreen.desktopColor});
    }
  }, [width]);

  let areasMeta = false;
  if (areas.length !== 0) {
    areasMeta = areas.map((area) => area.area);
  }

  return (
    <>
      <Head>
        <title>{basic.bufeteName} | Abogados</title>
        <meta
          name="description"
          content={`Abogados ${areasMeta && `| ${areasMeta}`} | ${
            basic.direction
          } | Tlf ${basic.phone} `}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicon2.png"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="d-none d-md-block">
        <BannerDesktop background={welcomeScreen.background}>
          <Heading
            background={welcomeScreen.background}
            type={basic.type}
            logo={basic.logo}
            theme={theme}
            eslogan={basic.eslogan}
            website={website}
          />
          <WelcomeDesktop
            message={welcomeScreen}
            background={welcomeScreen.background}
            basic={basic}
          />
        </BannerDesktop>
        <ButtonPolitics
          background={welcomeScreen.background}
          className="d-flex justify-content-end"
        >
          <p className={`web-text mr-3 ${!activePolitic && "off"}`}>
            Utilizando esta web consientes nuestra<br></br>
            <Link
              href={{
                pathname: `/preview/${url}/politicy/cookies`,
              }}
            >
              <a>Política de Cookies</a>
            </Link>{" "}
            <button
              onClick={() => {
                setActivePolitics(false);
              }}
              className="btn-close"
            >
              <CloseIcon className="close-icon" />
            </button>
          </p>
        </ButtonPolitics>
      </div>

      <div style={{background: "#f8f8f8"}} className="d-md-none">
        <Container className="container">
          <div className="pt-3">
            <Terms className="web__terms text-center">
              Al usar este sitio web consientes nuestra
              <Link
                href={{
                  pathname: `/preview/${url}/politicy/cookies`,
                }}
              >
                <a className="btn-link--black">
                  <strong> política de cookies</strong>
                </a>
              </Link>
            </Terms>
          </div>
          <div className="mt-4 mb-4">
            <Branding
              type={basic.type}
              logo={basic.logo}
              center
              textColor="black"
            />
          </div>
          <div className="text-center">
            <Slogan className="mb-4">{basic.eslogan}</Slogan>
          </div>
        </Container>
        <Welcome
          theme={theme}
          welcomeScreen={welcomeScreen}
          basic={basic}
          message={welcomeScreen.optionTwo}
          lawyers={lawyers}
          lawyer={lawyers[lawyers.length - 1]}
        />
      </div>

      <Lawyers
        basic={basic}
        lawyers={lawyers}
        url={url}
        preview={true}
        color={theme}
      />
      <HowItWorks lawyers={lawyers} howItWorks={howItWorks} theme={theme} />
      <Clients lawyers={lawyers} clients={clients} theme={theme} />
      <Questions
        basic={basic}
        lawyers={lawyers}
        questions={questions}
        type={basic.type}
        theme={theme}
      />
      <Cases
        lawyers={lawyers}
        solvedCases={solvedCases}
        theme={theme}
        basic={basic}
      />
      <Blogs lawyers={lawyers} blogs={blogs} theme={theme} basic={basic} />
      <Areas lawyers={lawyers} areas={areas} theme={theme} basic={basic} />

      <Presentation
        lawyers={lawyers}
        about={aboutUs}
        logo={basic.logo}
        theme={theme}
        email={basic.email}
        phone={basic.phone}
        type={basic.type}
        bufeteName={basic.bufeteName}
      />

      <Footer
        politics={politics}
        url={url}
        lawyers={lawyers}
        basic={basic}
        theme={theme}
        preview={true}
      />
    </>
  );
};

Website.getInitialProps = async (ctx) => {
  const {url} = ctx.query;
  const res = await fetch(
    `${process.env.SERVER_API_URL}/users/getwebsite/${url}`
  );
  const {ok: webRequest, data: website} = await res.json();

  const {ok: sessionRequest} = await server.getAsync("/auth/session");

  // Si se obtuvo un sitio web
  if (webRequest) {
    if (website.visible || sessionRequest) return {website, url};
    //else ctx.res.redirect("/");
  } else {
    //ctx.res.redirect("/");
  }

  return {website, url};
};

export default Website;
