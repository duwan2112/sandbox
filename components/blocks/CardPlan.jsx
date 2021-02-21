import styled from "styled-components";

const StyledCardPlan = styled.article`
  height: 100%;
  max-width: 26rem;
  margin: 0 auto;
  background: var(--color-white);
  box-shadow: 0px 8px 35px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 50px 20px 20px 20px;
  position: relative;
  text-align: center;
  display: block;
  color: var(--color-black);
  display: flex;
  flex-direction: column;

  @media ${(props) => props.theme.mediaQueries.largest} {
    width: 50rem;
    max-width: 30rem;
    padding: 80px 30px 30px 30px;
  }

  .card {
    &__icon-box {
      position: absolute;
      left: 10px;
      top: 15px;
      max-width: 90px;
    }

    &__icon {
      width: 4.5rem;

      &--first {
        width: 3.5rem;
      }
    }

    &__title {
      display: block;
      font-weight: 600;
      font-size: 2rem;
      line-height: 1.9rem;
      text-transform: uppercase;
      margin-bottom: 2.5em;
    }

    &__price {
      font-weight: 500;
      font-size: 1.8rem;
      line-height: 27px;

      span {
        font-size: 1.2rem;
      }
    }

    &__time {
      color: #676767;
      font-weight: 300;
      font-size: 1.2rem;
      line-height: 0;
      margin-top: 0.5rem;
    }

    &__features {
      margin-top: 5rem;
      margin-bottom: 5rem;
    }

    &__feature {
      font-weight: 300;
      font-size: 1.4rem;
      line-height: 1.8rem;

      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }

    &__button-box {
      margin-top: auto;
    }

    @media ${(props) => props.theme.mediaQueries.smallest} {
      &__icon-box {
        left: 20px;
        top: 25px;
      }

      &__icon {
        width: 5rem;

        &--first {
          width: 4.5rem;
        }
      }
    }

    @media ${(props) => props.theme.mediaQueries.largest} {
      &__icon {
        width: 6rem;

        &--first {
          width: 5.5rem;
        }
      }
    }
  }
`;

const CardPlan = ({ children, subscribed }) => {
  return <StyledCardPlan subscribed={subscribed}>{children}</StyledCardPlan>;
};

export default CardPlan;
