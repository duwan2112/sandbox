import styled from "styled-components";
import Separation from "./Components/Separation";
import {Quotes} from "./Components/svgs";
import {MobileTitle} from "./Components/Typography";
import Slider from "react-slick";
import Glide from "../../Glide";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

const Client = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: white;
  padding: 5rem;
  min-height: 250px;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2);
  position: relative;
  .client {
    &__client {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__name {
      margin-top: 3rem;
      text-align: left;
      font-size: 15px;
      font-weight: 300 !important;
      color: ${(props) =>
        props.mixed
          ? `${
              props.color === "gray"
                ? `var(--color-black)`
                : `var(--color-website-${props.color})`
            }`
          : `var(--color-black)`};
    }

    &__location {
      text-align: left;
      font-size: 15px;
      font-weight: 500 !important;
    }

    &__quotes {
      position: absolute;
      top: 1.3rem;
      left: 1.3rem;
    }

    &__text {
      position: relative;
      width: 100%;
      font-size: 15px;
      text-align: left;
      white-space: pre-line;
    }
  }
`;

const ClientsWrapper = styled.div`
  padding-left: 20px;
`;

const Testimonial = ({client, theme}) => {
  return (
    <>
      {" "}
      <Client className="client" color={theme.color} mixed={theme.mixed}>
        {" "}
        <div className="client__quotes">
          <Quotes />
        </div>
        <div className="client__text">
          {" "}
          {client.comment}
          <h3 className=" client__name">{client.name}</h3>
          <p className="client__location">{client.location}</p>
        </div>{" "}
      </Client>{" "}
    </>
  );
};

const ClientCard = styled.div`
  overflow: scroll;
  width: 274px;
  height: 429px;
  background: var(--color-white);
  border-radius: 5px;
  color: var(--color-black);
  margin-right: 30px;

  padding: 5rem 2rem;
  padding-top: 8rem;

  position: relative;
  display: flex;
  flex-direction: column;

  .client-card {
    &__quote {
      position: absolute;
      top: 22px;
      left: 15px;
    }

    &__comment,
    &__name {
      text-align: left;
      font-weight: 300;
      font-size: 14px;
      line-height: 20px;
      white-space: pre-line;
    }

    &__client {
      margin-top: auto;
    }

    &__location {
      font-weight: 600 !important;
      font-size: 14px;
      line-height: 21px;

      color: ${(props) => `var(--color-black)`};
    }
  }
`;

const MobileClient = ({lawyers, client, theme}) => {
  return (
    <ClientCard color={theme.color}>
      <div className="client-card__quote">
        <Quotes />
      </div>
      <p className="client-card__comment">{client.comment}</p>
      <div className="client-card__client">
        <br />
        <p className="client-card__name">{client.name}</p>
        <span className="client-card__location">{client.location}</span>
      </div>
    </ClientCard>
  );
};

const Clients = ({lawyers, clients, theme}) => {
  const mobileSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    arrows: false,
  };

  const desktopSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
  };

  return (
    <>
      <Separation
        color2={true}
        color={theme.color}
        mixed={theme.mixed}
        maxWidth="90rem"
      >
        <div id="clients" className="d-none d-md-block">
          <h1>Testimonios de clientes</h1>
          <Glide
            bullets
            arrows
            options={{
              type: "carousel",
              perView: 1,
              startAt: 0,
              focusAt: 0,
            }}
          >
            {clients.map((client) => (
              <Testimonial
                key={Math.random() + ""}
                client={client}
                theme={theme}
              />
            ))}
          </Glide>
        </div>
        <div className="d-md-none">
          <div className="container">
            <MobileTitle>Testimonios de clientes</MobileTitle>
          </div>
          <ClientsWrapper>
            <Slider {...mobileSettings}>
              {clients.map((client) => (
                <MobileClient
                  key={Math.random() + ""}
                  client={client}
                  theme={theme}
                />
              ))}
            </Slider>
          </ClientsWrapper>
        </div>
      </Separation>
    </>
  );
};

export default Clients;
