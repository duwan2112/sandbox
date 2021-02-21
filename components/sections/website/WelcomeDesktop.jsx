import styled from "styled-components";
import {WhatsApp, Phone} from "./Components/svgs";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const HeroContainer = styled.div`
  height: 450px;
  display: flex;
  align-items: center;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeroTitle = styled.h1`
  color: ${(props) =>
    props.background === "page-background-0.png"
      ? "var(--color-black);"
      : "var(--color-white);"};
  font-family: var(--poppins);
  font-style: normal;
  font-weight: 300;
  font-size: ${(props) => (props.option ? "48px" : "28px")};
  line-height: ${(props) => (props.option ? "48px" : "28px")};
  font-weight: bold;
  text-align: ${(props) => (props.option ? "left" : "center")};
  margin-bottom: 3rem;

  strong {
    display: block;
    font-size: 60px;
    line-height: 1;
  }
`;

const Button = styled.a`
  background: ${(props) => (props.primary ? "#7EDF81" : " #56A6E6")};
  opacity: 1 !important;
  color: white;
  border-radius: 7px;
  font-family: var(--quicksand);
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 44px;
  color: white;
  display: flex;
  align-items: center;

  &:hover {
    color: white;
  }

  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.option ? "left" : "none")};
  padding-left: ${(props) => (props.option ? "10px" : "0")};
`;

const WelcomeDesktop = ({basic, background, message}) => {
  return (
    <div className="">
      <Container>
        <HeroContainer className="container">
          <Hero>
            <HeroTitle
              option={message.selected === "optionOne" && true}
              background={background}
            >
              {message.selected === "optionOne" ? (
                <> {message.optionOne}</>
              ) : (
                <>
                  {" "}
                  ¿Buscas <strong> Abogado?</strong>{" "}
                </>
              )}
            </HeroTitle>
            <ButtonContainer option={message.selected === "optionOne" && true}>
              <Button
                href={`https://api.whatsapp.com/send?phone=${basic.whatsapp}`}
                target="_blank"
                className="btn btn-bold"
                primary
              >
                {basic.whatsapp}
                <WhatsApp className="ml-3" />
              </Button>
              <Button href={`tel:${basic.phone}`} className="btn btn-bold">
                {basic.phone}
                <Phone className="ml-3" />
              </Button>
            </ButtonContainer>
          </Hero>
        </HeroContainer>
      </Container>
    </div>
  );
};

export default WelcomeDesktop;
