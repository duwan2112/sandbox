import React from "react";
import {Container, Card, CardBody, Row, Col} from "reactstrap";
export default function StepNine({animation}) {
  return (
    <Container
      fluid={true}
      className={`dashboard step__cards ${animation && "step__animation"}`}
    >
      <h3 className="page-title pb-2 color__background text-center">
        Estructura de Montos a Financiar y Rubros
      </h3>
      <Row>
        <Col style={{padding: "10px"}} className="col-12 col-lg-6">
          <Card className="font-card">
            {" "}
            <CardBody>
              <Col
                className="col-12 text-center row  pt-3"
                style={{fontSize: "1.1rem"}}
              >
                <div className="col-12 ">MONTOS A FINANCIAR</div>
              </Col>
              <Col className="col-12 row  pt-3">
                <div className="col-9 ">Refinanciamientos Externos</div>
                <div className="col-3 text-center"> $----</div>
              </Col>
              <Col className="col-12 row ">
                <div className="col-9 ">
                  Saldos Adicionales por Tarjetas de Credito Externas
                </div>
                <div className="col-3 text-center"> $----</div>
              </Col>
              <Col className="col-12 row ">
                <div className="col-9 ">
                  Saldos Adicionales Otras Operaciones Externas
                </div>
                <div className="col-3 text-center">$---</div>
              </Col>{" "}
              <Col className="col-12 row ">
                <div className="col-9 ">
                  Saldos Adicionales Deudas No Reguladas
                </div>
                <div className="col-3 text-center">$---</div>
              </Col>{" "}
              <Col className="col-12 row ">
                <div className="col-9 ">Personales</div>
                <div className="col-3 text-center">$---</div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row ">
                <div className="col-9 ">Refinanciamientos Internos </div>
                <div className="col-3 text-center">$---</div>
              </Col>{" "}
              <Col className="col-12 row ">
                <div className="col-9 ">Deudas Internas</div>
                <div className="col-3 text-center">$---</div>
              </Col>{" "}
              <Col className="col-12 row ">
                <div className="col-9 ">
                  <strong> SUBTOTAL A FINANCIAL</strong>
                </div>
                <div className="col-3 text-center">$---</div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row " style={{fontSize: "0.7rem"}}>
                <div className="col-9 ">PRIMER CUOTA</div>
                <div className="col-3 text-center" style={{fontSize: "0.9rem"}}>
                  $...
                </div>
              </Col>
              <Col className="col-12 row " style={{fontSize: "0.7rem"}}>
                <div className="col-9 ">AJUSTE INTERESES</div>
                <div className="col-3 text-center" style={{fontSize: "0.9rem"}}>
                  $...
                </div>
              </Col>{" "}
              <Col className="col-12 row " style={{fontSize: "0.7rem"}}>
                <div className="col-9 ">CAPITAL SOC PRIMER CUOTA</div>
                <div className="col-3 text-center" style={{fontSize: "0.9rem"}}>
                  $...
                </div>
              </Col>{" "}
              <Col className="col-12 row " style={{fontSize: "0.7rem"}}>
                <div className="col-9 ">PROGRAMA SOCIAL</div>
                <div className="col-3 text-center" style={{fontSize: "0.9rem"}}>
                  $...
                </div>
              </Col>{" "}
              <Col className="col-12 row " style={{fontSize: "0.7rem"}}>
                <div className="col-9 ">POLIZA ASEGURAM CARTERA</div>
                <div className="col-3 text-center" style={{fontSize: "0.9rem"}}>
                  $...
                </div>
              </Col>{" "}
              <Col className="col-12 row " style={{fontSize: "0.7rem"}}>
                <div className="col-9 ">PAPELERIA</div>
                <div className="col-3 text-center" style={{fontSize: "0.9rem"}}>
                  $...
                </div>
              </Col>{" "}
              <Col className="col-12 row " style={{fontSize: "0.7rem"}}>
                <div className="col-9 ">IMPREVISTOS</div>
                <div className="col-3 text-center" style={{fontSize: "0.9rem"}}>
                  $...
                </div>
              </Col>{" "}
              <Col className="col-12 row " style={{fontSize: "0.7rem"}}>
                <div className="col-9 ">COMISION</div>
                <div className="col-3 text-center" style={{fontSize: "0.9rem"}}>
                  $...
                </div>
              </Col>{" "}
              <Col className="col-12 row " style={{fontSize: "0.7rem"}}>
                <div className="col-9 ">CAPITALIZACION</div>
                <div className="col-3 text-center" style={{fontSize: "0.9rem"}}>
                  $...
                </div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row ">
                <div className="col-9 "> </div>
                <div className="col-3 text-center">$---</div>
              </Col>{" "}
              <Col className="col-12 row ">
                <div className="col-9 " style={{fontSize: "1.1rem"}}>
                  {" "}
                  <strong>MONTO TOTAL A FINANCIAR</strong>{" "}
                </div>
                <div className="col-3 text-center">$---</div>
              </Col>{" "}
            </CardBody>{" "}
          </Card>
        </Col>
        <Col style={{padding: "10px"}} className=" col-12 col-lg-6">
          <Card className="font-card">
            {" "}
            <CardBody>
              <Col
                className="col-12 text-center row  pt-3"
                style={{fontSize: "1.1rem"}}
              >
                <div className="col-12 ">
                  CALCULO DE NUEVA CUOTA CON ADICIONALES
                </div>
              </Col>
              <Col className="col-12 row  pt-3"></Col>
              <Col className="col-12 row  ">
                <div className="col-9 "> CUOTA PREELIMINAR</div>
                <div className="col-3 text-center"> $----</div>
              </Col>
              <Col className="col-12 row  ">
                <div className="col-9 ">
                  MONTO ADICIONAL POR AJUSTES DE CUOTA
                </div>
                <div className="col-3 text-center">$---</div>
              </Col>
              <Col className="col-12 row  ">
                <div className="col-9 ">SUBTOTAL CUOTA (AMORT + INT)</div>
                <div className="col-3 text-center">$---</div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row  ">
                <div className="col-9 ">POLIZA INCENDIO</div>
                <div className="col-3 text-center"> $---</div>
              </Col>
              <Col className="col-12 row  ">
                <div className="col-9 ">CAPITAL SOCIAL ORDINARIO</div>
                <div className="col-3 text-center"> $---</div>
              </Col>
              <Col className="col-12 row  ">
                <div className="col-9 ">CAPITAL SOCIAL ADICIONAL</div>
                <div className="col-3 text-center"> $---</div>
              </Col>
              <Col className="col-12 row  ">
                <div className="col-9 ">POLIZA ASEGURAMIENTO CARTERA</div>
                <div className="col-3 text-center"> $---</div>
              </Col>
              <Col className="col-12 row  ">
                <div className="col-9 ">APORTE A PROGRAMA SOCIAL</div>
                <div className="col-3 text-center"> $---</div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row  ">
                <div className="col-9 ">% AHORRO TOTAL</div>
                <div className="col-3 text-center"> $---</div>
              </Col>
              <Col className="col-12 row  ">
                <div className="col-9 ">AHORRO TOTAL ESTIMADO</div>
                <div className="col-3 text-center"> $---</div>
              </Col>
              <Col className="col-12 row  ">
                <div className="col-9 ">CUOTA LIMITE TC</div>
                <div className="col-3 text-center"> $---</div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row ">
                <div className="col-9 " style={{fontSize: "1.1rem"}}>
                  {" "}
                  <strong>CUOTA TOTAL APROXIMADA</strong>{" "}
                </div>
                <div className="col-3 text-center">$---</div>
                <br />
                <br />
                <br />
              </Col>{" "}
              <Col
                className="col-12 text-center row  pt-3"
                style={{fontSize: "1.1rem"}}
              >
                <div className="col-12 ">DESCRIPCION</div>
                <br />
                <br />
              </Col>
              <Col className="col-12 row  ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit,
                ab ratione. Nostrum, magni voluptatum? Nemo, eveniet eaque.
                Quisquam, repellendus ut placeat, neque reiciendis quas libero
                minus nemo beatae doloremque tenetur.
              </Col>
            </CardBody>{" "}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
