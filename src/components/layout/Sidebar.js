import React, {useState} from "react";
import Scrollbar from "react-smooth-scrollbar";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import {Collapse} from "reactstrap";
import FontDownloadIcon from "@material-ui/icons/FontDownload";
import Switch from "react-switch";
import AssignmentIcon from "@material-ui/icons/Assignment";

import Select from "react-select";
export default function Sidebar({
  active,
  setActive,
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
  const [preAprobado, setPreAprobado] = useState(false);

  const options = [
    {value: "light", label: "Light"},
    {value: "dark", label: "Dark"},
    {value: "new", label: "Blue Opacity"},
    {value: "white", label: "White"},
    {value: "blue", label: "Blue"},
    {value: "blueWhite", label: "BlueWhite"},
  ];
  const options2 = [
    {value: "default", label: "Default"},
    {value: "abel", label: "Abel"},
    {value: "barlow", label: "Barlow"},
    {value: "barlow-condensed", label: "Barlow-condensed"},
    {value: "barlow-semi", label: "Barlow-semi"},
    {value: "open-sand", label: "Open-sand"},
    {value: "pt-sans", label: "Pt-sans"},
  ];
  return (
    <>
      {/*    {!active && (
        <button
          type="submit"
          className="d-block d-sm-none  menu step__card open-menu"
          onClick={() => {
            setActive(!active);
          }}
        >
          <MenuIcon style={{fontSize: "2rem"}} />
        </button>
      )} */}

      <div
        className={`sidebar ${active ? "sidebar--show" : "sidebar--collapse"} `}
      >
        <div
          className="d-sm-none close-menu"
          onClick={() => {
            console.log("active");
            setActive(!active);
          }}
        >
          {" "}
          <CloseIcon />{" "}
        </div>
        <button
          type="submit"
          className="d-none d-sm-block close-menu menu step__card"
          onClick={() => {
            setActive(!active);
          }}
        >
          <MenuIcon style={{fontSize: "2rem"}} />
        </button>

        <Scrollbar className="sidebar__scroll scroll ">
          <div
            className={`mt-5 mt-sm-0 home-icon ${
              active ? "d-block" : "d-none"
            }`}
          ></div>
          <div className="sidebar__wrapper sidebar__wrapper--desktop">
            <div className="sidebar__content">
              <ul className="sidebar__block">
                <li className="sidebar-link">
                  <span className={`sidebar__link-icon`}>
                    {" "}
                    <AssignmentIcon style={{fontSize: "1.5rem"}} />{" "}
                  </span>
                  <p
                    onClick={() => {
                      setPreAprobado(!preAprobado);
                    }}
                    className={`sidebar__link-title ${
                      active ? "d-flex" : "d-none"
                    }`}
                  >
                    {" "}
                    Pre Aprobado
                  </p>{" "}
                </li>{" "}
                <Collapse isOpen={preAprobado}>
                  <button
                    onClick={() => {
                      console.log("active");
                      setActiveStep(0);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">I</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(1);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">II</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(2);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">III</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(3);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">IV</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(4);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">V</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(5);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">VI</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(6);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">VII</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(7);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">VIII</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(8);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">IX</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(9);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">X</p>
                  </button>
                </Collapse>
              </ul>
            </div>
          </div>
          <div className="sidebar__wrapper sidebar__wrapper--mobile">
            <div className="sidebar__content">
              <ul className="sidebar__block">
                <li className="sidebar__link">
                  <span className={`sidebar__link-icon`}>
                    {" "}
                    <AssignmentIcon style={{fontSize: "1rem"}} />{" "}
                  </span>

                  <p
                    onClick={() => {
                      setPreAprobado(!preAprobado);
                    }}
                    className={`sidebar__link-title ${
                      active ? "d-flex" : "d-none"
                    }`}
                  >
                    {" "}
                    Pre Aprobado
                  </p>
                </li>
                <Collapse isOpen={preAprobado}>
                  {" "}
                  <button
                    onClick={() => {
                      console.log("active");
                      setActiveStep(0);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">I</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(1);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">II</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(2);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">III</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(3);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">IV</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(4);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">V</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(5);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">VI</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(6);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">VII</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(7);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">VIII</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(8);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">IX</p>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep(9);
                    }}
                    className="sidebar__link"
                    type="button"
                  >
                    <p className="sidebar__link-title">X</p>
                  </button>
                </Collapse>
              </ul>
            </div>
          </div>
          <div className={`bottom-settings ${active ? "d-block" : "d-none"}`}>
            {/*     <button
            type="submit"
            onClick={() => {
              changeColor();
            }}
          >
            <ColorLensIcon style={{fontSize: "2rem"}} />
          </button>
          <button
            type="submit"
            onClick={() => {
              setActiveDropdown(!activeDropdown);
              changeFont();
            }}
          >
            <FontDownloadIcon style={{fontSize: "2rem"}} /> ({font})
          </button> */}
            <p htmlFor="" className="label__dropdown pb-1">
              Animations
            </p>
            <Switch
              onChange={() => {
                setAnimation(!animation);
              }}
              checked={animation}
              className="react-switch"
            />
            <p htmlFor="" className="label__dropdown">
              Themes
            </p>
            <Select
              onChange={(e) => {
                changeColor(e.value);
              }}
              placeholder="Light"
              className="dropdowns"
              options={options}
              menuPlacement="top"
            />
            <p htmlFor="" className="label__dropdown">
              Fonts
            </p>
            <Select
              onChange={(e) => {
                changeFont(e.value);
              }}
              placeholder="Default"
              className="dropdowns"
              options={options2}
              menuPlacement="top"
            />
            <p htmlFor="" className="label__dropdown">
              Sizes
            </p>
            <input
              type="text"
              value={sizeFont}
              onChange={(e) => {
                setSizeFont(e.target.value);
              }}
              className="form-control "
            />
          </div>
        </Scrollbar>
      </div>
    </>
  );
}
