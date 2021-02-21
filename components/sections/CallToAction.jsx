import styled from "styled-components";
import Link from "next/link";
const StyledCallToAction = styled.section`
  background: var(--color-primary);
  color: white;
  height: 20.9rem;
  margin-bottom: 10rem;

  h1 {
    font-weight: 900;
    font-size: 3rem;
    line-height: 4rem;
    margin-bottom: 0.6em;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    height: 33.6rem;

    h1 {
      font-size: 4.8rem;
    }

    a {
      width: 80%;
      margin: 0 auto;
    }
  }
`;

const CallToAction = () => {
  return (
    <StyledCallToAction className="container-fluid d-flex justify-content-center align-items-center">
      <div className="content-box text-center">
        <h1>¿A qué esperas?</h1>

        <Link href="/register">
          <a href="" className="btn btn-light btn-block ">
            Crear mi web
          </a>
        </Link>
      </div>
    </StyledCallToAction>
  );
};

export default CallToAction;
