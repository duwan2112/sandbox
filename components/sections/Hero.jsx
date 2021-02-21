import styled from "styled-components";
import Link from "next/link";
import banner from "../../public/static/banner-1.png";
import bannerMobile from "../../public/static/banner-mobile.png";

const StyledHero = styled.div`
  position: relative;
  min-height: 60rem;
  height: 100vh;
  max-height: 800px;
  color: var(--color-white);

  @media ${(props) => props.theme.mediaQueries.large} {
    height: 90vh;
  }
`;

const Banner = styled.figure`
  display: block;
  position: absolute;
  z-index: -1;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const StyledContentBox = styled.div`
  h3 {
    font-weight: 900;
    font-size: 3.2rem;
    line-height: 30px;
  }

  h1 {
    font-weight: 900;
    font-size: 4.8rem;
    line-height: 40px;
  }

  h2 {
    font-weight: 900;
    font-size: 2.2rem;
    line-height: 26px;
    margin: 2em 0;
  }

  p {
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 30px;
  }

  p span {
    font-size: 1.2rem;
  }

  .btn-box {
    margin-top: 2rem;
    margin-bottom: 1.4rem;
  }

  .star-box:not(:last-child) {
    margin: 0 3px;
  }

  span {
    font-weight: 500;
    font-size: 9px;
    line-height: 30px;
  }

  @media ${(props) => props.theme.mediaQueries.smallest} {
    h2 {
      font-size: 2.4rem;
      line-height: 30px;
    }
  }
  @media ${(props) => props.theme.mediaQueries.large} {
    h1 {
      font-size: 6.4rem;
      line-height: 5.6rem;
    }

    h2 {
      font-size: 4rem;
      line-height: 5.6rem;
    }

    p {
      font-size: 2.4rem;
    }

    p span {
      font-size: 1.8rem;
    }

    .btn-box {
      a {
        padding: 1em 6em;
      }
    }

    span {
      font-size: 10px;
    }
  }
`;

const Hero = () => {
  return (
    <section>
      <StyledHero className="container-fluid">
        <Banner>
          <img src={bannerMobile} srcSet={`${bannerMobile} 680w, ${banner}`} />
        </Banner>
        <div className="container h-100 d-flex justify-content-center align-items-center">
          <StyledContentBox className="text-center content-box ">
            <h3>Para vosotros</h3>
            <h1>Abogados</h1>
            <h2>
              Tu web{"  "}+{"  "} Campaña de publicidad en Google
            </h2>
            <p>
              Desde 29.99€<span>/mes</span>
            </p>
            <div className="btn-box">
              <Link href="/register">
                <a href="" className="btn btn-warning btn-bold">
                  Empieza gratis
                </a>
              </Link>
            </div>
            {/*  <div className="stars d-flex justify-content-center align-items-center">
              <figure className="star-box">
                <img
                  src={require("../../public/static/star.png")}
                  alt="star icon image"
                />
              </figure>
              <figure className="star-box">
                <img
                  src={require("../../public/static/star.png")}
                  alt="star icon image"
                />
              </figure>
              <figure className="star-box">
                <img
                  src={require("../../public/static/star.png")}
                  alt="star icon image"
                />
              </figure>
              <figure className="star-box">
                <img
                  src={require("../../public/static/star.png")}
                  alt="star icon image"
                />
              </figure>
              <figure className="star-box">
                <img
                  src={require("../../public/static/star.png")}
                  alt="star icon image"
                />
              </figure>
            </div>
            <span>Puntuación de 5/5 en TrueReview</span> */}
          </StyledContentBox>
        </div>
      </StyledHero>
    </section>
  );
};

export default Hero;
