import React, {useState} from "react";
import {Collapse} from "reactstrap";
import MenuIcon from "@material-ui/icons/Menu";
import ColorLensIcon from "@material-ui/icons/ColorLens";
export default function TopBar({
  active,
  setActive,
  changeColor,
  changeFont,
  font,
}) {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="topbar" style={{display: "flex", alignItems: "center"}}>
      <button
        type="submit"
        className="step__card"
        style={{
          padding: "0",
          margin: "0 0 0 2rem",
          marginLeft: "2rem",
          background: "transparent",
          height: "35px",
          border: "none",
        }}
        onClick={() => {
          setActive(!active);
        }}
      >
        <MenuIcon style={{fontSize: "2rem"}} />
      </button>
      <h4 className="pl-3"> Pre Aprobado Titulo</h4>
      {/* 
      <button
        type="submit"
        className="step__card"
        style={{
          padding: "0",
          margin: "0 0 0 2rem",
          marginLeft: "2rem",
          background: "transparent",
          height: "35px",
          border: "none",
        }}
        onClick={() => {
          setCollapse(!collapse);
          // changeColor()
        }}
      >
        <ColorLensIcon style={{fontSize: "2rem"}} />
      </button>

      <Collapse isOpen={collapse} className="topbar__menu-wrap">
        <div className="topbar__menu">
          <div
            onClick={() => {
              changeColor();
            }}
            className="topbar__link"
          >
            <span className={`topbar__link-icon lnr `} />
            <p className="topbar__link-title">Themes </p>
          </div>
          <div
            onClick={() => {
              changeFont();
            }}
            className="topbar__link"
          >
            <span className={`topbar__link-icon lnr `} />
            <p className="topbar__link-title">Fonts ({font})</p>
          </div>
        </div>
      </Collapse> */}
    </div>
  );
}
