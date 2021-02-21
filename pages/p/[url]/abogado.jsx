import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
import Icon from "../../../public/static/lawyer-icon.png";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import {v4 as uuidv4} from "uuid";
import {useState, useEffect} from "react";
import {SettingsEthernetOutlined} from "@material-ui/icons";
const Container = styled.div`
  padding-bottom: 3rem;
  max-width: 80rem;
  margin: 0 auto;

  .lawyer {
    &__gradient-name {
      color: var(--color-primary);
      font-weight: bold;
      font-family: var(--quicksand);
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    &__eslogan {
      font-family: var(--poppins);
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 30px;
      letter-spacing: 0.15px;
    }

    &__text,
    &__title {
      white-space: pre-line;
      font-family: var(--poppins);
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.1px;
      color: #78869a;
    }

    &__title {
      font-size: 18px;
      font-weight: bold;
    }
  }
`;

const MobileHeading = styled.div`
  padding-top: 1rem;
  background: linear-gradient(231.34deg, #007bff 0%, #00c2ff 100%);
`;

const PresentationText = styled.div`
  text-align: center;
  margin-top: 1.6rem;

  .lawyer {
    &__name {
      color: var(--color-white);
      font-family: var(--quicksand);
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    &__role {
      font-family: var(--poppins);
      color: var(--color-white);
      font-style: normal;
      font-weight: 900;
      font-size: 40px;
      line-height: 101.4%;
      text-transform: uppercase;
    }
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    .lawyer {
      &__name {
        font-family: var(--quicksand);
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 16px;
        /* or 67% */

        letter-spacing: 1.5px;
        text-transform: uppercase;

        color: #000000;
      }

      &__role {
        font-family: Poppins;
        font-style: normal;
        font-weight: 900;
        font-size: 60px;
        line-height: 101.4%;
        /* or 81px */

        color: #000000;
      }
    }
  }
`;

const Media = styled.div`
  position: relative;
  margin-top: 2rem;
  min-height: 31.1rem;
  background: linear-gradient(
    240.63deg,
    #e1e1df 4.66%,
    #e7e7e6 40.61%,
    #e9e9e9 55.8%,
    #eeeeee 63.22%,
    #dfdfdf 69.59%
  );
  width: 100%;
  border-top-right-radius: 24px;
  border-top-left-radius: 24px;
  padding: 0;
`;

const ImageWrapper = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
  img {
    width: 100%;
    object-fit: center;
  }
`;

const LawyerIcon = styled.span`
  margin: auto;
  display: block;
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    object-fit: center;
  }
`;

const Heading = styled.div``;

const LawyerHero = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonYoutube = styled.button`
  border: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #ffffff;
  position: absolute;
  bottom: 16px;
  right: 0;
  padding: 10px;
  border-radius: 25px;
  width: 113px;
  height: 48px;
  margin-right: 16px;
  &:focus {
    outline: none;
  }
  &:active {
    transform: scale(1.1);
  }

  .text_video {
    width: 70%;
    font-size: 13px;
    letter-spacing: 0%;

    font-weight: normal;
    font-style: normal;
    font-family: "Roboto", sans-serif;
  }
`;

const ButtonYoutubeClose = styled(ButtonYoutube)`
  position: absolute;
  bottom: inherit;
  margin-top: 30px;
  margin-right: 17px;
  right: 0;

  .text_video {
    width: 100%;
  }
  @media (min-width: 768px) {
    position: static;
    margin-bottom: 15px;
    margin-left: 17px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  flex-basis: 60%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    211.36deg,
    #e1e1df 4.61%,
    #e7e7e6 43.59%,
    #e9e9e9 58.57%,
    #ececec 67.74%,
    #eeeeee 76.17%,
    #dfdfdf 87.1%
  );
  overflow: hidden;
  border-radius: 32px;
`;

const ModalBackGround = styled.div`
  .container-modal {
    margin-top: 120px;
  }
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(36, 36, 36, 0.8);
  z-index: 1000;
  .video-modal {
    border: none;
    width: 100%;
    height: 200px;
  }
  @media (min-width: 768px) {
    .container-modal {
      position: relative;
      margin-top: 120px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }
    .video-modal {
      border-radius: 10px;
      width: 42%;
      height: 336px;
    }
  }
`;

const ModalVideo = ({video, setVideo}) => {
  const onClickClose = () => {
    setVideo(false);
  };
  const url = video.split("&");
  const urlValue = url[0].split("?");
  const finalUrl = urlValue[1];
  const newUrl = finalUrl.slice(2);

  return (
    <ModalBackGround>
      <div className="container-modal">
        <iframe
          className="video-modal"
          src={`https://www.youtube.com/embed/${newUrl}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <ButtonYoutubeClose onClick={onClickClose}>
          <span className="text_video"> Cerrar Video </span>
        </ButtonYoutubeClose>
      </div>
    </ModalBackGround>
  );
};

const LawyerPage = (value) => {
  const [activeVideo, setVideo] = useState(false);
  const [lawyer, setLawyer] = useState(null);
  let count = 0;
  useEffect(() => {
    fetch(`${process.env.SERVER_API_URL}/users/getwebsite/${value.lawyer.url}`)
      .then((response) => response.json())
      .then((result) =>
        setLawyer(
          result.data.lawyers.filter(
            (lawyer) => lawyer.id === value.lawyer.id
          )[0]
        )
      );
  }, []);

  const onClickVideo = () => {
    setVideo(!activeVideo);
  };

  if (lawyer) {
    lawyer.specialities.map((specialitie) => {
      count = count + specialitie.length;
    });
  }
  return (
    <>
      {lawyer !== null ? (
        <>
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
              rel="stylesheet"
            />

            <title>{lawyer.fullName} | Abogado</title>
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="https://res.cloudinary.com/dbtpr7pcn/image/upload/v1603561180/Favicon%20Layers/favicon2_plnvll.png"
            />
          </Head>
          {activeVideo && (
            <ModalVideo setVideo={setVideo} video={lawyer.video} />
          )}

          <MobileHeading className="d-md-none">
            <div className="container d-flex">
              <div className="d-md-none mr-auto">
                <a href="/">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 25L14.12 22.7917L5.74 14.0625L24 14.0625L24 10.9375L5.74 10.9375L14.12 2.20834L12 0L0 12.5L12 25Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
              <PresentationText>
                <h3 className="lawyer__name">{lawyer.fullName}</h3>
                <p className="lawyer__role">{lawyer.gender}</p>
              </PresentationText>

              <div className="invisible ml-auto">jasjdkaj</div>
            </div>
            <Media
              style={{border: "1px solid red"}}
              className="container-fluid"
            >
              <ImageWrapper>
                {lawyer.image ? (
                  <img src={lawyer.image} />
                ) : (
                  <LawyerIcon>
                    <img src={Icon} alt="" />
                  </LawyerIcon>
                )}
              </ImageWrapper>

              {lawyer.video && (
                <ButtonYoutube onClick={onClickVideo}>
                  <PlayArrowOutlinedIcon
                    style={{fontSize: "35px", color: "rgba(0,0,0,.5)"}}
                  />
                  <span className="text_video"> Ver video </span>
                </ButtonYoutube>
              )}
            </Media>
          </MobileHeading>
          <Heading className="container d-none d-md-block">
            <div className="mt-5">
              <a href="/">
                <svg
                  width="38"
                  height="40"
                  viewBox="0 0 48 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 50L28.24 45.5833L11.48 28.125L48 28.125L48 21.875L11.48 21.875L28.24 4.41667L24 0L0 25L24 50Z"
                    fill="#606368"
                  />
                </svg>
              </a>
            </div>
            <LawyerHero>
              <PresentationText>
                <h3 className="lawyer__name">{lawyer.fullName}</h3>
                <p className="lawyer__role">{lawyer.gender}</p>
              </PresentationText>
              <ImageContainer>
                <ImageWrapper>
                  {lawyer.image ? (
                    <img src={lawyer.image} />
                  ) : (
                    <LawyerIcon>
                      <img src={Icon} alt="" />
                    </LawyerIcon>
                  )}
                </ImageWrapper>
                {lawyer.video && (
                  <ButtonYoutube onClick={onClickVideo}>
                    <PlayArrowOutlinedIcon
                      style={{fontSize: "35px", color: "rgba(0,0,0,.5)"}}
                    />
                    <span className="text_video"> Ver video </span>
                  </ButtonYoutube>
                )}
              </ImageContainer>
            </LawyerHero>
            <div className="text-left">
              {lawyer.linkedin && (
                <div className="text-right mt-4 ">
                  <a href={lawyer.linkedin} target="_blank">
                    <svg
                      width="128"
                      height="24"
                      viewBox="0 0 178 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.252 3.44V36H0.728V3.44H8.252ZM17.4886 8.896C16.1686 8.896 15.0832 8.51466 14.2326 7.752C13.4112 6.96 13.0006 5.992 13.0006 4.848C13.0006 3.67467 13.4112 2.70667 14.2326 1.944C15.0832 1.152 16.1686 0.755997 17.4886 0.755997C18.7792 0.755997 19.8352 1.152 20.6566 1.944C21.5072 2.70667 21.9326 3.67467 21.9326 4.848C21.9326 5.992 21.5072 6.96 20.6566 7.752C19.8352 8.51466 18.7792 8.896 17.4886 8.896ZM21.2286 11.448V36H13.7046V11.448H21.2286ZM41.6411 11.184C44.5158 11.184 46.8038 12.1227 48.5051 14C50.2358 15.848 51.1011 18.4 51.1011 21.656V36H43.6211V22.668C43.6211 21.0253 43.1958 19.7493 42.3451 18.84C41.4945 17.9307 40.3505 17.476 38.9131 17.476C37.4758 17.476 36.3318 17.9307 35.4811 18.84C34.6305 19.7493 34.2051 21.0253 34.2051 22.668V36H26.6811V11.448H34.2051V14.704C34.9678 13.6187 35.9945 12.768 37.2851 12.152C38.5758 11.5067 40.0278 11.184 41.6411 11.184ZM71.3336 36L63.8536 25.704V36H56.3296V3.44H63.8536V21.436L71.2896 11.448H80.5736L70.3656 23.768L80.6616 36H71.3336ZM106.673 23.328C106.673 24.032 106.629 24.7653 106.541 25.528H89.5128C89.6301 27.0533 90.1141 28.2267 90.9648 29.048C91.8448 29.84 92.9154 30.236 94.1768 30.236C96.0541 30.236 97.3594 29.444 98.0928 27.86H106.101C105.69 29.4733 104.942 30.9253 103.857 32.216C102.801 33.5067 101.466 34.5187 99.8528 35.252C98.2394 35.9853 96.4354 36.352 94.4408 36.352C92.0354 36.352 89.8941 35.8387 88.0168 34.812C86.1394 33.7853 84.6728 32.3187 83.6168 30.412C82.5608 28.5053 82.0328 26.276 82.0328 23.724C82.0328 21.172 82.5461 18.9427 83.5728 17.036C84.6288 15.1293 86.0954 13.6627 87.9728 12.636C89.8501 11.6093 92.0061 11.096 94.4408 11.096C96.8168 11.096 98.9288 11.5947 100.777 12.592C102.625 13.5893 104.062 15.012 105.089 16.86C106.145 18.708 106.673 20.864 106.673 23.328ZM98.9728 21.348C98.9728 20.0573 98.5328 19.0307 97.6528 18.268C96.7728 17.5053 95.6728 17.124 94.3528 17.124C93.0914 17.124 92.0208 17.4907 91.1408 18.224C90.2901 18.9573 89.7621 19.9987 89.5568 21.348H98.9728ZM109.146 23.68C109.146 21.1573 109.615 18.9427 110.554 17.036C111.522 15.1293 112.827 13.6627 114.47 12.636C116.113 11.6093 117.946 11.096 119.97 11.096C121.583 11.096 123.05 11.4333 124.37 12.108C125.719 12.7827 126.775 13.692 127.538 14.836V3.44H135.062V36H127.538V32.48C126.834 33.6533 125.822 34.592 124.502 35.296C123.211 36 121.701 36.352 119.97 36.352C117.946 36.352 116.113 35.8387 114.47 34.812C112.827 33.756 111.522 32.2747 110.554 30.368C109.615 28.432 109.146 26.2027 109.146 23.68ZM127.538 23.724C127.538 21.8467 127.01 20.3653 125.954 19.28C124.927 18.1947 123.666 17.652 122.17 17.652C120.674 17.652 119.398 18.1947 118.342 19.28C117.315 20.336 116.802 21.8027 116.802 23.68C116.802 25.5573 117.315 27.0533 118.342 28.168C119.398 29.2533 120.674 29.796 122.17 29.796C123.666 29.796 124.927 29.2533 125.954 28.168C127.01 27.0827 127.538 25.6013 127.538 23.724ZM144.289 8.896C142.969 8.896 141.884 8.51466 141.033 7.752C140.212 6.96 139.801 5.992 139.801 4.848C139.801 3.67467 140.212 2.70667 141.033 1.944C141.884 1.152 142.969 0.755997 144.289 0.755997C145.58 0.755997 146.636 1.152 147.457 1.944C148.308 2.70667 148.733 3.67467 148.733 4.848C148.733 5.992 148.308 6.96 147.457 7.752C146.636 8.51466 145.58 8.896 144.289 8.896ZM148.029 11.448V36H140.505V11.448H148.029ZM168.442 11.184C171.317 11.184 173.605 12.1227 175.306 14C177.037 15.848 177.902 18.4 177.902 21.656V36H170.422V22.668C170.422 21.0253 169.997 19.7493 169.146 18.84C168.295 17.9307 167.151 17.476 165.714 17.476C164.277 17.476 163.133 17.9307 162.282 18.84C161.431 19.7493 161.006 21.0253 161.006 22.668V36H153.482V11.448H161.006V14.704C161.769 13.6187 162.795 12.768 164.086 12.152C165.377 11.5067 166.829 11.184 168.442 11.184Z"
                        fill="#5591F5"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </Heading>
          <Container className="container">
            {lawyer.linkedin && (
              <div className="text-right mt-4 d-md-none">
                <a href={lawyer.linkedin} target="_blank">
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.256 4.448C1.596 4.448 1.05333 4.25733 0.628 3.876C0.217333 3.48 0.0120001 2.996 0.0120001 2.424C0.0120001 1.83733 0.217333 1.35333 0.628 0.971999C1.05333 0.575999 1.596 0.377999 2.256 0.377999C2.90133 0.377999 3.42933 0.575999 3.84 0.971999C4.26533 1.35333 4.478 1.83733 4.478 2.424C4.478 2.996 4.26533 3.48 3.84 3.876C3.42933 4.25733 2.90133 4.448 2.256 4.448ZM4.126 5.724V18H0.364V5.724H4.126ZM14.3323 5.592C15.7696 5.592 16.9136 6.06133 17.7643 7C18.6296 7.924 19.0623 9.2 19.0623 10.828V18H15.3223V11.334C15.3223 10.5127 15.1096 9.87467 14.6843 9.42C14.2589 8.96533 13.6869 8.738 12.9683 8.738C12.2496 8.738 11.6776 8.96533 11.2523 9.42C10.8269 9.87467 10.6143 10.5127 10.6143 11.334V18H6.85228V5.724H10.6143V7.352C10.9956 6.80933 11.5089 6.384 12.1543 6.076C12.7996 5.75333 13.5256 5.592 14.3323 5.592Z"
                      fill="#5591F5"
                    />
                  </svg>
                </a>
              </div>
            )}

            <div className="tex-center mt-4 d-md-none">
              {lawyer.fullName.split(" ").map((str) => (
                <h1 key={str + Math.random()} className="lawyer__gradient-name">
                  {str}
                </h1>
              ))}
            </div>
            <p className="lawyer__eslogan mt-3 mb-3">{lawyer.eslogan}</p>
            <p className="lawyer__text">{lawyer.bio}</p>

            {lawyer.curriculum && (
              <div className="mt-5 mb-3">
                <h2 className="lawyer__title">Mi currículum </h2>
                <p className="lawyer__text">{lawyer.curriculum}</p>
              </div>
            )}
            {count > 0 && (
              <div className="mt-5 mb-3">
                <h2 className="lawyer__title">Mis áreas</h2>
                {Array.isArray(lawyer.specialities) === true ? (
                  lawyer.specialities.map((specialitie) => {
                    if (specialitie.length !== 0) {
                      return (
                        <p key={uuidv4()} className="lawyer__text">
                          {" "}
                          -{specialitie}{" "}
                        </p>
                      );
                    }
                  })
                ) : (
                  <p key={uuidv4()} className="lawyer__text">
                    {" "}
                    -{lawyer.specialities}{" "}
                  </p>
                )}
              </div>
            )}
          </Container>
        </>
      ) : null}
    </>
  );
};

LawyerPage.getInitialProps = ({query, ...ctx}) => {
  if (!query.id) {
    ctx.res.redirect("/");
  }

  return {
    lawyer: {...query},
  };
};

export default LawyerPage;
