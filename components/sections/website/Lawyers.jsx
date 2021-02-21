import styled from "styled-components";
import Link from "next/link";
import Glide from "../../Glide";
import {useState} from "react";
import {v4 as uuidv4} from "uuid";
import LawyerIcon from "../../../public/static/lawyer-icon.png";

import Separation from "./Components/Separation";

// import { Carousel } from "react-responsive-carousel";

import {LeftArrowWhite, RightArrowWhite} from "./Components/svgs";

import Slider from "react-slick";

const DesktopSliderWrapper = styled.div`
  max-width: 750px;
  width: 100vw;
  margin: 0 auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const MobileLawyers = styled.div`
  padding-left: 20px;
  padding-bottom: 3rem;
  background: #f8f8f8;
`;

const MobileTitle = styled.h2`
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  padding: 3rem 0;
  padding-top: 7rem;
`;

const SingleLawyerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const DesktopLawyers = styled.div`
  background: #f8f8f8;
  padding: 10rem 0;
  padding-top: 5rem;
`;

const LawyerWrapper = styled.div`
  width: 160px !important;
  margin-right: 1.8rem !important;

  .lawyer {
    &__thumbnail {
      background: #f2f2f2;
      width: 16rem;
      height: 16rem;
      border-radius: 1.5rem;
      overflow: hidden;
      display: flex;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__icon {
      margin: auto;
      width: 40px !important;
      height: 40px !important;
    }

    &__name {
      font-family: var(--poppins);
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      /* line-height: 21px; */
    }

    &__xp {
      display: block;
      font-family: var(--poppins);
      font-style: normal;
      font-weight: 300;
      font-size: 10px;
      line-height: 1;

      color: rgba(0, 0, 0, 0.7);
    }

    &__link {
      min-width: 16rem;
      margin-top: 1rem;
      font-size: 9px;
      padding: 1em 0.7em;
      line-height: 1;
      border-color: ${(props) =>
        props.color === "gray"
          ? "black"
          : `var(--color-website-${props.color})`};
      background: #f8f8f8;
      color: black;

      &:hover {
        background: ${(props) => `var(--color-website-${props.color})`};
      }
    }
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    width: 18rem !important;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-bottom: 3px;
    .lawyer {
      &__thumbnail {
        width: 18rem;
        height: 18rem;
      }

      &__name {
        font-size: 17px;
      }

      &__xp {
        font-size: 14px;
      }

      &__link {
        border-color: ${(props) =>
          props.color === "gray"
            ? "black"
            : `var(--color-website-${props.color})`};
        background: #f8f8f8;
        color: black;
        font-size: 12px;
        min-width: 18rem;
        padding: 0.5em 0.7em;
      }
    }
  }
`;

const StyledArrow = styled.div`
  background: var(--color-website-background);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: var(--color-website-background);
  }

  &:before {
    content: none;
  }
`;

const Title = styled.div`
  background: #f8f8f8;
  text-align: center;
  margin-bottom: 0;
  padding-top: 18rem;
  h1 {
    font-size: 40px;
    line-height: 52.5px;
    font-weight: 500;
  }
`;

function SampleNextArrow(props) {
  const {className, onClick} = props;
  return (
    <StyledArrow className={className} onClick={onClick}>
      <RightArrowWhite />
    </StyledArrow>
  );
}

function SamplePrevArrow(props) {
  const {className, onClick} = props;
  return (
    <StyledArrow className={className} onClick={onClick}>
      <LeftArrowWhite />
    </StyledArrow>
  );
}

const LawyerItem = ({
  basic,
  lawyer,
  url,
  urlSub,
  urlSubName,
  preview,
  color,
}) => {
  return (
    <LawyerWrapper className="lawyer__wrapper" color={color}>
      <figure className="lawyer__thumbnail mb-2">
        {lawyer.image ? (
          <img src={lawyer.image} alt="" />
        ) : (
          <img className="lawyer__icon" src={LawyerIcon} alt="" />
        )}
      </figure>
      <div>
        <p className="lawyer__name">{lawyer.fullName}</p>
        {lawyer.experience.length !== 0 ? (
          <span className="lawyer__xp">
            {lawyer.experience} {lawyer.experience > 1 ? "años" : "año"} de
            experiencia.
          </span>
        ) : null}

        {preview ? (
          <Link
            href={{
              pathname: `/preview/${url}/abogado`,
              query: {
                id: lawyer.id,
                idSub: urlSub ? urlSub : null,
                nameSub: urlSubName ? urlSubName : null,
              },
            }}
          >
            <a className="btn btn-block btn-outlined-black lawyer__link">
              Conóceme
            </a>
          </Link>
        ) : (
          <Link
            href={{
              pathname: `${
                urlSubName !== undefined ? `/${urlSubName}` : ""
              }/abogado`,
              query: {
                id: lawyer.id,
              },
            }}
          >
            <a className="btn btn-block btn-outlined-black lawyer__link">
              Conóceme
            </a>
          </Link>
        )}
      </div>
    </LawyerWrapper>
  );
};

const Lawyers = ({
  lawyers,
  url,
  urlSub,
  urlSubName,
  preview,
  color,
  ...props
}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  if (lawyers.length === 0) return <> </>;

  return (
    <>
      <Title id="lawyers" className="d-none d-md-block">
        {lawyers.length > 1 ? (
          <>
            <h1>Conoce a los abogados</h1>
          </>
        ) : (
          <>
            <h1>Conóceme</h1>
          </>
        )}
        {/* <Separation color={color.color} mixed={color.mixed}>
          {lawyers.length > 1 ? (
            <>
              <h1>Conoce al Equipo</h1>
              <p>
                Nuestro equipo está formado por abogados con gran experiencia en
                su sector. Haz click en “Conóceme” para ver más información de
                cada abogado.
              </p>
            </>
          ) : (
            <>
              <h1>Conóceme</h1>
              <p>
                He adquirido gran experiencia a lo largo de mi trayectoria como
                abogado. Haz click en “Conóceme” para ver más información sobre
                mi.
              </p>
            </>
          )}
        </Separation> */}
      </Title>

      <section>
        <MobileLawyers className="d-md-none">
          <MobileTitle>
            {lawyers.length > 1 ? "Conoce a los abogados" : "Tu abogado"}
          </MobileTitle>

          {lawyers.length > 1 ? (
            <Glide
              shadow={true}
              options={{
                type: "slider",
                startAt: 0,
                perView: 3,
                focusAt: 0,
                rewind: false,
              }}
            >
              {lawyers.map((lawyer) => (
                <LawyerItem
                  key={Math.random() + ""}
                  lawyer={lawyer}
                  url={url}
                  preview={preview}
                  color={color.color}
                />
              ))}
            </Glide>
          ) : (
            <SingleLawyerWrapper>
              <LawyerItem
                urlSub={urlSub}
                key={Math.random() + ""}
                lawyer={lawyers[0]}
                url={url}
                preview={preview}
                color={color.color}
              />
            </SingleLawyerWrapper>
          )}
        </MobileLawyers>
        <DesktopLawyers className="container-fluid d-none d-md-block">
          {lawyers.length > 1 ? (
            <DesktopSliderWrapper>
              <Slider {...settings}>
                {lawyers.map((lawyer) => (
                  <LawyerItem
                    urlSub={urlSub}
                    urlSubName={urlSubName}
                    key={Math.random() + ""}
                    lawyer={lawyer}
                    url={url}
                    preview={preview}
                    color={color.color}
                  />
                ))}
              </Slider>
            </DesktopSliderWrapper>
          ) : (
            <SingleLawyerWrapper>
              <LawyerItem
                urlSub={urlSub}
                urlSubName={urlSubName}
                key={Math.random() + ""}
                lawyer={lawyers[0]}
                url={url}
                preview={preview}
                color={color.color}
              />
            </SingleLawyerWrapper>
          )}
        </DesktopLawyers>
      </section>
    </>
  );
};

export default Lawyers;
