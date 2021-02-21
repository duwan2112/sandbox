import React from "react";
import {Container, Card, CardBody, Row, Col} from "reactstrap";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PersonIcon from "@material-ui/icons/Person";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import FontAwesome from "react-fontawesome";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faHandHoldingUsd,
  faPercentage,
} from "@fortawesome/free-solid-svg-icons";
import {Pie, PieChart, ResponsiveContainer} from "recharts";
export default function StepOne({animation}) {
  const data01 = [
    {value: 3.5, fill: "#007BFF"},
    {value: 100, fill: "#eeeeee"},
  ];
  const data02 = [
    {value: 5.18, fill: "#FF4861"},
    {value: 100, fill: "#eeeeee"},
  ];
  return (
    <Container
      className={`dashboard step__cards ${animation && "step__animation"}`}
    >
      <h3 className="page-title color__background pb-2 text-center">
        DATOS GENERALES
      </h3>
      <Row style={{justifyContent: "center"}}>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body ">
              <div className="card__title">
                <h5 className="bold-text ">FECHA DE SOLICITUD</h5>{" "}
                <p className=" dashboard__total-stat ">09/02/2021</p>
                <div className="icon__card">
                  <CalendarTodayIcon />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">CAMPAÑA</h5>{" "}
                <p className=" dashboard__total-stat">PREAPROBADOS</p>{" "}
                <div className="icon__card">
                  <AccountBalanceWalletIcon />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">CODIGO CAMPAÑAS</h5>{" "}
                <p className=" dashboard__total-stat">ENE GRUPO S K4</p>{" "}
                <div className="icon__card">
                  <ReceiptIcon />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">ASESOR</h5>{" "}
                <p className=" dashboard__total-stat">JUAN PERE Z</p>{" "}
                <div className="icon__card">
                  <PersonIcon />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">REGION CORPORATIVA</h5>
                <p className=" dashboard__total-stat">
                  CORPORATIVO COMERCIAL
                </p>{" "}
                <div className="icon__card">
                  <AccountBalanceIcon />
                </div>
              </div>{" "}
            </CardBody>
          </Card>
        </Col>

        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">AGENCIA</h5>
                <p className=" dashboard__total-stat">
                  VENTAS CENTRALIZADAS
                </p>{" "}
                <div className="icon__card">
                  <AttachMoneyIcon />
                </div>{" "}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <h3 className="page-title color__background-2  pt-3  text-center">
        TASAS
      </h3>
      <Row style={{justifyContent: "center"}} className="pb-5">
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">TASA BANCARIA PASIVA</h5>{" "}
                <div className="dashboard__weekly-stat-chart-item m-auto">
                  <div className="dashboard__weekly-stat-chart-pie">
                    <ResponsiveContainer>
                      <PieChart className="dashboard__weekly-stat-chart-pie-wrapper">
                        <Pie
                          data={data01}
                          dataKey="value"
                          cx={44}
                          cy={47}
                          innerRadius={35}
                          outerRadius={44}
                          startAngle={180}
                          endAngle={-180}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <p className="dashboard__weekly-stat-label">3,50%</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5 className="bold-text">TIPO DE CAMBIO BCCR</h5>{" "}
                <p className=" dashboard__total-stat">606,00</p>
                <div className="icon__card">
                  <FontAwesomeIcon icon={faHandHoldingUsd} />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title text-center">
                <h5 className="bold-text">TASA TRI 12 MESES</h5>{" "}
                <div className="dashboard__weekly-stat-chart-item m-auto">
                  <div className="dashboard__weekly-stat-chart-pie">
                    <ResponsiveContainer>
                      <PieChart className="dashboard__weekly-stat-chart-pie-wrapper">
                        <Pie
                          data={data02}
                          dataKey="value"
                          cx={44}
                          cy={47}
                          innerRadius={35}
                          outerRadius={44}
                          startAngle={180}
                          endAngle={-180}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <p className="dashboard__weekly-stat-label">5,18%</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
