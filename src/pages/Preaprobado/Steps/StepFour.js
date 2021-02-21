import React from "react";
import {Container, Table, Card, CardBody, Row, Col} from "reactstrap";
export default function StepFour({animation}) {
  return (
    <Container
      fluid={true}
      className={`pb-4 dashboard step__cards ${animation && "step__animation"}`}
    >
      <h3 className="page-title pb-4 pt-3  color__background text-center">
        Detalle de Pasivos Externos (Deudas con el resto del SFN)
      </h3>
      <Card>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>Entidad</th>
                <th className="th__width">Tipo de Operacion</th>
                <th>ID Operacion</th>
                <th>c / $</th>
                <th>Saldo</th>
                <th className="th__width">Cuota Mensual</th>
                <th>FREC</th>
                <th>Tasa</th>
                <th>SBD</th>
                <th className="th__width-medium">Plazo para vencer</th>
                <th>VIV</th>
                <th>Condicion</th>
                <th className="th__width">Refinancia op con preaprobado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="step__card">BANGENCR</td>
                <td>3-TARJETA DE CREDITO</td>
                <td>4590100088599</td>
                <td>CRC</td>
                <td>616,889.68 $</td>
                <td>70,100.00 $</td>
                <td>4</td>
                <td>29.00 </td>
                <td>N</td>
                <td>33.7</td>
                <td>NO</td>
                <td>DEUDOR</td>
                <td style={{background: "rgba(76, 225, 182,.5)"}}>SI</td>
              </tr>
              <tr>
                <td>BANGENCR</td>
                <td>3-TARJET DE CREDITO</td>
                <td>4590100088599</td>
                <td>CRC</td>
                <td>616,889.68 $</td>
                <td>70,100.00 $</td>
                <td>4</td>
                <td>29.00 </td>
                <td>N</td>
                <td>33.7</td>
                <td>NO</td>
                <td>DEUDOR</td>
                <td style={{background: "rgba(76, 225, 182,.5)"}}>SI</td>
              </tr>
              <tr>
                <td>BANGENCR</td>
                <td>3-TARJET DE CREDITO</td>
                <td>4590100088599</td>
                <td>CRC</td>
                <td>616,889.68 $</td>
                <td>70,100.00 $</td>
                <td>4</td>
                <td>29.00 </td>
                <td>N</td>
                <td>33.7</td>
                <td>NO</td>
                <td>DEUDOR</td>
                <td style={{background: "rgba(76, 225, 182,.5)"}}>SI</td>
              </tr>
              <tr>
                <td>BANGENCR</td>
                <td>3-TARJET DE CREDITO</td>
                <td>4590100088599</td>
                <td>CRC</td>
                <td>616,889.68 $</td>
                <td>70,100.00 $</td>
                <td>4</td>
                <td>29.00 </td>
                <td>N</td>
                <td>33.7</td>
                <td>NO</td>
                <td>DEUDOR</td>
                <td
                  style={{
                    background: "rgba(76, 225, 182,.5)",
                  }}
                >
                  SI
                </td>
              </tr>
              <tr>
                <td>BANGENCR</td>
                <td>3-TARJET DE CREDITO</td>
                <td>4590100088599</td>
                <td>CRC</td>
                <td>616,889.68 $</td>
                <td>70,100.00 $</td>
                <td>4</td>
                <td>29.00 </td>
                <td>N</td>
                <td>33.7</td>
                <td>NO</td>
                <td>DEUDOR</td>
                <td style={{background: "rgba(76, 225, 182,.5)"}}>SI</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Card className="pt-3 font-card">
        <CardBody>
          <Row>
            {" "}
            <Col
              className="col-2 d-flex text-center  "
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span>
                {" "}
                <strong>
                  DETALLE CONSOLIDADO DE DEUDAS INTERNAS Y EXTERNAS
                </strong>{" "}
              </span>
            </Col>{" "}
            <Col className="col-2 text-right">
              <br />
              <span>SALDOS RESTO SFN</span>
              <br />
              <span>SALDO COOPEALINZA</span>
              <br />
              <br />

              <span>
                {" "}
                <strong>SALDOS TOTAL</strong>{" "}
              </span>
            </Col>{" "}
            <Col className="col-1 text-center">
              <span>SALDOS</span>
              <br />
              <span>$---</span>
              <br />
              <span>$---</span>
              <br />
              <br />

              <span>
                {" "}
                <strong>$---</strong>{" "}
              </span>
            </Col>{" "}
            <Col className="col-1 text-center">
              <span>CUOTAS</span>
              <br />
              <span>$---</span>
              <br />
              <span>$---</span>
              <br />
              <br />

              <span>
                {" "}
                <strong>$---</strong>{" "}
              </span>
            </Col>{" "}
            <Col className="col-2 text-center">
              <br />
              <span>CUOTAS RESTO SFN</span>
              <br />
              <span>CUOTAS COOPEALINZA</span>
              <br />
              <br />

              <span>
                {" "}
                <strong>CUOTAS TOTALES</strong>{" "}
              </span>
            </Col>{" "}
            <Col className="col-4 text-center">
              <br />
              <Row>
                {" "}
                <Col className="col-8 text-right">
                  {" "}
                  <strong>AHORRO PROYECTADO TOTAL</strong>{" "}
                </Col>
                <Col className="col-4"> $....</Col>{" "}
              </Row>

              <br />
              <Row>
                {" "}
                <Col className="col-8 text-right">
                  {" "}
                  <strong> % AHORRO</strong>{" "}
                </Col>
                <Col className="col-4"> 0.00%</Col>{" "}
              </Row>

              <br />
              <br />
            </Col>{" "}
          </Row>
          <Row className="pt-5">
            <Col className="col-4 text-center">
              <span>
                <strong>MONTO DE EXPOSICION MAXIM SIN FIADOR</strong>
              </span>
              <br />
              <br />
              <span>
                <strong>MONTO MAXIMO A FINANCIAR SIN FIDOR</strong>
              </span>
            </Col>
            <Col className="col-1 text-center">
              <span>----</span>
              <br />
              <br /> <span>----</span>
            </Col>
            <Col className="col-1 text-center">
              <span>----</span>
              <br />
              <br /> <span>----</span>
            </Col>
            <Col className="col-6 text-center">
              <span>
                <div
                  style={{
                    background: "rgba(76, 225, 182,.5)",
                    margin: "0 3rem",
                  }}
                >
                  EXPOSICION DENTRO DEL LIMITE PERMITIDO
                </div>
              </span>
              <br />

              <span>
                <div
                  style={{
                    background: "rgba(76, 225, 182,.5)",
                    margin: "0 3rem",
                  }}
                >
                  MONTO A FINANCIAR DENTRO DEL LIMITE PERMITIDO
                </div>
              </span>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}
