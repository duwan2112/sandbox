import styled from "styled-components";

const CheckboxContainer = styled.div``;

const Icon = styled.svg`
  height: 100%;
  width: 100%;

  fill: ${(props) =>
    props.color
      ? `var(--color-website-${props.color === "gray" ? "black" : props.color})`
      : `var(--color-primary)`};

  @media (min-width: 768px) {
    position: relative;
    top: 3px;
    left: 2px;
  }
`;
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({type: "checkbox"})`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  background: transparent;
  border: 1px solid black;
  border-radius: 3px;
  transition: all 150ms;

  @media (min-width: 768px) {
    border: 1px solid rgba(0, 0, 0, 0.7);
    box-sizing: border-box;
    border-radius: 2px;
    width: 20px;
    height: 20px;
  }

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

const Checkbox = ({className, checked, color, ...props}) => {
  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon color={color}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 29 29"
          >
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
          </svg>
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );
};

export default Checkbox;
