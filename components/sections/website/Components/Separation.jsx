import styled from "styled-components";

const Banner = styled.section`
  background: #f8f8f8;

  color: black;

  padding: 8rem 0;
  padding-bottom: 3rem;
  @media (max-width: 770px) {
    background: #f8f8f8;
  }
  h1 {
    font-size: 40px;
    line-height: 1.2;
    color: black;
    text-align: center;
    margin-bottom: 3rem;
  }
  p {
    text-align: center;
    font-size: 18px;
    line-height: 1.2;
    font-weight: var(--regular);
  }
`;

const Container = styled.div`
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "50rem")};
  margin: 0 auto;
`;

const Separation = ({color, color2, mixed, maxWidth, children, ...props}) => {
  return (
    <Banner color={color} color2={color2} mixed={mixed}>
      <Container maxWidth={maxWidth}>{children}</Container>
    </Banner>
  );
};

export default Separation;
