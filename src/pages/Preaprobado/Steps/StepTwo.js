import React, {useState} from "react";
import {Container, Card, CardBody, Row, Col} from "reactstrap";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ContactsIcon from "@material-ui/icons/Contacts";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Tilt from "react-tilt";
import Switch from "react-switch";
export default function StepTwo({animation}) {
  return (
    <Container
      fluid={true}
      className={`dashboard step__cards ${animation && "step__animation"}`}
    >
      <h3 className="page-title color__background pb-2 text-center">
        Datos personales y vinculacion{" "}
      </h3>
      {!animation ? (
        <Row className=" pl-md-5 pr-md-5 pb-5 mt-5 justify-content-center">
          {" "}
          <Col className=" col-10 mb-4 mb-lg-0 col-md-6 col-lg-3 offset-lg-1 text-center icon__card">
            {" "}
            <Card>
              {" "}
              <CardBody>
                {" "}
                <LocationOnIcon style={{fontSize: "5rem "}} />{" "}
                <h4
                  className="text-center page-title color__background m-3"
                  style={{fontSize: "1.3rem"}}
                >
                  {" "}
                  Informacion basica
                </h4>
                <div
                  className="card__title "
                  style={{width: "90%", margin: "0 auto"}}
                >
                  <h5 className="bold-text text-left">
                    NUMERO DE IDENTIFICACION
                  </h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    104700542
                  </p>
                </div>
                <div
                  style={{width: "90%", margin: "0 auto"}}
                  className="card__title "
                >
                  <h5 className="bold-text  text-left">IDENTIFICACION IFI</h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    01-0470-0542
                  </p>
                </div>
                <div
                  style={{width: "90%", margin: "0 auto"}}
                  className="card__title  "
                >
                  <h5 className="bold-text   text-left">
                    VENCIMIENTOS IDENTIFICAC ION
                  </h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">---</p>
                </div>
                <div
                  style={{width: "90%", margin: "0 auto"}}
                  className="card__title  text-left"
                >
                  <h5 className="bold-text  text-left">FECHA DE NACIMIENTO</h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    20/07/1952
                  </p>
                </div>
                <div
                  style={{width: "90%", margin: "0 auto"}}
                  className="card__title  text-left"
                >
                  <h5 className="bold-text  text-left">EDAD</h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    68,6 años
                  </p>
                </div>
                <div
                  style={{width: "90%", margin: "0 auto"}}
                  className="card__title  text-left"
                >
                  <h5 className="bold-text  text-left">TELEFONOS</h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    8354961 - 27710612
                  </p>
                </div>
                <div
                  style={{width: "90%", margin: "0 auto"}}
                  className="card__title  text-left"
                >
                  <h5 className="bold-text  text-left">EMAIL PERSONAL</h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    test@test.com
                  </p>
                </div>
                <div
                  style={{width: "90%", margin: "0 auto"}}
                  className="card__title  text-left"
                >
                  <h5 className="bold-text  text-left">ESTADO CIVIL</h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    Divorciado (A)
                  </p>
                </div>{" "}
              </CardBody>{" "}
            </Card>{" "}
          </Col>
          <Col className="col-10 mb-4 mb-lg-0 col-md-6 col-lg-3 offset-lg-1 text-center icon__card">
            <Card>
              {" "}
              <CardBody>
                {" "}
                <DateRangeIcon style={{fontSize: "5rem "}} />
                <h3
                  className="text-center color__background page-title m-3"
                  style={{fontSize: "1.3rem"}}
                >
                  Codigos
                </h3>{" "}
                <div
                  className="card__title "
                  style={{width: "90%", margin: "0 auto"}}
                >
                  <h5 className="bold-text text-left">CODIGO ASOCIADO</h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    15589
                  </p>
                </div>{" "}
                <div
                  className="card__title "
                  style={{width: "90%", margin: "0 auto"}}
                >
                  <h5 className="bold-text text-left">CODIGO CLIENTE</h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    10115589
                  </p>
                </div>{" "}
                <div
                  className="card__title "
                  style={{width: "90%", margin: "0 auto"}}
                >
                  <h5 className="bold-text text-left">SEGMENTO</h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    Pensionados
                  </p>
                </div>{" "}
                <div
                  className="card__title "
                  style={{width: "90%", margin: "0 auto"}}
                >
                  <h5 className="bold-text text-left">
                    FECHA INICIO COMO ASOCIADO
                  </h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    1/1/2002
                  </p>
                </div>{" "}
                <div
                  className="card__title "
                  style={{width: "90%", margin: "0 auto"}}
                >
                  <h5 className="bold-text text-left">CAPITAL ASOCIADO</h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    $ 311.420,87
                  </p>
                </div>{" "}
                <div
                  className="card__title "
                  style={{width: "90%", margin: "0 auto"}}
                >
                  <h5 className="bold-text text-left">LIMITE TC ACTUAL</h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    $ 0,00
                  </p>
                </div>{" "}
                <div
                  className="card__title "
                  style={{width: "90%", margin: "0 auto"}}
                >
                  <h5 className="bold-text text-left">SALDO ACTUAL AHOORO</h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    $ ---
                  </p>
                </div>
              </CardBody>{" "}
            </Card>{" "}
          </Col>{" "}
          <Col className="col-10 mb-4 mb-lg-0 col-md-6 col-lg-3 offset-lg-1 text-center icon__card">
            {" "}
            <Card>
              {" "}
              <CardBody>
                {" "}
                <ContactsIcon style={{fontSize: "5rem "}} />
                <h3
                  className=" text-center page-title color__background m-3"
                  style={{fontSize: "1.3rem"}}
                >
                  Ubicaciones
                </h3>{" "}
                <div
                  className="card__title "
                  style={{width: "90%", margin: "0 auto"}}
                >
                  <h5 className="bold-text text-left">LUGAR DE RESIDENCIA</h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    {" "}
                    San Jose
                  </p>
                </div>{" "}
                <div
                  className="card__title "
                  style={{width: "90%", margin: "0 auto"}}
                >
                  <h5 className="bold-text text-left">DIRECCION PERSONAL</h5>{" "}
                  <p className="  dashboard__total-stat text-left pl-1">
                    PEREZ ZELEDON
                  </p>
                </div>
              </CardBody>{" "}
            </Card>{" "}
          </Col>
        </Row>
      ) : (
        <Row className=" pl-md-5 pr-md-5 pb-5 mt-5 justify-content-center">
          {" "}
          <Col className=" col-10 mb-4 mb-lg-0 col-md-6 col-lg-3 offset-lg-1 text-center icon__card">
            {" "}
            <Tilt options={{max: 25}}>
              {" "}
              <Card>
                {" "}
                <CardBody>
                  {" "}
                  <LocationOnIcon style={{fontSize: "5rem "}} />{" "}
                  <h4
                    className="text-center page-title color__background m-3"
                    style={{fontSize: "1.3rem"}}
                  >
                    {" "}
                    Informacion basica
                  </h4>
                  <div
                    className="card__title "
                    style={{width: "90%", margin: "0 auto"}}
                  >
                    <h5 className="bold-text text-left">
                      NUMERO DE IDENTIFICACION
                    </h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      104700542
                    </p>
                  </div>
                  <div
                    style={{width: "90%", margin: "0 auto"}}
                    className="card__title "
                  >
                    <h5 className="bold-text  text-left">IDENTIFICACION IFI</h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      01-0470-0542
                    </p>
                  </div>
                  <div
                    style={{width: "90%", margin: "0 auto"}}
                    className="card__title  "
                  >
                    <h5 className="bold-text   text-left">
                      VENCIMIENTOS IDENTIFICAC ION
                    </h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      ---
                    </p>
                  </div>
                  <div
                    style={{width: "90%", margin: "0 auto"}}
                    className="card__title  text-left"
                  >
                    <h5 className="bold-text  text-left">
                      FECHA DE NACIMIENTO
                    </h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      20/07/1952
                    </p>
                  </div>
                  <div
                    style={{width: "90%", margin: "0 auto"}}
                    className="card__title  text-left"
                  >
                    <h5 className="bold-text  text-left">EDAD</h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      68,6 años
                    </p>
                  </div>
                  <div
                    style={{width: "90%", margin: "0 auto"}}
                    className="card__title  text-left"
                  >
                    <h5 className="bold-text  text-left">TELEFONOS</h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      8354961 - 27710612
                    </p>
                  </div>
                  <div
                    style={{width: "90%", margin: "0 auto"}}
                    className="card__title  text-left"
                  >
                    <h5 className="bold-text  text-left">EMAIL PERSONAL</h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      test@test.com
                    </p>
                  </div>
                  <div
                    style={{width: "90%", margin: "0 auto"}}
                    className="card__title  text-left"
                  >
                    <h5 className="bold-text  text-left">ESTADO CIVIL</h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      Divorciado (A)
                    </p>
                  </div>{" "}
                </CardBody>{" "}
              </Card>{" "}
            </Tilt>
          </Col>
          <Col className="col-10 mb-4 mb-lg-0 col-md-6 col-lg-3 offset-lg-1 text-center icon__card">
            <Tilt options={{max: 25}}>
              {" "}
              <Card>
                {" "}
                <CardBody>
                  {" "}
                  <DateRangeIcon style={{fontSize: "5rem "}} />
                  <h3
                    className="text-center color__background page-title m-3"
                    style={{fontSize: "1.3rem"}}
                  >
                    Codigos
                  </h3>{" "}
                  <div
                    className="card__title "
                    style={{width: "90%", margin: "0 auto"}}
                  >
                    <h5 className="bold-text text-left">CODIGO ASOCIADO</h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      15589
                    </p>
                  </div>{" "}
                  <div
                    className="card__title "
                    style={{width: "90%", margin: "0 auto"}}
                  >
                    <h5 className="bold-text text-left">CODIGO CLIENTE</h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      10115589
                    </p>
                  </div>{" "}
                  <div
                    className="card__title "
                    style={{width: "90%", margin: "0 auto"}}
                  >
                    <h5 className="bold-text text-left">SEGMENTO</h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      Pensionados
                    </p>
                  </div>{" "}
                  <div
                    className="card__title "
                    style={{width: "90%", margin: "0 auto"}}
                  >
                    <h5 className="bold-text text-left">
                      FECHA INICIO COMO ASOCIADO
                    </h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      1/1/2002
                    </p>
                  </div>{" "}
                  <div
                    className="card__title "
                    style={{width: "90%", margin: "0 auto"}}
                  >
                    <h5 className="bold-text text-left">CAPITAL ASOCIADO</h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      $ 311.420,87
                    </p>
                  </div>{" "}
                  <div
                    className="card__title "
                    style={{width: "90%", margin: "0 auto"}}
                  >
                    <h5 className="bold-text text-left">LIMITE TC ACTUAL</h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      $ 0,00
                    </p>
                  </div>{" "}
                  <div
                    className="card__title "
                    style={{width: "90%", margin: "0 auto"}}
                  >
                    <h5 className="bold-text text-left">SALDO ACTUAL AHOORO</h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      $ ---
                    </p>
                  </div>
                </CardBody>{" "}
              </Card>{" "}
            </Tilt>
          </Col>{" "}
          <Col className="col-10 mb-4 mb-lg-0 col-md-6 col-lg-3 offset-lg-1 text-center icon__card">
            <Tilt options={{max: 25}}>
              {" "}
              <Card>
                {" "}
                <CardBody>
                  {" "}
                  <ContactsIcon style={{fontSize: "5rem "}} />
                  <h3
                    className=" text-center page-title color__background m-3"
                    style={{fontSize: "1.3rem"}}
                  >
                    Ubicaciones
                  </h3>{" "}
                  <div
                    className="card__title "
                    style={{width: "90%", margin: "0 auto"}}
                  >
                    <h5 className="bold-text text-left">LUGAR DE RESIDENCIA</h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      {" "}
                      San Jose
                    </p>
                  </div>{" "}
                  <div
                    className="card__title "
                    style={{width: "90%", margin: "0 auto"}}
                  >
                    <h5 className="bold-text text-left">DIRECCION PERSONAL</h5>{" "}
                    <p className="  dashboard__total-stat text-left pl-1">
                      PEREZ ZELEDON
                    </p>
                  </div>
                </CardBody>{" "}
              </Card>{" "}
            </Tilt>
          </Col>
        </Row>
      )}
    </Container>
  );
}
