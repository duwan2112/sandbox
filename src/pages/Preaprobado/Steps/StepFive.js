import React from "react";
import {Container, Card, CardBody, Row, Col} from "reactstrap";
export default function StepFive({animation}) {
  return (
    <Container
      fluid={true}
      className={`dashboard step__cards ${animation && "step__animation"}`}
    >
      <h3 className="page-title color__background pb-2 text-center">
        Escenario Preeliminar de Estructuracion Financiera
      </h3>
      <Row>
        <Col style={{padding: "10px"}} className="col-12 col-lg-6 ">
          <Card className="font-card">
            {" "}
            <CardBody className="row">
              <Col className="col-12 row pb-4">
                <div className="col-8">
                  ESTRUCTURA FINANCIERA- MONTOL TOTAL A CONSOLIDAR
                </div>
                <div className="col-2 text-center"></div>
                <div className="col-2 text-center"> $---</div>
              </Col>
              <Col className="col-12 row pb-4">
                <div className="col-8">AHORRO A LA VISTA SUGERIDO</div>
                <div className="col-2 text-center">
                  <strong>SI</strong>{" "}
                </div>
                <div className="col-2 text-center"> $---</div>
              </Col>{" "}
              <Col className="col-12 row pb-4">
                <div className="col-8">
                  LIMITE A OTORGAR EN TARJETA DE CREDITO
                </div>
                <div className="col-2 text-center">
                  <strong>SI</strong>{" "}
                </div>
                <div className="col-2 text-center"> $0.00</div>
              </Col>{" "}
              <Col className="col-12 row pb-4">
                <div className="col-8">MEDIO DE PAGO DEDUCCION DE PLANILLA</div>
                <div className="col-2 text-center">
                  <strong>SI</strong>{" "}
                </div>
                <div className="col-2 text-center"> </div>
              </Col>{" "}
              <Col className="col-12 row pb-4">
                <div className="col-8">
                  ASOCIADO TRASLADA PAGO DE SALARIO CON COOPEALIANZA
                </div>
                <div className="col-2 text-center">
                  <strong>SI</strong>{" "}
                </div>
                <div className="col-2 text-center"></div>
              </Col>
              <Col className="col-12 row pb-4">
                <div className="col-8">RENEGOCIA PLAZO (EN MESES)</div>
                <div className="col-2 text-center">
                  <strong>NO</strong>{" "}
                </div>
                <div className="col-2 text-center"> 180</div>
              </Col>
            </CardBody>{" "}
          </Card>
        </Col>
        <Col style={{padding: "10px"}} className="col-12 col-lg-6">
          <Card className="font-card">
            {" "}
            <CardBody>
              <Col className="col-12 row pb-4">
                <div className="col-8">CUOTA CON TASA AL 18%</div>

                <div className="col-4 text-center"> $---</div>
              </Col>
              <Col className="col-12 row pb-4">
                <div className="col-8">CUOTA CON VENEFICIOS ADIC</div>
                <div className="col-4 text-center"> $---</div>
              </Col>{" "}
              <Col className="col-12 row pb-4">
                <div className="col-8">% AHORRO</div>
                <div className="col-4 text-center"> %0.00</div>
              </Col>{" "}
              <Col className="col-12 row pb-4">
                <div className="col-8">AHORRO ADIC VINCULACION</div>
                <div className="col-4 text-center"> $---</div>
              </Col>{" "}
              <Col className="col-12 row pb-4">
                <div className="col-8">AHORRO TOTAL PROYECTADO</div>
                <div className="col-4 text-center"> $---</div>
              </Col>
              <Col className="col-12 row pb-4" style={{fontSize: "19px"}}>
                <div className="col-8">
                  {" "}
                  <strong>% AHORRO POR VINCULACION</strong>{" "}
                </div>
                <div className="col-4 text-center">
                  {" "}
                  <strong>%0.00</strong>
                </div>
              </Col>{" "}
              <Col className="col-12 row pb-4" style={{fontSize: "19px"}}>
                <div className="col-8 ">
                  {" "}
                  <strong>BENEFICIO TOTAL EN TASA</strong>{" "}
                </div>
                <div className="col-4 text-center">
                  {" "}
                  <strong>$---</strong>
                </div>
              </Col>{" "}
              <Col className="col-12 row pb-4" style={{fontSize: "19px"}}>
                <div className="col-8">
                  {" "}
                  <strong>BENEFICIO TOTAL COMISION</strong>{" "}
                </div>
                <div className="col-4 text-center">
                  {" "}
                  <strong>$---</strong>
                </div>
              </Col>{" "}
            </CardBody>{" "}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
