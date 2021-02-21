import styled from "styled-components";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";

const CardsWrapper = styled.div`
  img {
    width: 3.5rem;
    height: 2.2rem;

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const fieldOptions = {
  style: {
    base: {
      color: "#000000",
      fontSize: "14px",
      fontWeight: 300,
      fontFamily: " Quicksand, sans-serif",
      "::placeholder": {
        fontFamily: " Quicksand, sans-serif",
        fontSize: "14px",
        fontWeight: 300,
        color: "rgba(65, 65, 65, 0.3)",
      },
    },
  },
};

const CreditField = styled.div`
  .credit__input {
    position: relative;
    border: 1px solid #adadad;
    border-radius: 5px;
    padding: 18px 15px;
    width: 100%;
  }
  .credit__first {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .credit__second {
    border-top: 0;
    display: flex;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    height: 100%;
    padding: 0;
    .credit__expiry,
    .credit__cvc {
      position: relative;
      padding: 18px 15px;
      padding-right: 0;
      height: 100%;
      width: 50%;
      .cvc__img {
        position: absolute;
        right: -5px;
        top: 14px;

        img {
          width: 60%;
        }
      }
    }
    .credit__expiry {
      border-right: 1px solid #adadad;
    }
  }
  .credit__img {
    position: absolute;
    right: 15px;
    top: 14px;
    width: 22%;
    img {
      width: 45%;
      margin-left: 4px;
    }
    @media (max-width: 990px) {
      img {
        width: 50%;
        margin-left: 0;
      }

      top: 17px;
    }
  }
`;

const Stripe = ({}) => {
  return (
    <>
      <p className="stripe__text">Información de la tarjeta</p>
      <CreditField>
        <div className="credit__input credit__first">
          <CardNumberElement options={fieldOptions} />
          <div className="credit__img">
            <img src={require("../../../../public/static/visa.png")} />
            <img src={require("../../../../public/static/mastercard.png")} />
          </div>
        </div>
        <div className="credit__input credit__second">
          <div className="credit__expiry">
            <CardExpiryElement options={fieldOptions} />{" "}
          </div>
          <div className="credit__cvc">
            <CardCvcElement options={fieldOptions} />
            <div className="cvc__img">
              <img src={require("../../../../public/static/cvc.png")} />
            </div>
          </div>
        </div>
      </CreditField>
    </>
  );
};

export default Stripe;
