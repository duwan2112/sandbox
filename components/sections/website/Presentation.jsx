import styled from "styled-components";
import Separation from "./Components/Separation";
import {Email, Phone} from "./Components/svgs";
import Glide from "../../Glide";
import Slider from "react-slick";

const MobileWrapper = styled.div`
  height: 250px;
  width: 95%;
  margin: 0 auto;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  padding-top: 2rem;
`;

const Wrapper = styled.section`
  background: #f8f8f8;
  @media ${(props) => props.theme.mediaQueries.medium} {
    padding-top: 10rem;
  }
`;

const Contact = styled.div`
  padding-top: 3rem;
  @media ${(props) => props.theme.mediaQueries.medium} {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: 10rem;
    padding: 0;
    h1 {
      font-weight: 900;
      font-size: 48px;
      line-height: 50px;
      padding-bottom: 4rem;
    }
  }
`;

const Button = styled.a`
  margin: 0 auto;
  background: ${(props) =>
    props.primary
      ? `${
          props.primary === "gray"
            ? `#56A6E6`
            : `var(--color-website-${props.primary})`
        }`
      : "#EEEEEE"};
  color: ${(props) => (props.primary ? "white" : "black")} !important;
  border-radius: 7px !important;
  font-family: var(--quicksand);
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 44px;

  display: flex;
  align-items: center;

  &:hover {
    color: ${(props) => (props.primary ? "white" : "black")} !important;
  }

  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const MobileButton = styled.a`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 3rem;

  background: ${(props) => `var(--color-website-${props.background})`};
  border: 2px solid ${(props) => `var(--color-website-${props.background})`};
  box-sizing: border-box;
  border-radius: 5px;
`;

const PresentationImage = styled.div`
  min-height: 280px;

  width: 100%;
  background-image: ${(props) =>
    props.background
      ? `url(${props.background})`
      : `url(${require(`.//../../../public/static/book-lawyers2.png`)})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;

  @media ${(props) => props.theme.mediaQueries.medium} {
    min-height: 52rem;
    width: 100%;
    padding: 0;
    margin: 0;
    background-image: ${(props) =>
      props.background
        ? `url(${props.background})`
        : `url(${require(`.//../../../public/static/book-lawyers2.png`)})`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
`;

const Presentation = ({
  lawyers,
  about,
  theme,
  email,
  phone,
  type,
  bufeteName,
}) => {
  let newUrl = [];

  about.video.map((element, i) => {
    const url = element.split("&");

    const urlValue = url[0].split("?");

    const finalUrl = urlValue[1];
    if (finalUrl) {
      newUrl.push(finalUrl.slice(2));
    }
  });

  const mobileSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Wrapper>
      <Contact>
        <div className="d-none d-md-block">
          <h1>{lawyers.length === 1 ? "¡Contáctame!" : "¡Contáctanos!"}</h1>
          <ButtonContainer>
            <Button className="btn btn-bold" href={`mailto:${email}`}>
              {email} <Email className="ml-3" />
            </Button>
            <Button
              href={`tel:${phone}`}
              primary={theme.color}
              className="btn btn-bold"
            >
              {phone}
              <Phone className="ml-3" />
            </Button>
          </ButtonContainer>
        </div>
        <div className="d-md-none container">
          <MobileButton
            href={`tel:${phone}`}
            background={theme.color}
            className="btn btn-block btn-bold"
          >
            {lawyers.length === 1 ? "Llámame ahora" : "Llámanos ahora"}
          </MobileButton>
        </div>
      </Contact>
      <PresentationImage
        background={about.imageTeam ? about.imageTeam : null}
      />
      <div className="container">
        <h1 style={{marginBottom: "0"}} className="heading mt-5 ">
          {bufeteName}
          <br />
          <strong className="heading--black">
            {lawyers.length === 1 ? "Tu Abogado" : "Tus Abogados"}
          </strong>
        </h1>
        {about && about.presentation && (
          <p className="web-text">{about.presentation}</p>
        )}{" "}
        {newUrl.length !== 0 && (
          <div className="d-none d-md-block">
            <Separation
              color2={true}
              color={theme.color}
              mixed={theme.mixed}
              maxWidth="90rem"
            >
              <Glide
                bullets
                arrows
                options={{
                  type: "carousel",
                  perView: 1,
                  startAt: 0,
                  focusAt: 0,
                }}
              >
                {newUrl.map((element, i) => {
                  return (
                    <iframe
                      style={{width: "90rem", height: "400px"}}
                      className="video-modal"
                      src={`https://www.youtube.com/embed/${element}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  );
                })}
              </Glide>
            </Separation>{" "}
          </div>
        )}
      </div>
      {newUrl.length !== 0 && (
        <MobileWrapper className="d-md-none">
          {newUrl.map((element, i) => {
            return (
              <div
                style={{
                  marginRight: "2rem",

                  minWidth: "90%",
                }}
              >
                <iframe
                  style={{height: "100%", width: "100%"}}
                  className="video-modal"
                  src={`https://www.youtube.com/embed/${element}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            );
          })}
        </MobileWrapper>
      )}
    </Wrapper>
  );
};

export default Presentation;
