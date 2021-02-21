import {useEffect, useState, useContext} from "react";
import Head from "next/head";
import styled from "styled-components";
import Router from "next/router";
import Link from "next/link";
import Layout from "../../../components/layout";
import BookCheckoutForm from "../../../components/blocks/dashboard/forms/BookCheckout";
import {User} from "../../../components/contexts";
import {server} from "../../../utils";
import camara_1 from "../../../public/static/camara-1.png";
import camara_2 from "../../../public/static/camara-2.png";
import camara_3 from "../../../public/static/camara-3.png";

const Container = styled.div`
  width: 75vw;
  padding: 0;
  h1 {
    font-size: 48px;
    font-weight: 300;
    margin-top: 80px;
  }

  p {
    font-size: 17px;
    line-height: 27px;
    font-weight: normal;
    color: #676767;
  }

  @media (max-width: 990px) {
    width: 100%;
    margin: 0 auto;
    .heading-top {
      width: 100%;
      margin: 0;
      margin-bottom: 20px;
      padding-left: 20px;

      h1 {
        font-size: 30px;
      }
      p {
        font-size: 15px;
      }
    }
    .back-arrow-top {
      position: absolute;
      top: 20px;
      left: 15px;
    }
  }
`;

const FormContainer = styled.div`
  max-width: 50rem;
  margin: 126px auto;
  @media (max-width: 990px) {
    width: 95%;
  }
  .heading {
    font-size: 36px;
    line-height: 40px;
    font-weight: 300;
    margin: 50px 0;
  }
`;

const PriceContainer = styled.div`
  max-width: 1000px;
  margin-top: 30px;
  .answer {
    text-align: right;
    font-size: 15px;
    line-height: 22.5px;
    font-weight: 500;
  }
  @media (max-width: 990px) {
    max-width: 50%;
    .answer {
      text-align: center;
      margin-top: 40px;
    }
  }
  @media (max-width: 768px) {
    max-width: 100%;
    .answer {
      text-align: center;
      margin-top: 40px;
    }
  }
`;

const PriceBox = styled.div`
  background: #ffffff;
  min-height: 520px;
  box-shadow: 0px 8px 50px 0 rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  width: 100%;
  margin: 2rem auto;
  padding: 1rem 6rem;
  padding-top: 3rem;
  text-align: center;
  @media (max-width: 990px) {
    width: 90%;
    min-height: 400px;
    .text {
      line-height: 20px;
    }
    .button-reserve {
      margin-bottom: 20px;
    }
  }

  .img-camara {
    width: 45%;
    margin: 10px auto;
    object-fit: cover;
    @media (max-width: 990px) {
      width: 30%;
    }
    @media (max-width: 768px) {
      width: 55%;
    }
    img {
      width: 100%;
    }
  }

  h3 {
    font-size: 15px;
    line-height: 17px;
    font-weight: 600;
  }

  .type {
    height: 30px;
    font-weight: 500;
    font-size: 12px;
    line-height: 27px;
    color: rgba(0, 0, 0, 0.8);
  }
  .card-item {
    .price {
      padding-top: 1.5rem;
      font-size: 17px;
      font-weight: 500;
      line-height: 36px;
      span {
        font-size: 13px;
      }
    }

    .lawyer-price {
      font-size: 13px;
      color: #676767;
      font-weight: 300;
      line-height: 10.5px;
    }
    .text {
      margin-top: 10px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 300;
    }
    .button-reserve {
      text-decoration: none;
      height: 40px;
      background: #5591f5;
      border: none;
      border-radius: 5px;
      color: white;
      font-weight: 500;
      font-size: 14px;
      line-height: 27px;
      width: 100%;
      margin: 15px 0 20px 0;
      @media (max-width: 768px) {
        margin-bottom: 30px;
      }
      &:focus {
        outline: none;
      }
    }
    .space {
      height: 40px;
      line-height: 27px;
    }
  }
`;

const LawyerFigure = styled.figure`
  margin: 0 auto;
  width: 80%;
  max-width: 20rem;

  @media ${(props) => props.theme.mediaQueries.medium} {
    position: absolute;
    top: 80px;
    max-width: 30rem;
    left: 50px;
  }
`;

const LawyersBackground = styled.div``;

// Photo and Videos form field

const Book = ({data}) => {
  const {prices} = data;

  const {user} = useContext(User.UserContext);
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(screen.width);
  }, []);

  return (
    <Layout hideHeader={width < 768}>
      <Head>
        <title>Hifive | Marketing para abogados</title>
      </Head>
      <Container className="container">
        <div className="back-arrow-top mt-5 mb-5 d-md-none">
          <a>
            <img
              className="back-arrow"
              src={require("../../../public/static/back-arrow.png")}
              onClick={() => {
                Router.push("/dashboard");
              }}
            />
          </a>
        </div>

        <div className="row heading-top">
          <div className="col-12 col-md-10">
            <h1 className="heading">Fotos y videos</h1>
            <p>IVA 21% NO INCLUIDO</p>
          </div>
        </div>
      </Container>
      <PriceContainer className="container">
        <div className="row">
          <div className="col-12  col-lg-4 mb-5">
            <PriceBox>
              <div className="img-camara">
                <img src={camara_1} alt="" />
              </div>

              <h3>Fotografía</h3>
              <p className="type">(tipo linkedin)</p>
              <div className="card-item">
                <p className="price">
                  {prices.fotos}
                  <span>,00 </span> €{" "}
                </p>
                <p className="lawyer-price">abogado</p>
                <div className="text">
                  <p class>Desplazamiento y montaje del set</p>
                  <p>+</p>
                  <p> Realizamos las fotos </p>
                  <p>+</p>
                  <p> Editamos y subimos las fotos a tu web </p>
                </div>

                <button
                  onClick={() => {
                    window.location.href = "#form";
                  }}
                  className="button-reserve"
                >
                  {" "}
                  Reservar{" "}
                </button>
              </div>
            </PriceBox>
          </div>
          <div className="col-12 col-lg-4 mb-5">
            <PriceBox>
              <div className="img-camara">
                <img src={camara_2} alt="" />
              </div>

              <h3> Video-entrevista</h3>
              <p className="type"></p>
              <div className="card-item">
                <p className="price">
                  {prices.videos}
                  <span>,00 </span> €{" "}
                </p>
                <p className="lawyer-price">abogado</p>
                <div className="text">
                  <p class>Desplazamiento y montaje del set</p>
                  <p>+</p>
                  <p> Realizamos los videos </p>
                  <p>+</p>
                  <p> Editamos y subimos los videos a tu web </p>
                </div>

                <button
                  onClick={() => {
                    window.location.href = "#form";
                  }}
                  className="button-reserve"
                >
                  {" "}
                  Reservar{" "}
                </button>
              </div>
            </PriceBox>
          </div>
          <div className="col-12 col-lg-4">
            <PriceBox>
              <div className="img-camara">
                <img src={camara_3} alt="" />
              </div>

              <h3>Desplazamiento*</h3>
              <p className="type"></p>
              <div className="card-item">
                <p className="price">
                  {prices.gastos}
                  <span>,00 </span> €{" "}
                </p>
                <div className="text">
                  <p class>
                    Gratis si se contratan fotos y videos por importe igual o
                    superior a 148€
                  </p>
                  <br />
                  <p>
                    Nos desplazamos a tus oficinas y montamos el set de
                    Iluminación, background, micrófono, y cámara profesional
                  </p>
                </div>
              </div>
            </PriceBox>
          </div>
        </div>
        <div className="answer">
          ¿Tienes dudas?
          <a
            href="mailto:preguntanos.hfma@gmail.com"
            target="_blank"
            className=""
          >
            {" "}
            Pregúntanos
          </a>
        </div>
      </PriceContainer>

      <Container className="container" id="form">
        <FormContainer>
          <div className=" mb-5">
            <h1 className="heading mt-4">
              Reservar
              <br />
              <strong className="heading--blue">
                sesión de fotos y videos
              </strong>
            </h1>
          </div>
          <div className="form-container">
            <BookCheckoutForm user={user} prices={prices} />
            <div className="text ">
              <p className="text mt-4">
                Te contactaremos lo antes posible para concretar la fecha.{" "}
                <Link href="/faq">
                  <a className="btn-link">Ver faq</a>
                </Link>
              </p>
            </div>
          </div>
        </FormContainer>
      </Container>
      <div className="container-fluid mt-5 ">
        <LawyersBackground className="row mt-5 d-none d-lg-block">
          <img
            src={require("../../../public/static/book-lawyers.png")}
            alt=""
          />
        </LawyersBackground>
        <LawyersBackground className="row mt-5 d-block d-lg-none">
          <img
            src={require("../../../public/static/book-lawyers-mobile.png")}
            alt=""
          />
        </LawyersBackground>
      </div>
    </Layout>
  );
};

Book.getInitialProps = async (ctx) => {
  const {ok, data} = await server.getAsync("/data/cms");

  if (!ok) ctx.res.redirect("/dashboard");

  return {
    data,
  };
};

export default Book;
