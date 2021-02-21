import React from "react";
import {Container, Card, CardBody, Row, Col} from "reactstrap";
export default function StepTeen({animation}) {
  return (
    <Container
      fluid={true}
      className={`dashboard step__cards ${animation && "step__animation"}`}
    >
      <h3 className="page-title pb-2 color__background text-center">
        Resolucion y Recomendaciones
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
                <div className="col-12 ">RESOLUCION OPERACION CREDITICA</div>
              </Col>
              <Col className="col-12 row  pt-3">
                <p>
                  {" "}
                  SOLICITUD APROBADA PARA LA LÍNEA 245 - PREAPROBADOS
                  VINCULACIÓN POR UN MONTO DE{" "}
                  <strong style={{fontSize: "1rem"}}>
                    $ 1.190.012,55
                  </strong>{" "}
                  PARA REFINANCIR OPERACIONES DETALLADAS EN ESTA PRESOLICITUD, A
                  UNA TASA DE{" "}
                  <strong style={{fontSize: "1rem"}}> 16,71% </strong> A NOMBRE
                  DE MURILLO MURILLO RODOLDO A UN PLAZOEN MESES DE{" "}
                  <strong style={{fontSize: "1rem"}}> 180 </strong> LO QUE
                  PREELIMINARMENTE ESTIMA UNA CUOTA APROXIADA DE{" "}
                  <strong style={{fontSize: "1rem"}}> $29.361,66 </strong> MAS
                  UNA CUOTA DE AHORRO A LA VISTA MENSUAL DE{" "}
                  <strong style={{fontSize: "1rem"}}> $0.00 </strong> LO QUE
                  ESTIMA UNA CUOTA MENSUAL TOTAL DE ( QUE INCLUYE AHORRA A LA
                  VISTA <strong style={{fontSize: "1rem"}}> $29.361,66 </strong>{" "}
                  ) APEGADO A LO ESTABLECIDO EN EL PR-CRE-PREA-001 PROCEDIMIENTO
                  DE SOLUCIONES FINANCIERAS PREAPROBADS Y SEGUN LA FUCHA DE
                  PRODUCCION DE ...
                </p>
              </Col>
              <Col className="col-12 row pb-1 pt-3 text-center">
                <div
                  className="col-12 "
                  style={{
                    background: "rgb(83,199,123)",
                    padding: "0.5rem 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <strong>SOLICITUD APROBADA PARA LA LINEA</strong>
                </div>
              </Col>
            </CardBody>{" "}
          </Card>
        </Col>
        <Col style={{padding: "10px"}} className="col-12 col-lg-6">
          <Card className="font-card">
            {" "}
            <CardBody>
              <Col
                className="col-12 text-center row  pt-3"
                style={{fontSize: "1.1rem"}}
              >
                <div className="col-12 ">RECOMENDACIONES DE MIGRACION</div>
                <br />
                <br />
              </Col>

              <Col
                className="col-12 row"
                style={{display: "flex", alignItems: "center"}}
              >
                <div className="col-6 "> MODALIDAD DE REPAGO</div>
                <div className="col-6 text-center">
                  {" "}
                  MODALIDAD DE REPAGO OPTIMA
                </div>
                <br />
                <br />
              </Col>
              <Col
                className="col-12 row  "
                style={{display: "flex", alignItems: "center"}}
              >
                <div className="col-6 ">SEGMENTO</div>
                <div className="col-6 text-center">
                  DADO EL SEGMENTO, ASOCIADO CON POTENCIAL PARA VINCULCION DE
                  AHORRO A LA VISTA{" "}
                </div>
                <br />
                <br />
                <br />
                <br />
              </Col>
              <Col
                className="col-12 row  "
                style={{display: "flex", alignItems: "center"}}
              >
                <div className="col-6 ">
                  CUOTA DE AHORRO SE AJUSTA A REBAJO DE PLANILLA
                </div>
                <div className="col-3 offset-3 text-center">$ 2.142.879,92</div>
                <br />
                <br />
                <br />
              </Col>
              <Col
                className="col-12 row"
                style={{display: "flex", alignItems: "center"}}
              >
                <div className="col-6 ">HISTORIAL LABORAL</div>
                <div className="col-6 text-center">
                  {" "}
                  HISTORIAL LABORAL OPTIMO
                </div>
                <br />
                <br />
              </Col>
              <Col
                className="col-12 row"
                style={{display: "flex", alignItems: "center"}}
              >
                <div className="col-6 ">GARANTIA</div>
                <div className="col-6 text-center">
                  {" "}
                  DADO LA GARANTIA, ES IMPORTANTE VINCULAR AL ASOCIADO CON OTROS
                  PRODUCTOS
                </div>
              </Col>
            </CardBody>{" "}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
