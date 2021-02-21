import styled from "styled-components";
import Separation from "./Components/Separation";
import {MobileTitle} from "./Components/Typography";

const Container = styled.div`
  background: #f8f8f8;
  @media ${(props) => props.theme.mediaQueries.medium} {
    padding-top: 10rem;
    padding-bottom: 10rem;
  }
`;

const StepCard = styled.div`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  max-width: 40rem;
  margin: 0 auto;
  margin-bottom: 35px;
  padding: 3rem 3rem 3rem 3rem;
  background: white;
  border-radius: 3px;
  @media ${(props) => props.theme.mediaQueries.medium} {
    max-width: none;
    box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2);

    margin-bottom: none;
    padding: none;
  }

  .step-card {
    &__number {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      font-size: var(--bold);
      font-weight: bold;
      font-size: 1.5rem;
      border: 1px solid var(--color-black);
      border-radius: 50%;
    }

    &__title {
      margin: 3rem 0;
      display: inline-block;
      font-weight: bold;
      font-size: 18px;
      line-height: 27px;
      position: relative;
      padding-bottom: 0.6rem;
      &::before {
        content: "";
        position: absolute;
        width: 45%;
        height: 2px;
        background: var(--color-black);
        bottom: 0;
        left: 0;
      }
    }

    &__text {
      font-size: 13px;
      white-space: pre-line;
    }
  }
`;

const Title = styled.div`
  background: #f8f8f8;
  text-align: center;
  margin-bottom: 0;
  padding-top: 5rem;
  h1 {
    font-size: 40px;
    line-height: 52.5px;
    font-weight: 500;
  }
`;

const HowItWorks = ({lawyers, howItWorks, theme}) => {
  const {stepOne, stepTwo, stepThree} = howItWorks;

  return (
    <>
      <Title className="d-none d-md-block">
        <h1>Como funciona</h1>
        {/*    <Separation color={theme.color} mixed={theme.mixed}>
          <h1>Cómo funciona</h1>
          <p>
            {lawyers.length === 1
              ? " Para que sepas exactamente que esperar de nosotros y cómo funcionamos a continuación puedes encontrar un resumen de cómo trabajamos con nuevos clientes."
              : "Para que sepas exactamente que esperar de nosotros y cómo funcionamos a continuación puedes encontrar un resumen de cómo trabajamos con nuevos clientes."}
          </p>
        </Separation> */}
      </Title>

      <Container className="container-fluid">
        <div className="d-md-none">
          <MobileTitle>Cómo funciona</MobileTitle>
        </div>
        <div className="row d-flex justify-content-between">
          <div className="col-12  col-md-4">
            <StepCard>
              <span className="step-card__number">1</span>
              <h3 className="step-card__title">Paso uno</h3>
              <p className="step-card__text">{stepOne}</p>
            </StepCard>
          </div>
          <div className="col-12 col-md-4">
            <StepCard>
              <span className="step-card__number">2</span>
              <h3 className="step-card__title">Paso dos</h3>
              <p className="step-card__text">{stepTwo}</p>
            </StepCard>
          </div>
          <div className="col-12 col-md-4">
            <StepCard>
              <span className="step-card__number">3</span>
              <h3 className="step-card__title">Paso tres</h3>
              <p className="step-card__text">{stepThree}</p>
            </StepCard>
          </div>
        </div>
      </Container>
    </>
  );
};

export default HowItWorks;
