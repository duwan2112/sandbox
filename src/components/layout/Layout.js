import React, {useState} from "react";
import Sidebar from "./Sidebar";
import TobBar from "./TopBar";
export default function Layout({
  changeColor,
  changeFont,
  font,
  animation,
  setAnimation,
  sizeFont,
  setSizeFont,
  activeStep,
  setActiveStep,
}) {
  const [active, setActive] = useState(true);

  return (
    <div className={`layout ${!active && "layout--collapse"}`}>
      <TobBar
        active={active}
        setActive={setActive}
        changeFont={changeFont}
        changeColor={changeColor}
        font={font}
      />
      <Sidebar
        changeFont={changeFont}
        changeColor={changeColor}
        font={font}
        active={active}
        setActive={setActive}
        setAnimation={setAnimation}
        animation={animation}
        sizeFont={sizeFont}
        setSizeFont={setSizeFont}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </div>
  );
}
