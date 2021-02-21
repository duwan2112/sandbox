import React, {useState, useEffect} from "react";
import {Container} from "reactstrap";
import {Stepper, Step, StepLabel} from "@material-ui/core";
import clsx from "clsx";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";

import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import TableChartIcon from "@material-ui/icons/TableChart";
import PersonIcon from "@material-ui/icons/Person";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PaymentIcon from "@material-ui/icons/Payment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import InfoIcon from "@material-ui/icons/Info";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import CheckIcon from "@material-ui/icons/Check";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";
import StepFive from "./Steps/StepFive";
import StepSix from "./Steps/StepSix";
import StepSeven from "./Steps/StepSeven";
import StepEight from "./Steps/StepEight";
import StepNine from "./Steps/StepNine";
import StepTeen from "./Steps/StepTeen";

function ColorlibStepIcon(props) {
  const icons = {
    1: <SettingsIcon />,
    2: <PersonIcon />,
    3: <CheckIcon />,
    4: <TableChartIcon />,
    5: <AccountBalanceIcon />,
    6: <InfoIcon />,
    7: <EqualizerIcon />,
    8: <PaymentIcon />,
    9: <AttachMoneyIcon />,
    10: <ThumbUpIcon />,
  };

  return <div>{icons[String(props.icon)]}</div>;
}

export default function Preaprobado({animation, activeStep, setActiveStep}) {
  const STEP = [
    {prueba: "Step 1"},
    {prueba: "Step 2"},
    {prueba: "Step 3"},
    {prueba: "Step 4"},
    {prueba: "Step 5"},
    {prueba: "Step 6"},
    {prueba: "Step 7"},
    {prueba: "Step 8"},
    {prueba: "Step 9"},
    {prueba: "Step 10"},
  ];

  const [activeSticky, setActiveSticky] = useState(false);

  useEffect(() => {
    let active = false;
    window.addEventListener("scroll", function () {
      if (window.screen.width < 578) {
        if (window.scrollY > 10 && !active) {
          active = true;
          setActiveSticky(true);
        } else if (window.scrollY < 10 && active) {
          active = false;
          setActiveSticky(false);
        }
      }
    });
    return () => {
      window.removeEventListener("scroll", function () {
        if (window.screen.width < 578) {
          if (window.scrollY > 140 && !active) {
            active = true;
            setActiveSticky(true);
          } else if (window.scrollY < 140 && active) {
            active = false;
            setActiveSticky(false);
          }
        }
      });
    };
  }, []);

  return (
    <Container fluid={true} className="p-0 p-md-2">
      <div className={` step__sticky ${activeSticky && "active__sticky"}`}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {STEP.map((element, i) => (
            <Step key={i}>
              <StepLabel
                onClick={() => {
                  setActiveStep(i);
                  window.scrollTo(0, 0);
                }}
                style={{cursor: "pointer"}}
                StepIconComponent={ColorlibStepIcon}
                className={`step-color ${activeStep >= i && "activeStep"}`}
              ></StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {activeStep === 0 && <StepOne animation={animation} />}
      {activeStep === 1 && <StepTwo animation={animation} />}
      {activeStep === 2 && <StepThree animation={animation} />}
      {activeStep === 3 && <StepFour animation={animation} />}
      {activeStep === 4 && <StepFive animation={animation} />}
      {activeStep === 5 && <StepSix animation={animation} />}
      {activeStep === 6 && <StepSeven animation={animation} />}
      {activeStep === 7 && <StepEight animation={animation} />}
      {activeStep === 8 && <StepNine animation={animation} />}
      {activeStep === 9 && <StepTeen animation={animation} />}
    </Container>
  );
}
