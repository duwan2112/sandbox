import Layout from "../components/layout";
import styled from "styled-components";
import Head from "next/head";
import { server } from "../utils";

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

const Legal = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Hifive | Aviso legal</title>
      </Head>
      <Container className="container">
        <div className="text-center" style={{ marginBottom: "6rem" }}>
          <h3 className="text faq__title">AVISO LEGAL</h3>
        </div>

        {data && data.documents ? (
          <p className="faq__text">{data.documents.legal}</p>
        ) : (
          <p className="faq__text">
            Aun no se han definidio las politicas del aviso legal
          </p>
        )}

        {/* <p className="faq__text">
          <span>INFORMACIÓN LEGAL Y ACEPTACIÓN</span>
          <br />
          Las presentes disposiciones regulan el uso del servicio del portal de
          Internet (en adelante, el 'Portal') que HiFive pone a disposición de
          los usuarios de Internet.
        </p>
        <p className="faq__text">
          HiFive con domicilio social en Madrid está inscrita en el Registro
          Mercantil de Madrid. Email: ________.
        </p>
        <p className="faq__text">
          1. Los servicios jurídicos o fiscales que presta el Despacho con
          carácter general tienen el precio que se indique en la correspondiente
          propuesta de servicios profesionales.
        </p>
        <p className="faq__text">
          La utilización del Portal atribuye la condición de usuario del Portal
          (en adelante, el 'Usuario') e implica la aceptación de todas las
          condiciones incluidas en este Aviso Legal.
        </p>
        <p className="faq__text">
          <span>2. PROPIEDAD INTELECTUAL E INDUSTRIAL</span>
          <br />
          Todos los contenidos del Portal, entendiendo por estos a título
          meramente enunciativo, los textos, fotografías, gráficos, imágenes,
          iconos, tecnología, software, links y demás contenidos audiovisuales o
          sonoros, así como su diseño gráfico y códigos fuente (en adelante, los
          'Contenidos'), son propiedad intelectual de HiFive o de terceros, sin
          que puedan entenderse cedidos al Usuario ninguno de los derechos de
          explotación reconocidos por la normativa vigente en materia de
          propiedad intelectual sobre los mismos, salvo aquellos que resulten
          estrictamente necesarios para el uso del Portal.
        </p>
        <p className="faq__text">
          Las marcas, nombres comerciales o signos distintivos son titularidad
          de HiFive o terceros, sin que pueda entenderse que el acceso al Portal
          atribuya ningún derecho sobre las citadas marcas, nombres comerciales
          y/o signos distintivos.
        </p>
        <p className="faq__text">
          <span>3. CONDICIONES DE USO DEL PORTAL</span>
          <span>3.1 GENERAL</span>
          <br />
          El Usuario se obliga a hacer un uso correcto del Portal de conformidad
          con la Ley y el presente Aviso Legal. El Usuario responderá frente a
          ________ o frente a terceros de cualesquiera daños y perjuicios que
          pudieran causarse como consecuencia del incumplimiento de dicha
          obligación.
        </p>
        <p className="faq__text">
          Queda expresamente prohibido el uso del Portal con fines lesivos de
          bienes o intereses de ________ o de terceros o que de cualquier otra
          forma sobrecarguen, dañen o inutilicen las redes, servidores y demás
          equipos informáticos (hardware) o productos y aplicaciones
          informáticas (software) de HiFive o de terceros.
        </p>
        <p className="faq__text">
          <span>3.2 CONTENIDOSL</span>
          <br />
          El Usuario se compromete a utilizar los Contenidos de conformidad con
          la Ley y el presente Aviso Legal, así como con las demás condiciones,
          reglamentos e instrucciones que en su caso pudieran ser de aplicación
          de conformidad con lo dispuesto en la cláusula 1.
        </p>
        <p className="faq__text">
          <span>3.3 FORMULARIOS DE RECOGIDA DE DATOS</span>
          <br />
          Toda la información que facilite el Usuario a través de los
          formularios del Portal a los efectos anteriores o cualesquiera otros
          deberá ser veraz. En todo caso será el Usuario el único responsable de
          las manifestaciones falsas o inexactas que realice y de los perjuicios
          que cause a ________ o a terceros por la información que facilite.
        </p>
        <p className="faq__text">
          <span>4. EXCLUSIÓN DE RESPONSABILIDAD DE LA INFORMACIÓN</span>
          <br />
          El acceso al Portal no implica la obligación por parte de ________ de
          comprobar la veracidad, exactitud, adecuación, idoneidad,
          exhaustividad y actualidad de la información suministrada a través del
          mismo. Los contenidos de esta página son de carácter general y no
          constituyen, en modo alguno, la prestación de un servicio de
          asesoramiento legal o fiscal de ningún tipo, por lo que dicha
          información resulta insuficiente para la toma de decisiones personales
          o empresariales por parte del Usuario.
        </p>
        <p className="faq__text">
          ________ no se responsabiliza de las decisiones tomadas a partir de la
          información suministrada en el Portal ni de los daños y perjuicios
          producidos en el Usuario o terceros con motivo de actuaciones que
          tengan como único fundamento la información obtenida en el Portal.
        </p>
        <p className="faq__text">
          <span>5. PROTECCIÓN DE DATOS PERSONALES</span>
          <br />
          Para más información sobre el tratamiento de sus datos personales en
          el Portal diríjase a la Política de Privacidad.
        </p>
        <p className="faq__text">
          <span>6. LEGISLACIÓN</span>
          <br />
          El presente Aviso Legal se rige en todos y cada uno de sus extremos
          por la ley española.
        </p> */}
      </Container>
    </Layout>
  );
};

Legal.getInitialProps = async (ctx) => {
  const { ok, data } = await server.getAsync("/data/cms");
  if (!ok) ctx.res.redirect("/dashboard");

  return { data };
};

export default Legal;
