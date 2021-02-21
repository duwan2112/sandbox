import styled from "styled-components";
import Link from "next/link";
import {useEffect, useState} from "react";
import {server} from "../../utils";

const StyledFooter = styled.footer`
  padding-bottom: 5rem;

  .text {
    font-weight: var(--light);
  }

  .footer {
    &__btn {
      margin-bottom: 8rem;
    }

    @media ${(props) => props.theme.mediaQueries.medium} {
      &__btn {
        display: none;
      }
    }
  }
`;

const Footer = ({english}) => {
  const [contact, setContact] = useState({});

  useEffect(() => {
    const fetchContactInfo = async () => {
      const {ok, data} = await server.getAsync("/data/cms");
      if (ok) setContact({...data.contact});
    };

    fetchContactInfo();
  }, []);

  return (
    <StyledFooter className="container">
      {/*  {!english ? (
        <a href="#" className="btn btn-gradient-primary btn-block footer__btn">
          Crear mi web
        </a>
      ) : null} */}

      <Link href="/privacy">
        <a className="text">Política de Privacidad</a>
      </Link>
      <br></br>
      <Link href="/legal">
        <a className="text">Aviso legal</a>
      </Link>
      <br></br>
      <Link href="/cookies">
        <a className="text">Política de Cookies</a>
      </Link>
      <br></br>
      <br></br>
      <p className="text">
        Contáctanos:
        <a href={`mailto:${contact.email}`}> {contact.email}</a>
      </p>
    </StyledFooter>
  );
};

export default Footer;
