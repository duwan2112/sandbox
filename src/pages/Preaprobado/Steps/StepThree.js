import React from "react";
import {Container, Card, CardBody, Row, Col} from "reactstrap";
export default function StepTwo({animation}) {
  return (
    <Container
      fluid={true}
      className={`dashboard step__cards ${animation && "step__animation"}`}
    >
      <h3 className="page-title color__background pb-2 text-center">
        Verificacion de aspectos normativos
      </h3>
      <h4 className="page-title color__background pb-3 pt-2">Interno</h4>
      <Row>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">Riesgo cumplimiento</h5>{" "}
                <p className="pt-3  dashboard__total-stat">NO TIENE</p>
              </div>
              <div className="card__verification"></div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">SCORE DE ATRASO</h5>{" "}
                <p className="pt-3  dashboard__total-stat">AA</p>
              </div>
              <div className="card__verification"></div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">RANGO DE ATRASOS EN COOPEALIANZA</h5>{" "}
                <p className="pt-3 pb-3 dashboard__total-stat">15 DIAS</p>
              </div>
              <div className="card__verification card_error"></div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">PRORROGAS CON COOPEALIANZA</h5>{" "}
                <p className="pt-3  dashboard__total-stat"> 0</p>
              </div>
              <div className="card__verification card_error"></div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <h4 className="page-title color__background pb-2 pt-4">CIC</h4>
      <Row>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">CALIFICACION GLOBL CIC</h5>{" "}
                <p className="pt-3  dashboard__total-stat">1</p>
              </div>
              <div className="card__verification"></div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">PUNTAJE CIC</h5>{" "}
                <p className="pt-3  dashboard__total-stat">1,0149</p>
              </div>
              <div className="card__verification"></div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">
                  HISTORIAL CREDITICIO (MESES DE ACTIVIDAD)
                </h5>{" "}
                <p className="pt-3 pb-3 dashboard__total-stat">47,0</p>
              </div>
              <div className="card__verification card_error"></div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">
                  OPERACIONES ATRASADAS CIC -EN DIAS-{" "}
                </h5>{" "}
                <p className="pt-3  dashboard__total-stat"> 0</p>
              </div>
              <div className="card__verification card_error"></div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <h4 className="page-title color__background pb-2 pt-4">
        Protectora credito
      </h4>
      <Row>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">JUICIOS ACTIVO SEGUN PROTECTORA</h5>{" "}
                <p className="pt-3  dashboard__total-stat">0</p>
              </div>
              <div className="card__verification"></div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">REFERENCIAS NEGATIVAS</h5>{" "}
                <p className="pt-3  dashboard__total-stat">0</p>
              </div>
              <div className="card__verification"></div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">EMBARGO MUEBLES</h5>{" "}
                <p className="pt-3 pb-3 dashboard__total-stat">0</p>
              </div>
              <div className="card__verification card_error"></div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">EMBARGO INMUEBLES</h5>{" "}
                <p className="pt-3  dashboard__total-stat"> 0</p>
              </div>
              <div className="card__verification card_error"></div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <h4 className="page-title color__background pb-2 pt-4">
        Otros mitigados
      </h4>
      <Row>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">MODALIDAD DE PAGO</h5>{" "}
                <p className="pt-3  dashboard__total-stat">
                  DEDUCCION DE PLANTILLAS
                </p>
              </div>
              <div className="card__verification"></div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">SEGMENTO</h5>{" "}
                <p className="pt-3  dashboard__total-stat">
                  ASALARIADO PRIVADO
                </p>
              </div>
              <div className="card__verification"></div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">HISTORIAL LABORAL</h5>{" "}
                <p className="pt-3 pb-3 dashboard__total-stat">
                  MAYOR 12 MESES
                </p>
              </div>
              <div className="card__verification card_error"></div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">GARANTIA</h5>{" "}
                <p className="pt-3  dashboard__total-stat">SIN FIADOR</p>
              </div>
              <div className="card__verification card_error "></div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
