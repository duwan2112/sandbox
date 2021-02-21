import styled from "styled-components";
import Branding from "../../../../sections/website/Components/Branding";
import {Link} from "react-scroll";
const Container = styled.div`
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  display: flex;
  align-items: center;
`;

const Navigation = styled.ul`
  display: flex;
  margin-left: auto;

  .nav {
    &__item {
      &:not(:last-child) {
        margin-right: 14px;
      }
    }

    &__link {
      font-family: var(--poppins);
      color: ${(props) =>
        props.background === "page-background-0.png"
          ? "var(--color-black);"
          : "var(--color-white);"};
      font-style: normal;
      font-weight: 300;
      font-size: 15px;
      line-height: 30px;
      transition: all 0.3s ease-in;
      cursor: pointer;
      &:hover {
        color: ${(props) => `var(--color-website-${props.color})`};
      }
    }
  }
`;

const Heading = ({
  websiteInfo,
  eslogan,
  logo,
  type,
  theme,
  background,
  website,
}) => {
  let areasExist = false;
  const allAreas = websiteInfo.areas.filter(
    (element) => element.id === website.subareaId
  );
  const allAreasTwo = websiteInfo.areas.filter(
    (element) => element.area === allAreas[0].area
  );

  if (allAreasTwo) {
    areasExist = true;
  }
  return (
    <Container className="container d-none d-md-flex">
      <Branding
        logo={logo}
        eslogan={eslogan}
        type={type}
        textColor={background === "page-background-0.png" ? "black" : "white"}
      />
      <Navigation color={theme.color} background={background}>
        {website.lawyers.length !== 0 && (
          <li className="nav__item">
            <Link
              to="lawyers"
              duration={300}
              smooth={true}
              role="button"
              className="nav__link"
            >
              Abogados
            </Link>
          </li>
        )}

        {website.testimonials.length !== 0 && (
          <li className="nav__item">
            <Link
              to="clients"
              duration={400}
              smooth={true}
              role="button"
              className="nav__link"
            >
              Clientes
            </Link>
          </li>
        )}

        {website.solvedCases.length !== 0 && (
          <li className="nav__item">
            <Link
              to="solvedCases"
              duration={600}
              smooth={true}
              role="button"
              className="nav__link"
            >
              Casos resueltos
            </Link>
          </li>
        )}

        {website.blogs.length !== 0 && (
          <li className="nav__item">
            <Link
              to="blogs"
              duration={800}
              smooth={true}
              role="button"
              className="nav__link"
            >
              Blog
            </Link>
          </li>
        )}
        {areasExist && (
          <li className="nav__item">
            <Link
              to="areas"
              duration={1000}
              smooth={true}
              role="button"
              className="nav__link"
            >
              Áreas
            </Link>
          </li>
        )}
      </Navigation>
    </Container>
  );
};

export default Heading;
