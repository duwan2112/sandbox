import { useContext } from "react";
import styled from "styled-components";

import { Alert } from "../components/contexts";

const StyledToast = styled.div`
  position: fixed;
  width: 100%;
  bottom: 20px;
  z-index: 9999;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.open ? `translateY(0)` : `translateY(200%)`)};

  @media ${(props) => props.theme.mediaQueries.medium} {
    display: flex;
    justify-content: flex-end;
  }
`;

const ToastContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  box-shadow: 0px 8px 35px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border-bottom: 2px solid
    ${(props) =>
      props.type === "success"
        ? `var(--color-success)`
        : `var(--color-danger)`};
  position: relative;
  background: white;

  h1 {
    font-size: 1.4rem;
    font-weight: var(--regular);
    padding: 1em 2.5em 1em 1.5em;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    width: 40rem;
    margin: 0 2rem 0 0;
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    background: var(--color-black);
    height: 0.2rem;
    border-radius: 4px;
  }

  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

const Toast = () => {
  const { state, clearToast } = useContext(Alert.AlertContext);
  return (
    <StyledToast open={state.open} onClick={clearToast}>
      <ToastContainer type={state.type}>
        <CloseIcon onClick={clearToast} />

        <h1>{state.msg}</h1>
      </ToastContainer>
    </StyledToast>
  );
};

export default Toast;
