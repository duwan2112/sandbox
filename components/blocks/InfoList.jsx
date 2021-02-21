import styled from "styled-components";

const StyledInfoList = styled.ul`
  margin-top: 2rem;
  padding: 0 1.2em;
  .list {
    &__item {
      &:not(:last-child) {
        margin-bottom: 2em;
      }
    }

    &__figure {
      display: block;
      margin-right: 16px;
    }

    &__img {
      width: 28px;
      object-fit: cover;
    }

    &__text {
      font-weight: var(--regular);
      font-size: 13px;
      line-height: 18px;
    }
  }

  @media ${props => props.theme.mediaQueries.large} {
    .list {
      &__img {
        width: 30px;
      }

      &__text {
        font-size: 1.4rem;
      }
    }
    padding: 0 3em;
  }
`;

const InfoList = ({ children }) => {
  return <StyledInfoList>{children}</StyledInfoList>;
};

export default InfoList;
