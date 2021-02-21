import styled from "styled-components";
import ReactLoading from "react-loading";
/**
 * Container
 */
export const Container = styled.div.attrs({ className: "auth-container" })`
  text-align: center;

  max-width: 50rem;
  margin: 0 auto;

  .auth-container {
    &__link {
      font-size: 1.4rem;
      color: var(--color-primary) !important;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

/**
 * Header
 */
export const Header = styled.header.attrs({ className: "auth-header" })`
  position: relative;
  display: flex;
  justify-content: center;

  .auth-header {
    &__link-wrapper {
      position: absolute;
      left: 0;
      top: 20px;
    }

    &__logo {
      width: 12.5rem;
      display: block;
      margin-top: 4rem;
    }

    &__link {
      display: none;
    }

    &__mobile-link {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 19px;

      a {
        color: rgba(0, 0, 0, 0.65) !important;
      }
    }

    &__arrow {
      width: 0.926rem;
      margin-right: 1.5rem;
    }
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    .auth-header {
      &__logo {
        width: 20rem;
        cursor: pointer;
        transition: opacity 0.2s ease-in;

        &:hover {
          opacity: 0.5;
        }
      }

      &__mobile-link {
        display: none;
      }

      &__link-wrapper {
        right: calc(((90vw - 50rem) / 2) * -1);
        left: auto;
        top: 60px;
      }

      &__link {
        display: block;
        font-size: 1.4rem;
        color: var(--color-black);
      }
    }
  }
`;

/**
 * Auth method Button
 */

export const AuthMethodButton = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: var(--color-white);
  border: 1px solid var(--color-black);
  border-radius: 5px;
  position: relative;
  font-size: 14px;
  padding: 1em;
  color: var(--color-black);
  &:hover {
    color: var(--color-black);
    text-decoration: none;
  }

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .method-btn {
    &__icon {
      position: absolute;
      width: 2.5rem;
      left: 10%;
    }
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }
`;

/**
 * Form
 */

export const AuthForm = styled.form`
  text-align: center;
  margin: 3rem 0;

  .auth-form {
    &__title {
      margin-bottom: 2em;
      font-size: 1.4rem;
      font-weight: var(--regular);
    }

    &__terms {
      a strong {
        color: var(--color-black);
      }

      a {
        &:hover {
          text-decoration-color: var(--color-black);
        }
      }
    }

    &__link {
      display: block;
      color: var(--color-black);
      margin-top: 2em;
      font-size: 1.4rem;
    }

    &__text {
      font-size: 1.4rem;
    }
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    .auth-form {
      &__terms {
        font-size: 1.2rem;
      }
    }
  }
`;

/**
 * Form Group
 */

export const StyledAuthFormGroup = styled.div`
  position: relative;
  text-align: left;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  input,
  label {
    font-size: 1.4rem;
    padding: 1em;
    font-weight: var(--regular);
    color: var(--color-black);
  }

  input {
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    border: ${(props) =>
      !props.error
        ? `1px solid rgba(0, 0, 0, 0.36)`
        : `1px solid var(--color-danger) !important`};
  }

  label {
    position: absolute;
    left: 0;
    transition: all 0.2s ease;
    color: ${(props) =>
      !props.error ? `var(--color-black)` : `var(--color-danger)`};
  }

  figure {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translateY(-50%);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  span {
    position: absolute;
    left: 0;
    bottom: -1.8rem;
    color: var(--color-danger);
    padding-left: 1em;
  }

  input:not(:placeholder-shown) + label,
  input:focus + label {
    font-size: 10px;
    transform: translateY(-50%);
    padding: 0 5px;
    margin-left: 10px;
    background: white;
  }

  input:focus {
    outline: none;
    border: 1px solid var(--color-black);
  }
`;

export const AuthFormGroup = ({
  type,
  onChange,
  icon,
  error,
  label,
  ...props
}) => {
  return (
    <StyledAuthFormGroup error={error}>
      <input
        id={type}
        type={type}
        name={type}
        placeholder=" "
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      <label htmlFor={type}>{label}</label>
      <figure>
        <img src={icon} />
      </figure>

      <span>{error ? error.message : ""}</span>
    </StyledAuthFormGroup>
  );
};

const StyledFormButton = styled.button.attrs({ type: "submit" })`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

export const AuthFormButton = ({ children, outlined, loading, type }) => {
  return (
    <StyledFormButton
      className={`btn ${
        outlined ? `btn-outlined-${type}` : `btn-${type}`
      } btn-block`}
    >
      {loading ? (
        <ReactLoading
          type="spin"
          color={"currentColor"}
          height={30}
          width={30}
        />
      ) : (
        children
      )}
    </StyledFormButton>
  );
};
