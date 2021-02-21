import React from "react";
import {Container, Card, CardBody, Row, Col} from "reactstrap";
export default function StepSeven({animation}) {
  return (
    <Container
      fluid={true}
      className={`pb-5 dashboard step__cards ${animation && "step__animation"}`}
    >
      <h3 className="page-title pb-4 color__background text-center">
        Datos Actividad Economica
      </h3>
      <Row>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">Fecha de inicio de labores</h5>{" "}
                <p className="pt-3  dashboard__total-stat">09/02/2021</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">Antiguedad Laboral</h5>{" "}
                <p className="pt-3  dashboard__total-stat">12.1</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">Antiguedad Laboral</h5>{" "}
                <p className="pt-3  dashboard__total-stat">1.0</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">Profesion</h5>{" "}
                <p className="pt-3  dashboard__total-stat">
                  Tecnico Profecional
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">Cantidad proximada</h5>{" "}
                <p className="pt-3  dashboard__total-stat">200 empls o mas</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">Tipo de empresa</h5>{" "}
                <p className="pt-3  dashboard__total-stat">CORPORATIVA</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">Tipo de industria</h5>{" "}
                <p className="pt-3  dashboard__total-stat">Servicios</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">Tipo Actividad Economica</h5>{" "}
                <p className="pt-3  dashboard__total-stat">SALUD</p>
              </div>
            </CardBody>
          </Card>
        </Col>{" "}
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">Segmento</h5>{" "}
                <p className="pt-3  dashboard__total-stat">Asalario Publico</p>
              </div>
            </CardBody>
          </Card>
        </Col>{" "}
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">Nombre Empresa / Institucion</h5>{" "}
                <p className="pt-3  dashboard__total-stat">
                  Ministro de obras publicas y transporte
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>{" "}
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">
                  Sucursal / Region / Area / Seccion
                </h5>{" "}
                <p className="pt-3  dashboard__total-stat">
                  La Sabana Oficinas Centrales
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>{" "}
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">Telefono / Oficina / Extension</h5>{" "}
                <p className="pt-3  dashboard__total-stat">2211-3000 / 1345</p>
              </div>
            </CardBody>
          </Card>
        </Col>{" "}
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">Email Trabjo</h5>{" "}
                <p className="pt-3  dashboard__total-stat">
                  juancarlos@ccss.sa
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>{" "}
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">
                  Empresa afiliada a deduccion de planilla
                </h5>{" "}
                <p className="pt-3  dashboard__total-stat">Si</p>
              </div>
            </CardBody>
          </Card>
        </Col>{" "}
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">
                  Codigo Empresa Afiliada a Deduccion de Plantilla
                </h5>{" "}
                <p className="pt-3  dashboard__total-stat">
                  A 2500 // Acueductos a alcantarillados
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>{" "}
      </Row>
    </Container>
  );
}
