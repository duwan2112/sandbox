import Layout from "../components/layout";
import styled from "styled-components";
import Head from "next/head";
import {server} from "../utils";

const Container = styled.div`
  max-width: 80rem;
  padding-top: 6rem;
  padding-bottom: 6rem;

  @media ${(props) => props.theme.mediaQueries.medium} {
    padding-top: 10rem;
    padding-bottom: 10rem;
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
  return (
    <Layout>
      <Head>
        <title>Hifive | Política de Privacidad</title>
      </Head>
      <Container className="container">
        <div className="text-center" style={{marginBottom: "6rem"}}>
          <h3 className="text faq__title">POLÍTICA DE PRIVACIDAD</h3>
        </div>
        {data && data.documents ? (
          <p className="faq__text">{data.documents.privacy}</p>
        ) : (
          <p className="faq__text">
            Aun no se han definido las politicas de privacidad
          </p>
        )}
      </Container>
    </Layout>
  );
};

Legal.getInitialProps = async (ctx) => {
  const {ok, data} = await server.getAsync("/data/cms");
  if (!ok) ctx.res.redirect("/dashboard");

  return {data};
};

export default Legal;
