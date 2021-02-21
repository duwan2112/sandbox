import React from "react";
import Separation from "../.././../../sections/website/Components/Separation";
import styled from "styled-components";
import Glide from "../../../../Glide";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 4rem;
  p {
    line-height: 37px;
    font-size: 1.7rem;
    text-align: left;
    white-space: pre-line;
  }
  .button {
    background: #f0f0f0;
    width: 30%;
    height: 50px;
    border-radius: 35px;
    border: none;
    font-size: 15px;
    letter-spacing: -0.02rem;
    font-weight: 400;
    margin: 6rem auto;
    text-align: center;
    line-height: 50px;
    color: black;
    text-decoration: none;

    &:focus {
      outline: none;
    }
  }

  h3 {
    font-size: 30px;
    font-weight: 400;
    padding-bottom: 1rem;
    line-height: 52.5px;
  }

  @media (max-width: 980px) {
    padding: 2rem 2rem 0 2rem;
    h3 {
      font-size: 16px;
      font-weight: 600;
    }
    p {
      font-size: 1.4rem;
    }
    .button {
      width: 60%;
    }
  }
`;

const MobileWrapper = styled.div`
  height: 250px;
  width: 95%;
  margin: 0 auto;
  overflow-x: scroll;
  overflow-y: hidden;
  position: relative;
  z-index: 1000;

  display: flex;
  padding-top: 2rem;
`;
export default function Information({theme, principal, interviews}) {
  let newUrl = [];

  interviews.video.map((element, i) => {
    const url = element.split("&");

    const urlValue = url[0].split("?");

    const finalUrl = urlValue[1];
    if (finalUrl) {
      newUrl.push(finalUrl.slice(2));
    }
  });
  return (
    <Separation
      color2={true}
      color={theme.color}
      mixed={theme.mixed}
      maxWidth="90rem"
    >
      <Container>
        <p>{principal.comment}</p>
        <a
          target="_blank"
          className="button"
          href={`https://maps.google.com/?q=${interviews.direction[0]}`}
        >
          Dónde estamos{" "}
        </a>
        {principal.all.map((element) => {
          return (
            <div style={{paddingBottom: "7rem"}}>
              <h3>{element.title}</h3>
              <p>{element.comment}</p>
            </div>
          );
        })}
      </Container>

      {newUrl.length !== 0 && (
        <>
          {" "}
          <div className="d-none d-md-block">
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
                    style={{
                      width: "90rem",
                      height: "400px",
                    }}
                    className="video-modal"
                    src={`https://www.youtube.com/embed/${element}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                );
              })}
            </Glide>
          </div>
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
        </>
      )}
    </Separation>
  );
}
