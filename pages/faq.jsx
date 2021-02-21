import Layout from "../components/layout";
import styled from "styled-components";
import Head from "next/head";
import {useState, useEffect} from "react";
import {server} from "../utils";

const ButtonsContainer = styled.div`
  max-width: 40rem;
  margin: 0 auto;
`;

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
    }
  }
`;

const Faq = ({data}) => {
  const [selectedForm, setSelectedForm] = useState("");
  const [questions, setQuestions] = useState([]);

  const selectQuestions = (str) => {
    if (data.faq) {
      setSelectedForm(str);
      setQuestions(data.faq[str]);
    }
  };

  useEffect(() => {
    if (data.faq) {
      setSelectedForm("website");
      setQuestions(data.faq.website);
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Hifive | FAQ</title>
      </Head>
      <Container className="container">
        <div className="text-center" style={{marginBottom: "6rem"}}>
          <h3 className="text faq__title">FAQ</h3>
          <p className="faq__text">Contáctanos: {data.contact.email}</p>
        </div>
        {/*    <p className="faq__text">
          Por menos de lo que cuesta <br></br>un café al día <br></br>o un
          becario<br></br>o posiblemente el mantenimiento anual de tu antigua
          página web
        </p>
        <p className="faq__text">
          Contrata un equipo de marketing dedicado a mejorar tu página web y tus
          campañas publicitarias en Google ¡Está todo incluido!
        </p>
        <p className="faq__text">Todos los planes incluyen:</p>
        <p className="faq__text">
          <strong>1.</strong> Equipo de diseño y programación dedicado a mejorar
          tu <strong>página web</strong> ¡continuamente!
        </p>
        <p className="faq__text">
          <strong>2.</strong> Equipo de marketing digital dedicado a la tu
          <strong> creación de tus campañas publicitarias en Google</strong>
        </p>
        <p className="faq__text">
          <strong>3.</strong> Y por supuesto... la creación y el mantenimiento
          de tu página web, dominio, hosting, certificado de seguridad SSL ...
          <br></br> Y todas las mejoras y funcionalidades que vayamos añadiendo
          a tu página web sin coste adicional
        </p>
        <p className="faq__text">
          Únicamente tendrás que pagar adicionalmente por la publicidad que
          realices en Google.
        </p> */}
        <h2 className="faq__subtitle mt-5 mb-5">Preguntas frecuentes</h2>
        <ButtonsContainer className="mb-5">
          <div className="mb-5">
            <button
              className={`btn btn-block ${
                selectedForm === "website"
                  ? "btn-primary"
                  : "btn-outlined-primary"
              }`}
              onClick={() => selectQuestions("website")}
            >
              Tu Website
            </button>
          </div>
          <div className="mb-5">
            <button
              className={`btn btn-block ${
                selectedForm === "marketing"
                  ? "btn-primary"
                  : "btn-outlined-primary"
              }`}
              onClick={() => selectQuestions("marketing")}
            >
              Campaña de Marketing
            </button>
          </div>
          <div>
            <button
              className={`btn btn-block ${
                selectedForm === "sessions"
                  ? "btn-primary"
                  : "btn-outlined-primary"
              }`}
              onClick={() => selectQuestions("sessions")}
            >
              Sesiones de Fotos y Videos
            </button>
          </div>
        </ButtonsContainer>
        {questions.map(({pregunta, respuesta}) => (
          <p className="faq__text  mb-5">
            <strong>{pregunta}</strong> <br></br>
            {respuesta}
          </p>
        ))}

        {/* <p className="faq__text  mb-5">
          <strong>¿Puedo darme de baja cuando quiera?</strong> <br></br>
          Si, puedes darte de baja cuando quieras y solo se cobrará el mes en
          curso. Haz click en “Darme de baja” en el “Menú principal; Cambiar
          plan”, para darte de baja
        </p>
        <p className="faq__text  mb-5">
          <strong>¿La suscripción mensual lo cubre todo?</strong> <br></br> Si,
          lo cubre TODO, únicamente tendrás que pagar a parte la publicidad que
          hagas en Google
        </p>
        <p className="faq__text  mb-5">
          <strong>
            ¿Puedo modificar la cantidad que invierto en anunciarme en Google?
          </strong>
          <br />
          Si, puedes cambiar esta cantidad cuando lo desees y las veces que
          quieras y nosotros aplicaremos los cambios a tu campaña sin ningún
          coste
        </p>
        <p className="faq__text mb-5">
          <strong>¿Qué coste tiene captar un cliente?</strong>
          <br />
          El coste de adquirir un cliente varía dependiendo de varios factores.
        </p>
        <p className="faq__text">
          En primer lugar Google subasta los anuncios que aparecen en Google
          entre los anunciantes interesados en pujar por esas busquedas, por lo
          que a más anunciantes pujando mayor será el coste.
        </p>
        <p className="faq__text">
          El coste puede depender de las búsquedas que quieras promocionar o de
          la zona geográfica en la que quieras anunciarte.
        </p>
        <p className="faq__text">
          Te aconsejamos empezar invirtiendo una cantidad moderada para que
          puedas comprobar que coste tiene captar cada cliente e ir aumentándola
          progresivamente.
        </p>
        <p className="faq__text mb-5">
          Nosotros de forma constante probamos distintos diseños de la web y de
          los anuncios promocionados en Google para ver que funciona mejor y
          bajar el coste de adquirir a cada uno de tus clientes.
        </p>
        <p className="faq__text">
          <strong>
            ¿Puedo invertir lo que quiera en publicidad en Google?
          </strong>
          <br />
          Si, puedes invertir desde un mínimo de 10€ a la cantidad que
          prefieras. Únicamente nos deberás indicar en el apartado “Mi Campaña
          de publicidad en Google” cuanto quieres invertir mensualmente
        </p>
        <p className="faq__text">
          <strong>¿Cómo funcionan el marketing digital?</strong>
          <br />
          <strong>1.</strong>Nos indicas mediante un formulario las áreas
          (divorcio, herencias, etc) en las que buscas clientes y la zona
          geográfica en la que ofreces tus servicios de abogado así como la
          inversión que deseas realizar mensualmente
        </p>
        <p className="faq__text">
          <strong>2.</strong>Te guiamos en la creación de tu cuenta en Google
          Ads y creamos y gestionamos tu campaña publicitaria en Google
        </p>
        <p className="faq__text">
          <strong>3.</strong>Periodicamente te enviamos un informe de resultados
          de la campaña con las principales métricas: número de impresiones,
          clicks y coste por click
        </p>
        <p className="faq__text">
          <strong> 4.</strong> Periodicamente mejoramos tus campañas
          publicitarias en Google mediante el análisis del rendimiento de las
          campañas y el testeo de diferentes versiones de los anuncios
        </p>
        <p className="faq__text mt-5">
          <strong>¿Si no soy abogado no puedo suscribirme?</strong>
          <br />
          No, lo sentimos. Solo trabajamos con abogados lo que nos permite
          especializarnos y ofrecer un servicio similar al que tendría un bufete
          de abogados con un equipo de marketing digital dedicado
        </p>
        <p className="faq__text mt-5">
          <strong>¿Ofreceis vuestros servicios en mi ciudad?</strong>
          <br />
          Si, ofrecemos nuestros servicios en todo el territorio español.
        </p>
        <p className="faq__text mt-5">
          <strong>¿Puedo sugerir cambios en la web?</strong>
          <br />
          Si, puedes sugerir cambios en la web así como nuevas funcionalidades
          que te gustaría que añadieramos.
        </p>
        <p className="faq__text">
          Nosotros estamos mejorando continuamente la web por lo que tomamos en
          consideración todas las sugerencias de nuestros suscriptores.
        </p>
        <p className="faq__text  ">
          Las mejoras que realizamos en la web no suponen ningún coste adicional
          para tí :)
        </p>
        <p className="faq__text mt-5">
          <strong>¿Puedo reportar algún fallo de la web?</strong>
          <br />
          Si, por favor avisanos si ves algún fallo en la web para que podamos
          corregirlo de forma inmediata.
        </p>
        <p className="faq__text ">
          Esto por supuesto no supondrá ningún coste para tí
        </p>
        <p className="faq__text mt-5">
          <strong>¿Cómo funcionan los videos y fotos profesionales?</strong>
          <br />
          Puedes reservar fotos y videos profesionales si vives en Madrid. Nos
          desplazaremos a tus oficinas o despacho y realizaremos las tomas.
        </p>
        <p className="faq__text">
          Reserva la sesión y nos pasaremos a verte lo antes posible
        </p> */}
      </Container>
    </Layout>
  );
};

Faq.getInitialProps = async (ctx) => {
  const {ok, data} = await server.getAsync("/data/cms");
  if (!ok) {
    ctx.res.redirect("/dashboard");
    console.log(ok);
    console.log(data);
  }
  return {
    data,
  };
};

export default Faq;
