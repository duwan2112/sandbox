import React from "react";
import {Container, Card, CardBody, Row, Col} from "reactstrap";
export default function StepEight({animation}) {
  return (
    <Container
      fluid={true}
      className={`dashboard step__cards ${animation && "step__animation"}`}
    >
      <h3 className="page-title pb-2 color__background text-center">
        Capacidad de Pago
      </h3>
      <Row>
        <Col style={{padding: "10px"}} className="col-12 col-lg-6">
          <Card className="font-card">
            {" "}
            <CardBody>
              <Col
                className="col-12 text-center row pb-1 pt-3"
                style={{fontSize: "1.1rem"}}
              >
                <div className="col-12 ">CAPACIDAD DE PAGO HISTORICO</div>
              </Col>
              <Col className="col-12 row pb-1 pt-3">
                <div className="col-9 ">INGRESO BRUTO ACTUAL</div>
                <div className="col-3 text-center"> $----</div>
              </Col>
              <Col className="col-12 row pb-1">
                <div className="col-9 ">INGRESO NETO ACTUAL</div>
                <div className="col-3 text-center"> $----</div>

                <br />
                <br />
              </Col>
              <Col className="col-12 row pb-1">
                <div className="col-9 ">INGRESO BRUTO </div>
                <div className="col-3 text-center">$---</div>
              </Col>{" "}
              <Col className="col-12 row pb-1">
                <div className="col-9 ">CARGAS SOCIALES </div>
                <div className="col-3 text-center">$---</div>
              </Col>{" "}
              <Col className="col-12 row pb-1">
                <div className="col-9 ">IMPUESTOS DE RENTA </div>
                <div className="col-3 text-center">$---</div>
              </Col>{" "}
              <Col className="col-12 row pb-1">
                <div className="col-9 ">DEDUCCIONES </div>
                <div className="col-3 text-center">$---</div>
              </Col>
              <Col className="col-12 row pb-1">
                <div className="col-9 ">OTRAS DEDUCCIONES </div>
                <div className="col-3 text-center">$---</div>

                <br />
                <br />
              </Col>
              <Col className="col-12 row pb-1">
                <div className="col-9 ">INGRESO NETO </div>
                <div className="col-3 text-center">$---</div>

                <br />
                <br />
              </Col>{" "}
              <Col className="col-12 row pb-1">
                <div className="col-9 ">( - ) CUOTAS DE DEUDAS TOTALES </div>
                <div className="col-3 text-center">$---</div>

                <br />
                <br />
              </Col>{" "}
              <Col className="col-12 row pb-1">
                <div className="col-9 ">
                  CUOTAS DE DEUDAS INTERNAS QUE NO SE CANCELAN{" "}
                </div>
                <div className="col-3 text-center">$---</div>
              </Col>{" "}
              <Col className="col-12 row pb-1">
                <div className="col-9 ">
                  CUOTAS DE DEUDAS E4TERNAS QUE NO SE CANCELAN{" "}
                </div>
                <div className="col-3 text-center">$---</div>
              </Col>{" "}
              <Col className="col-12 row pb-1">
                <div className="col-9 ">CUOTAS DE DEUDAS NO REGULARES </div>
                <div className="col-3 text-center">$---</div>

                <br />
                <br />
              </Col>{" "}
              <Col className="col-12 row pb-1">
                <div className="col-9 ">
                  ( = ) SALARIO LIQUIDO ANTES DE LA CUOTA
                </div>
                <div className="col-3 text-center">$---</div>
              </Col>{" "}
              <Col className="col-12 row pb-1">
                <div className="col-9 ">( - ) CUOTA DEL CREDITO A OTORGAR </div>
                <div className="col-3 text-center">$---</div>

                <br />
                <br />
              </Col>{" "}
              <Col className="col-12 row pb-1">
                <div className="col-9 ">
                  ( = ) SALARIO LIQUIDO DESPEUS DE LA CUOTA{" "}
                </div>
                <div className="col-3 text-center">$---</div> <br />
                <br />
              </Col>
              <Col className="col-12 row " style={{fontSize: "0.7rem"}}>
                <div className="col-9 ">SOBRANTE SOBRE SALARIO MINIMO</div>
                <div className="col-3 text-center"></div>
              </Col>
              <Col className="col-12 row pb-1">
                <div className="col-9 ">
                  LIQUIDO DISPONIBLE DESPUES DE REBAJOS
                </div>
                <div className="col-3 text-center"></div>
              </Col>
              <Col className="col-12 row pb-1" style={{fontSize: "1.1rem"}}>
                <div className="col-9 ">
                  <strong>% ENDEUDAMIENTO O NIVEL CAPACIDAD DE PAGO</strong>
                </div>
                <div className="col-3 text-center">$... </div>
              </Col>
            </CardBody>{" "}
          </Card>
        </Col>
        <Col style={{padding: "10px"}} className="col-12 col-lg-6">
          <Card className="font-card">
            {" "}
            <CardBody>
              {" "}
              <Col
                className="col-12 text-center row pb-1 pt-3"
                style={{fontSize: "1.1rem"}}
              >
                <div className="col-12 ">CAPACIDAD DE PAGO ACTUAL</div>
              </Col>
              <Col className="col-12 row pb-1 pt-3">
                <div className="col-9 ">INGRESO BRUTO ACTUAL</div>
                <div className="col-3 text-center"> $----</div>
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 ">
                  DISMINUCION / INCREMENTO DE INGRESOS
                </div>
                <div className="col-3 text-center"> $----</div>
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 ">CAPACIDAD DE PAGO AL</div>
                <div className="col-3 text-center"> 01/11/2020</div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 ">INGRESO BRUTO</div>
                <div className="col-3 text-center"> $---</div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 ">CARGAS SOCIALES</div>
                <div className="col-3 text-center"> $---</div>
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 ">IMPUESTOS DE RENTA</div>
                <div className="col-3 text-center"> $---</div>
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 ">DEDUCCIONES</div>
                <div className="col-3 text-center"> $---</div>
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 ">OTRAS DEDUCCIONES</div>
                <div className="col-3 text-center"> $---</div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 ">INGRESO NETOS</div>
                <div className="col-3 text-center"> $---</div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 ">( - ) CUOTAS DE DEUDAS TOTALES</div>
                <div className="col-3 text-center"> $---</div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 ">
                  CUOTAS DE DEUDAS INTERNS QUE NO SE CANCELAN
                </div>
                <div className="col-3 text-center"> $---</div>
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 ">
                  CUOTAS DE DEUDAS EXTERNAS QUE NO SE CANCELAS
                </div>
                <div className="col-3 text-center"> $---</div>
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 ">CUOTAS TARJETAS CREDITO VINCULADAS</div>
                <div className="col-3 text-center"> $---</div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 ">( = ) LIQUIDO ANTES DE CUOTA</div>
                <div className="col-3 text-center"> $---</div>
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 ">( - ) CUOTA DEL NUEVO CREDITO</div>
                <div className="col-3 text-center"> $--- </div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row pb-1 ">
                <div className="col-9 "> ( = ) LIQUIDO DESPUES CUOTA</div>
                <div className="col-3 text-center"> $---</div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row " style={{fontSize: "0.7rem"}}>
                <div className="col-9 ">SOBRANTE SOBRE SALARIO MINIMO</div>
                <div className="col-3 text-center"> $....</div>
              </Col>
              <Col className="col-12 row pb-1">
                <div className="col-9 ">SI CUMPLE</div>
                <div className="col-3 text-center">$...</div>
              </Col>
              <Col className="col-12 row pb-1" style={{fontSize: "1rem"}}>
                <div className="col-9 ">
                  <strong>% ENDEUDAMIENTO O NIVEL CAPACIDAD DE PAGO</strong>
                </div>
                <div className="col-3 text-center">$... </div>
              </Col>
              <Col className="col-12 row pb-1 pt-3 text-center">
                <div
                  className="col-12 "
                  style={{background: "rgb(83,199,123)", padding: "0.5rem 0"}}
                >
                  <strong>SOLICITUD APROBADA PARA LA LINEA</strong>
                </div>
              </Col>
            </CardBody>{" "}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
