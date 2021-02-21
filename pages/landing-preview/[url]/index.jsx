import React, {useEffect, useState} from "react";
import Head from "next/head";
import {server} from "../../../utils";
import styled from "styled-components";
import Link from "next/link";
import CloseIcon from "@material-ui/icons/Close";
import Branding from "../../../components/sections/website/Components/Branding";
import WelcomeDesktop from "../../../components/blocks/dashboard/landing/sections/WelcomeDesktop";
import CheckBox from "../../../components/blocks/dashboard/forms/Checkbox";
import WelcomePhone from "../../../components/blocks/dashboard/landing/sections/WelcomePhone";
import Information from "../../../components/blocks/dashboard/landing/sections/Information";
import fetch from "isomorphic-unfetch";
import Heading from "../../../components/blocks/dashboard/landing/sections/Heading";

import {
  Lawyers,
  Cases,
  Blogs,
  Clients,
  Presentation,
  Footer,
  Areas,
} from "../../../components/sections/website";
const BannerDesktop = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  width: 100%;
  background-image: ${(props) =>
    `url(${require(`../../../public/static/website-${props.background}`)})`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
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

const ButtonPolitics = styled.div`
  position: fixed;
  bottom: 0px;
  right: 0px;
  z-index: 100000;
  p {
    font-family: Poppins;
    font-weight: 300;

    color: black;
    position: absolute;
    width: 400px;
    bottom: 15px;
    right: 15px;
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

const Contact = styled.div`
  display: flex;
  height: 450px;
  justify-content: center;

  background: #f8f8f8;

  .container-form {
    padding-top: 3rem;
    width: 100%;

    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.02);
  }
  .form {
    height: 75%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 2rem;
    .call {
      font-weight: 400;
      font-size: 2.7rem;
      letter-spacing: -0.04rem;
      padding-bottom: 3rem;
    }
    .input-form {
      width: 100%;
      background: #ededed;
      border: none;
      height: 50px;
      margin-bottom: 1rem;
      padding-left: 2rem;
      font-size: 1.7rem;
      border-radius: 5px;
      &:focus {
        outline: none;
      }
    }
    .text-form {
      padding-top: 2rem;
      padding-left: 2rem;
      font-size: 1.2rem;
      span {
        margin-top: 0.1rem;
        padding-left: 1rem;
      }
    }
  }
  .submit {
    background: #17243e;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      background: #f0f0f0;
      width: 90%;
      height: 50%;
      border-radius: 35px;
      border: none;
      font-size: 15px;
      letter-spacing: -0.02rem;
      font-weight: 400;
      &:focus {
        outline: none;
      }
    }
  }
`;

const WelcomeMobile = styled.div`
  background-image: ${(props) =>
    `url(${require(`../../../public/static/website-${props.background}`)})`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding-bottom: 8rem;
`;

export default function Landing({id, dataB, websiteB}) {
  const [data, setData] = useState(dataB);
  const [website, setWebsite] = useState(websiteB);
  const [activePolitic, setActivePolitics] = useState(true);

  const [form, setForm] = useState({
    number: "",
    question: "",
    checkbox: false,
  });

  const onChangeForm = (e) => {
    console.log(e.target);
    setForm({...form, [e.target.name]: e.target.value});
  };
  const submitForm = () => {
    if (form.number.trim() && form.question.trim() && form.checkbox) {
      window.location.href = `mailto:${data.interviews.email}?Subject=${form.question}&body=Número Telefónico: ${form.number}`;
    }
  };
  return (
    <>
      <Head>
        <title>
          {" "}
          {data &&
            website &&
            `${data.subareaName} | ${website.basic.bufeteName}`}{" "}
        </title>
        <meta
          name="description"
          content={`${
            data.seo.title === "" ? data.principal.title : data.seo.title
          } | ${
            data.seo.description === ""
              ? data.principal.description
              : data.seo.description
          }  `}
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
      {data && website && (
        <>
          <div className="d-none d-md-block">
            <BannerDesktop background="page-background-0.png">
              <Heading
                background="page-background-0.png"
                type={website.basic.type}
                logo={website.basic.logo}
                theme={{color: "gray", mixed: true}}
                eslogan={website.basic.eslogan}
                website={data}
                websiteInfo={website}
              />
              <WelcomeDesktop
                interviews={data.interviews}
                principal={data.principal}
                email={data.interviews.email}
              />
              <ButtonPolitics
                background="page-background-0.png"
                className="d-flex justify-content-end"
              >
                <p className={`web-text mr-3 ${!activePolitic && "off"}`}>
                  Utilizando esta web consientes nuestra<br></br>
                  <Link
                    href={{
                      pathname: `/preview/${website.url}/politicy/cookies`,
                      query: {
                        idSub: data._id ? data._id : null,
                        nameSub: data.subareaName ? data.subareaName : null,
                      },
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
            </BannerDesktop>
          </div>
          <div className="d-md-none">
            <WelcomeMobile
              background="page-background-0.png"
              className="d-md-none"
            >
              <div className="container">
                <div className="pt-3">
                  <Terms className="web__terms text-center">
                    Al usar este sitio web consientes nuestra
                    <Link
                      href={{
                        pathname: `/preview/${website.url}/politicy/cookies`,
                        query: {
                          idSub: data._id ? data._id : null,
                          nameSub: data.subareaName ? data.subareaName : null,
                        },
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
                    type={website.basic.type}
                    logo={website.basic.logo}
                    center
                    textColor="black"
                  />
                </div>
                <div className="text-center">
                  <Slogan className="mb-4">{website.basic.eslogan}</Slogan>
                </div>
              </div>
              <WelcomePhone
                theme={{color: "gray", mixed: true}}
                principal={data.principal}
                basic={data.interviews}
              />
            </WelcomeMobile>
            <Contact>
              <div className="container-form row">
                <div className="col-12 form">
                  <h4 className="call">Solicitar Llamada</h4>
                  <form action="">
                    <input
                      name="number"
                      value={form.number}
                      onChange={onChangeForm}
                      placeholder="Telefono"
                      className="input-form"
                      type="text"
                    />

                    <input
                      name="question"
                      value={form.question}
                      onChange={onChangeForm}
                      placeholder="Pregunta"
                      className="input-form"
                      type="text"
                    />

                    <div className="d-flex text-form">
                      <div
                        style={{cursor: "pointer"}}
                        onClick={() => {
                          onChangeForm({
                            target: {name: "checkbox", value: !form.checkbox},
                          });
                        }}
                      >
                        {" "}
                        <CheckBox color={"gray"} checked={form.checkbox} />{" "}
                      </div>
                      <span>Acepto la politica de privacidad</span>{" "}
                    </div>
                  </form>
                </div>
                <div className="col-12 submit">
                  {" "}
                  <button onClick={submitForm}>
                    Solicitar Llamada Gratuita
                  </button>
                </div>
              </div>{" "}
            </Contact>
          </div>
          <Information
            interviews={data.interviews}
            principal={data.principal}
            theme={{color: "gray", mixed: true}}
          />
          <Lawyers
            lawyers={data.lawyers}
            url={website.url}
            urlSub={data._id}
            urlSubName={data.subareaName}
            preview={true}
            color={{color: "gray", mixed: true}}
          />{" "}
          {data.testimonials.length > 0 && (
            <Clients
              lawyers={data.lawyers}
              clients={data.testimonials}
              theme={{color: "gray", mixed: true}}
            />
          )}
          <Cases
            lawyers={data.lawyers}
            solvedCases={data.solvedCases}
            theme={{color: "gray", mixed: true}}
          />
          <Blogs
            lawyers={data.lawyers}
            blogs={data.blogs}
            theme={{color: "gray", mixed: true}}
          />
          <Areas
            lawyers={data.lawyers}
            areas={website.areas}
            theme={{color: "gray", mixed: true}}
          />
          <Presentation
            lawyers={data.lawyers}
            about={website.aboutUs}
            logo={website.basic.logo}
            theme={{color: "gray", mixed: true}}
            email={data.interviews.email}
            phone={data.interviews.phone}
            type={data.interviews.type}
            bufeteName={website.basic.bufeteName}
          />
          <Footer
            urlSub={data._id}
            urlSubName={data.subareaName}
            url={website.url}
            lawyers={data.lawyers}
            basic={data.interviews}
            theme={{color: "gray", mixed: true}}
            preview={true}
          />
        </>
      )}
    </>
  );
}

Landing.getInitialProps = async (ctx) => {
  const {id} = ctx.query;

  const res = await fetch(
    `${process.env.SERVER_API_URL}/users/getSubareaP/${ctx.query.url}`
  );
  const {ok, data: result} = await res.json();

  const res2 = await fetch(
    `${process.env.SERVER_API_URL}/users/getwebsiteUrl/${result.userId}`
  );

  const {data: result2} = await res2.json();
  const allAreas = result2.areas.filter(
    (element) => element.id === result.subareaId
  );
  const allAreasTwo = result2.areas.filter(
    (element) => element.area === allAreas[0].area
  );
  result2.areas = allAreasTwo;

  return {id, dataB: result, websiteB: result2};
};
