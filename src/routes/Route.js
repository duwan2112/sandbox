import React, {useState} from "react";
import {Route} from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";

const SizeFont = styled.div`
  th,
  td,
  .font-card,
  .dashboard__total-stat {
    font-size: ${(props) => (props.size ? `${props.size}px` : "17px")};
  }
`;

export default function Router({component: Component, layout, path, ...rest}) {
  const [color, setColor] = useState("light");
  const [font, setFont] = useState("default");
  const [animation, setAnimation] = useState(true);
  const [sizeFont, setSizeFont] = useState("17");
  const [activeStep, setActiveStep] = useState(0);

  const changeColor = (value) => {
    switch (value) {
      case "light":
        setColor("light");

        break;
      case "dark":
        setColor("dark");

        break;
      case "new":
        setColor("new");
        break;
      case "white":
        setColor("white");
        break;
      case "blue":
        setColor("blue");
        break;
      case "blueWhite":
        setColor("blueWhite");
        break;
      default:
        break;
    }
  };

  const changeFont = (value) => {
    console.log("prueba");

    switch (value) {
      case "default":
        setFont("default");
        break;
      case "abel":
        setFont("abel");
        break;
      case "barlow":
        setFont("barlow");
        break;
      case "barlow-condensed":
        setFont("barlow-condensed");
        break;
      case "barlow-semi":
        setFont("barlow-semi");
        break;
      case "open-sand":
        setFont("open-sand");
        break;
      case "pt-sans":
        setFont("pt-sans");
        break;
      default:
        break;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {layout ? (
              <div
                className={`theme-${color}  font-${font} ltr-support`}
                dir="ltr"
              >
                <Layout
                  changeColor={changeColor}
                  changeFont={changeFont}
                  font={font}
                  animation={animation}
                  setAnimation={setAnimation}
                  sizeFont={sizeFont}
                  setSizeFont={setSizeFont}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
                <SizeFont size={sizeFont} className="container__wrap">
                  <Component
                    animation={animation}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    {...props}
                  />
                </SizeFont>
              </div>
            ) : (
              <div className={`theme-light  font-${font} `}>
                <div className="container__wrap p-0">
                  {" "}
                  <Component {...props} />
                </div>
              </div>
            )}
          </>
        );
      }}
    ></Route>
  );
}
