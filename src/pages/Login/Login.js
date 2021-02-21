import React from "react";
import {Card, CardBody, Button} from "reactstrap";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {NavLink} from "react-router-dom";
export default function Login() {
  return (
    <div
      className="row d-flex m-0"
      style={{alignItems: "center", height: "100vh"}}
    >
      <Card
        className="col-11 col-sm-10 col-md-8 col-lg-6 m-auto row"
        style={{height: "auto"}}
      >
        <CardBody>
          <h3 className="account__title pb-5 pt-5">
            Bienvenido a Pre Aprobados
          </h3>

          <form className="form login-form col-10 m-auto" action="">
            <div className="form__form-group text-left">
              <span className="form__form-group-label ">Usuario:</span>
              <div className="form__form-group-field">
                {/*   <div className="form__form-group-icon">
                  {" "}
                  <PersonOutlineIcon />{" "}
                </div> */}
                <input
                  name="username"
                  component="input"
                  type="text"
                  placeholder="username..."
                  className="p-4 form-control-login"
                />
              </div>
            </div>
            <div className="form__form-group text-left">
              <span className="form__form-group-label">Contraseña:</span>
              <div className=" form__form-group-field">
                {/* <div className="form__form-group-icon">
                  <VpnKeyIcon />
                </div> */}
                <input
                  name="password"
                  component="input"
                  type="password"
                  placeholder="password..."
                  className="p-4 form-control-login"
                />
                <div
                  className="account__forgot-password text-right"
                  style={{
                    width: "100%",
                  }}
                >
                  <NavLink to="/reset_password">Forgot a password?</NavLink>
                </div>
              </div>
            </div>
            <div className="account__btns p-5">
              <button className="btn-customer account__btn mr-2" type="submit">
                Sign In
              </button>

              <button className="ml-2 btn-customer-outline account__btn">
                Create Account
              </button>
            </div>
          </form>
        </CardBody>{" "}
      </Card>
    </div>
  );
}
