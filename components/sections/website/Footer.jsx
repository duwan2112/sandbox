import styled from "styled-components";
import {WhatsAppOutlined, Phone} from "./Components/svgs";
import Link from "next/link";
const StyledFooter = styled.footer`
  padding-top: 5rem;
  background: #f8f8f8;
`;

const Hablamos = styled.div`
  background: #101010;
  display: flex;
  justify-content: center;
  color: var(--color-white);
  text-align: center;
  padding: 7rem 0;

  h1 {
    font-weight: bold;
    font-size: 44px;
    line-height: 66px;
    margin-bottom: 5rem;
  }

  a {
    border: 2px solid ${(props) => `var(--color-website-${props.color})`};
    border-radius: 0;
    color: white;

    &:hover {
      background: ${(props) => `var(--color-website-${props.color})`};
    }
  }
`;

const SubFooter = styled.div`
  padding: 5rem 0;
  display: flex;
  justify-content: space-between;
  color: black;
  background: #f8f8f8;
  @media (max-width: 768px) {
    padding-bottom: 8rem;
  }
`;

const Button = styled.a`
  background: ${(props) =>
    props.mixed ? `var(--color-website-${props.color})` : `var(--color-white)`};
  color: #101010 !important;
  border-radius: 100px !important;
`;

const StyledLink = styled.a`
  display: block;
  font-family: var(--quicksand);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.6;
  color: black;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &[href]:hover {
    text-decoration: none;
    color: inherit;
    opacity: 0.5;
  }
`;

const ContactButton = styled.a`
  border-radius: 7px;
  color: white !important;
  padding: 0, 5em 3em;
  ${(props) => (props.primary ? `background: #4CAF50` : `background: #2196F3`)};

  &:not(:last-child) {
    margin-right: 30px;
  }

  svg {
    margin-left: 1rem;
  }
`;

const ButtonGroup = styled.div``;

const LastFooter = styled.div`
  background: white;
  position: fixed;
  z-index: 1000;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  width: 100vw;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
`;

const Footer = ({
  lawyers,
  basic,
  theme,
  url,
  politics,
  preview,
  urlSub,
  urlSubName,
}) => {
  const {phone, email, direction} = basic;
  return (
    <>
      <StyledFooter>
        <Hablamos color={theme.color}>
          <div>
            <h1>¿Hablamos?</h1>
            <a target="_blank" href={`mailto:${email}`} className="btn">
              {lawyers.length === 1 ? "¡Escribeme!" : "¡Escribenos!"}
            </a>
          </div>
        </Hablamos>
        <SubFooter color={theme.color} mixed={theme.mixed}>
          <div className="container d-flex flex-column justify-content-between">
            <div>
              <ul>
                <li>
                  <StyledLink active={theme.color === "gray" ? true : false}>
                    Teléfono: <strong>{phone}</strong>
                  </StyledLink>
                </li>
                <li>
                  <StyledLink
                    active={theme.color === "gray" ? true : false}
                    href={`mailto:${email}`}
                  >
                    Email: <strong>{email}</strong>
                  </StyledLink>
                </li>
                <li>
                  <StyledLink
                    style={{paddingBottom: "1rem"}}
                    active={theme.color === "gray" ? true : false}
                  >
                    {direction.length === 1 ? "Despacho:" : "Despachos:"}
                  </StyledLink>
                </li>
                <li>
                  {direction.map((dir) => (
                    <StyledLink style={{paddingBottom: "1rem"}}>
                      <strong>
                        <span> {dir} </span>{" "}
                      </strong>
                      <StyledLink
                        color={theme.color}
                        mixed={theme.mixed}
                        href={`https://maps.google.com/?q=${dir}`}
                        target="_blank"
                        style={{
                          color: `${
                            theme.color === "gray"
                              ? "#56A6E6"
                              : `var(--color-website-${theme.color})`
                          }`,
                        }}
                      >
                        Ver en Google Maps
                      </StyledLink>
                    </StyledLink>
                  ))}
                </li>
              </ul>
            </div>
            <div className="mt-5 mt-md-0 pt-5 text-md-left">
              {/* <Button
                href={`https://maps.google.com/?q=${direction}`}
                target="_blank"
                className="btn btn-bold mb-5 d-none d-md-inline-block"
                color={theme.color}
                mixed={theme.mixed}
              >
                {lawyers.length === 1 ? "Dónde estoy" : "Dónde estamos"}
              </Button> */}
              <Link
                href={{
                  pathname: `/${
                    preview
                      ? `preview/${url}/politicy/legal`
                      : `p/${url}${
                          urlSubName && `/${urlSubName}`
                        }/politicy/legal`
                  }`,
                }}
              >
                <StyledLink href="#" color={theme.color} mixed={theme.mixed}>
                  Aviso Legal
                </StyledLink>
              </Link>
              <Link
                href={{
                  pathname: `/${
                    preview
                      ? `preview/${url}/politicy/privacy`
                      : `p/${url}${
                          urlSubName && `/${urlSubName}`
                        }/politicy/privacy`
                  }`,
                }}
              >
                <StyledLink href="#" color={theme.color} mixed={theme.mixed}>
                  Política de privacidad
                </StyledLink>
              </Link>
            </div>
          </div>
        </SubFooter>
        <LastFooter className="container-fluid d-md-none">
          <ButtonGroup>
            <ContactButton
              href={`https://api.whatsapp.com/send?phone=${basic.whatsapp}`}
              target="_blank"
              className="btn"
              primary
            >
              Chat
              <WhatsAppOutlined />
            </ContactButton>
            <ContactButton href={`tel:${basic.phone}`} className="btn">
              Llamar
              <Phone />
            </ContactButton>
          </ButtonGroup>
        </LastFooter>
      </StyledFooter>
    </>
  );
};

export default Footer;
