import styled from "styled-components";

const StyledTestimonials = styled.section`
  padding-top: 10rem;
  padding-bottom: 10rem;

  .testimonial {
    &__block {
      padding: 0 3em;

      &:not(:last-child) {
        margin-bottom: 10rem;
      }
    }

    &__name,
    &__firm {
      font-weight: 300;
      font-size: 3.6rem;
      line-height: 4.5rem;
    }

    &__firm {
      font-weight: var(--black);
      color: #4d4d4d;
    }

    &__quote {
      line-height: 2.1rem;
      margin: 0.5rem 0;
      font-weight: var(--light);
    }

    &__link {
      font-weight: var(--light);
      font-size: 1.2rem;
      color: var(--color-primary);
      margin: 0;

      &:hover {
        cursor: pointer;
        color: var(--color-primary);
        text-decoration: underline;
      }
    }

    &__lawyer {
      display: block;
      width: 80%;
      margin: 0 auto;
      margin-bottom: 1rem;
    }

    &__footer {
      font-weight: 300;
      font-size: 2.4rem;
      line-height: 3rem;
      span {
        font-weight: var(--black);
        color: #4d4d4d;
      }
    }
  }

  @media ${props => props.theme.mediaQueries.smallest} {
    .testimonial {
      &__title {
        margin-bottom: 4em;
      }

      &__link {
        font-size: 1.4rem;
      }

      &__footer {
        font-size: 3rem;
        line-height: 3.5rem;
      }

      &__quote {
        line-height: 2.5rem;
      }

      &__link {
        font-size: 1.6rem;
      }
    }
  }

  @media ${props => props.theme.mediaQueries.large} {
    max-width: 80rem;

    .testimonial {
      &__lawyer {
        max-width: 25rem;
      }
    }
  }
`;

const Testimonials = () => {
  return (
    <StyledTestimonials className="container">
      <h1 className="title text-center testimonial__title">
        {" "}
        Ellos ya nos usan
      </h1>
      <div className="row testimonial__block">
        <div className="col-12 col-md-6 order-1 order-md-0 testimonial__content">
          <article className="testimonial__wrapper">
            <h2 className="testimonial__name">James</h2>
            <h1 className="testimonial__firm">Hamilton</h1>
            <p className="testimonial__quote text">
              “Hifive nos permite tener un equipo dedicado de Marketing Digital
              como los grandes bufetes de abogados por una pequeña cuota mensual
              lo que es genial. Fue una suerte encontrarlos”
            </p>
            <a className="testimonial__link text">
              www.hfabogados.com/jameshamilton
            </a>
          </article>
        </div>
        <div className="col-12 col-md-6 order-0 order-md-1 testimonial__picture">
          <figure className="testimonial__figure">
            <img
              className="testimonial__lawyer"
              src={require("../../public/static/lawyer.png")}
              alt="good looking lawyer"
            />
          </figure>
        </div>
      </div>
      <div className="row testimonial__block">
        <div className="col-12 col-md-6 testimonial__picture">
          <figure className="testimonial__figure">
            <img
              className="testimonial__lawyer"
              src={require("../../public/static/lawyer.png")}
              alt="good looking lawyer"
            />
          </figure>
        </div>
        <div className="col-12 col-md-6 testimonial__content">
          <article className="testimonial__wrapper">
            <h2 className="testimonial__name">James</h2>
            <h1 className="testimonial__firm">Hamilton</h1>
            <p className="testimonial__quote text">
              “Hifive nos permite tener un equipo dedicado de Marketing Digital
              como los grandes bufetes de abogados por una pequeña cuota mensual
              lo que es genial. Fue una suerte encontrarlos”
            </p>
            <a className="testimonial__link text">
              www.hfabogados.com/jameshamilton
            </a>
          </article>
        </div>
      </div>
      <div className="row testimonial__block">
        <div className="col-12 col-md-6 order-1 order-md-0 testimonial__content">
          <article className="testimonial__wrapper">
            <h2 className="testimonial__name">James</h2>
            <h1 className="testimonial__firm">Hamilton</h1>
            <p className="testimonial__quote text">
              “Hifive nos permite tener un equipo dedicado de Marketing Digital
              como los grandes bufetes de abogados por una pequeña cuota mensual
              lo que es genial. Fue una suerte encontrarlos”
            </p>
            <a className="testimonial__link text">
              www.hfabogados.com/jameshamilton
            </a>
          </article>
        </div>
        <div className="col-12 col-md-6 order-0 order-md-1 testimonial__picture">
          <figure className="testimonial__figure">
            <img
              className="testimonial__lawyer"
              src={require("../../public/static/lawyer.png")}
              alt="good looking lawyer"
            />
          </figure>
        </div>
      </div>
      <h1 className="testimonial__footer text-center">
        ¿A qué esperas? <br></br> <span>Empieza a captar clientes ya</span>
      </h1>
    </StyledTestimonials>
  );
};

export default Testimonials;
