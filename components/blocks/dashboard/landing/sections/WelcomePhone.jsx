import React from "react";
import styled from "styled-components";
import ClientMini from "../../../../../public/static/client-mini.png";
import LawyerIcon from "../../../../../public/static/lawyer-icon.png";
import {OutlinedPhone} from "../../../../sections/website/Components/svgs";

const Wrapper = styled.div`
  max-width: 98%;
  margin: 0 auto;
  background: linear-gradient(214.1deg, #007bff 0%, #00c2ff 100%);
  border-radius: 28px;
  width: 100%;
  color: var(--color-white);
  padding: 2rem 0.5rem;

  .welcome {
    &__title {
      font-family: var(--poppins);
      font-weight: 900;
      font-size: 24px;
      line-height: 30px;
    }

    &__text {
      font-family: var(--poppins);
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      line-height: 19px;
    }
  }
`;

const ProfilePicture = styled.figure`
  height: 30px;
  width: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .icon {
    display: flex;
    width: 100%;
    height: 100%;
    background: var(--color-white);

    img {
      margin: auto;
      width: 20px;
      height: 20px;
      object-fit: cover;
    }
  }
`;

const ChatWrapper = styled.div`
  max-width: 36rem;
  margin: 0 auto;
`;

const RightChat = styled.div`
  background: transparent;
  border: 1px solid var(--color-white);
  padding: 0.8rem 2.3rem 1.3rem 2.3rem;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  position: relative;
  width: 24.5rem;
  margin-right: 2rem;
  margin-top: 1rem;

  span {
    color: white;
    position: relative;
    z-index: 2;
    font-family: var(--poppins);
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 18px;
    display: flex;
  }

  &::before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 6px solid white;
    border-right: 6px solid transparent;
    border-top: 6px solid white;
    border-bottom: 6px solid transparent;
    right: -12px;
    top: -1px;
  }

  &::after {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 4px solid #009dff;
    border-right: 8px solid transparent;
    border-top: 8px solid #009dff;
    border-bottom: 4px solid transparent;
    right: -10px;
    top: 0px;
  }

  @media ${(props) => props.theme.mediaQueries.smallest} {
    margin-left: 6rem;
  }
`;

const LeftChat = styled.div`
  background: var(--color-white);
  color: var(--color-black);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 0.8rem 2.3rem 1.3rem 2.3rem;
  border-radius: 12px;
  position: relative;
  width: 24.5rem;
  /* height: 5rem; */
  margin-left: 2rem;
  margin-top: 1rem;

  &::before {
    content: "";
    top: 0;
    left: 0;
    transform: translateX(-20%);
    position: absolute;
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-top: 30px solid white;
  }

  span {
    position: relative;
    z-index: 2;
    font-family: var(--poppins);
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 18px;
    display: flex;
  }
`;

const Separator = styled.div`
  display: block;
  height: 2px;
  width: 6.4rem;
  background: ${(props) =>
    props.color === "gray" ? "black" : `var(--color-website-${props.color})`};
`;

const Slogan = styled.h1`
  font-weight: bold;
  font-size: 32px;
  line-height: 47px;
  margin-top: 3rem;
`;
const SubSlogan = styled.h4`
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  margin-top: 2rem;
  margin-bottom: 4rem;
  letter-spacing: -0.02em;
`;

const TalkButton = styled.a`
  color: black;
  display: inline-block;
  font-weight: 600;
  font-size: 13px;
  border: 2px solid
    ${(props) =>
      `${
        props.color === "gray" ? "black" : `var(--color-website-${props.color})`
      }`};
  padding: 1.4em 3em;

  svg {
    margin-left: 1rem;
  }
`;
export default function WelcomePhone({basic, principal, theme}) {
  return (
    <div>
      {" "}
      <>
        <div className="container">
          <Separator color={theme.color} />
          <Slogan>{principal.title}</Slogan>
          <SubSlogan> {principal.description} </SubSlogan>
          <TalkButton href={`tel:${basic.phone}`} color={theme.color}>
            ¿Hablamos? <OutlinedPhone />
          </TalkButton>
        </div>
      </>
    </div>
  );
}