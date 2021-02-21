import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
import {useEffect, useState} from "react";
const Container = styled.div`
  max-width: 65rem;
  padding-top: 6rem;
  padding-bottom: 6rem;
  margin: 0 auto;

  @media ${(props) => props.theme.mediaQueries.medium} {
    padding-top: 10rem;
    padding-bottom: 10rem;
  }
  .arrow-politics {
    position: fixed;
    top: 0;
    left: 0;
    margin: 10px 0 0 20px;
  }

  .faq {
    &__title {
      font-size: 48px;
      line-height: 48px;
      margin-bottom: 0.7em;
    }

    &__subtitle {
      font-weight: 900;
      font-size: 36px;
      line-height: 54px;
    }

    &__text {
      white-space: pre-line;

      font-weight: var(--light);
      font-size: 15px;
      margin-bottom: 1em;
      strong {
        font-weight: var(--semiBold);
      }

      span {
        text-transform: capitalize;
      }
    }
  }
`;

const Legal = ({data}) => {
  const [lawyer, setLawyer] = useState(null);

  useEffect(() => {
    fetch(`${process.env.SERVER_API_URL}/users/getwebsite/${data.url}`)
      .then((response) => response.json())
      .then((result) =>
        result.data.politics ? setLawyer(result.data.politics.cookies) : null
      );
  }, []);

  return (
    <>
      <Head>
        <title>Politica de Cookies | Abogados</title>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://res.cloudinary.com/dbtpr7pcn/image/upload/v1603561180/Favicon%20Layers/favicon2_plnvll.png"
        />
      </Head>
      <Container>
        <div className="arrow-politics mt-5">
          <Link
            href={`${
              data.subarea ? `/p/[url]/${data.subarea}` : `/p/[url]/#lawyers`
            }`}
            as={`${
              data.subarea ? `/p/${data.url}/${data.subarea}` : `/p/${data.url}`
            }`}
          >
            <a>
              <svg
                width="38"
                height="40"
                viewBox="0 0 48 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 50L28.24 45.5833L11.48 28.125L48 28.125L48 21.875L11.48 21.875L28.24 4.41667L24 0L0 25L24 50Z"
                  fill="#606368"
                />
              </svg>
            </a>
          </Link>
        </div>
        <div className="text-center" style={{marginBottom: "6rem"}}>
          <h3 className="text faq__title">POLÍTICA DE PRIVACIDA</h3>
        </div>

        {lawyer ? (
          <p className="faq__text">{lawyer}</p>
        ) : (
          <p className="faq__text">
            Aún no se han definido las políticas de pivacidad
          </p>
        )}
      </Container>
    </>
  );
};

Legal.getInitialProps = async ({query, ...ctx}) => {
  /*   if (!query.fullName) {
    ctx.res.redirect("/");
  } */
  return {
    data: {...query},
  };
};

export default Legal;
