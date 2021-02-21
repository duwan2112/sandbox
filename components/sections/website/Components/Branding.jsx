import styled from "styled-components";
import logos from "../../../Logo";

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 80px;
  margin: ${(props) => (props.center ? "0 auto" : "none")};
  overflow: hidden;

  color: ${(props) => (props.color ? `var(--color-${props.color})` : "white")};
`;

const Container = styled.div`
  .slogan {
    position: absolute;
    padding-top: 1rem;
    font-size: 15px;
    text-align: center;
    width: 220px;
    color: ${(props) =>
      props.color ? `var(--color-${props.color})` : "white"};
  }
`;

const Branding = ({eslogan, logo, type, center, textColor}) => {
  const Logo = logo.image.length <= 1 ? logos[Number(logo.image)] : null;

  return (
    <Container>
      <LogoContainer center={center} color={textColor}>
        {logo.image.length >= 1 && Logo ? (
          <Logo type={type} name={logo.name} initials={logo.initials} />
        ) : (
          <img src={logo.image} />
        )}
      </LogoContainer>
      <p style={{color: textColor}} className="slogan">
        {eslogan}
      </p>
    </Container>
  );
};

export default Branding;
