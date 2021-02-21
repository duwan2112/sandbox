import Head from "next/head";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Layout from "../../../components/layout";
import { server } from "../../../utils";
import { BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";

const ButtonsContainer = styled.div`
  max-width: 40rem;
  margin: 0 auto;
`;

const TimesButton = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TimeButton = styled.button`
  font-family: var(--poppins);
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: ${(props) =>
    props.selected ? `var(--color-white)` : `var(--color-black)`};
  padding: 1em 2em;
  background: ${(props) =>
    props.selected ? `var(--color-primary)` : `rgba(238, 238, 238, 0.29)`};
  border: none;
  &:not(:last-child) {
    margin-left: 2px;
  }

  &:focus {
    outline: none;
  }
`;

const Container = styled.div`
  max-width: 35rem;
  margin-left: auto;
  margin-right: auto;
`;

const chartData = [
  { name: "Día 1", cantidad: 99.99 },
  { name: "Día 2", cantidad: 0 },
  { name: "Día 3", cantidad: 0 },
  { name: "Día 4", cantidad: 79.99 },
  { name: "Día 5", cantidad: 0 },
  { name: "Día 6", cantidad: 0 },
  { name: "Día 7", cantidad: 0 },
  { name: "Día 8", cantidad: 0 },
  { name: "Día 9", cantidad: 0 },
  { name: "Día 10", cantidad: 0 },
  { name: "Día 11", cantidad: 0 },
  { name: "Día 12", cantidad: 0 },
  { name: "Día 13", cantidad: 0 },
  { name: "Día 14", cantidad: 0 },
  { name: "Día 15", cantidad: 0 },
  { name: "Día 16", cantidad: 0 },
  { name: "Día 17", cantidad: 0 },
  { name: "Día 18", cantidad: 0 },
  { name: "Día 19", cantidad: 0 },
  { name: "Día 20", cantidad: 0 },
  { name: "Día 21", cantidad: 0 },
  { name: "Día 22", cantidad: 0 },
  { name: "Día 23", cantidad: 0 },
  { name: "Día 24", cantidad: 0 },
  { name: "Día 25", cantidad: 0 },
  { name: "Día 26", cantidad: 0 },
  { name: "Día 27", cantidad: 0 },
  { name: "Día 28", cantidad: 0 },
  { name: "Día 29", cantidad: 0 },
  { name: "Día 30", cantidad: 0 },
  { name: "Día 31", cantidad: 0 },
];

const chartData2 = [
  { name: "Enero", cantidad: 0 },
  { name: "Febrero", cantidad: 0 },
  { name: "Marzo", cantidad: 149.98 },
  { name: "Abril", cantidad: 199.98 },
  { name: "Mayo", cantidad: 79.99 },
  { name: "Junio", cantidad: 79.99 },
  { name: "Julio", cantidad: 179.98 },
  { name: "Agosto", cantidad: 0 },
  { name: "Septiembre", cantidad: 0 },
  { name: "Octubre", cantidad: 0 },
  { name: "Noviembre", cantidad: 0 },
  { name: "Diciembre", cantidad: 0 },
];

const Stats = () => {
  const [dataType, setSelectedData] = useState("users");
  const [time, setTime] = useState("years");
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const getArray = () => {
    if (!data) return;

    if (time === "years") return data[dataType].years;
    else if (time == "months") return data[dataType].months;
    else if (time == "days") return data[dataType].days;
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { ok, data } = await server.getAsync("/admin/stats");
      if (ok) {
        setData(data);
      }
    };
    fetchData();
    setLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Hifive | Panel de Administracion</title>
      </Head>
      <Layout>
        <Container className="container">
          <div className="mt-5">
            <h1 className="heading">
              Panel de
              <br />
              <strong>Administración</strong>
            </h1>
          </div>
          <div className="mt-2">
            <h1 className="heading" style={{ marginTop: "2rem" }}>
              Estadísticas
              <br />
              <strong className="heading--gray">Globales</strong>
            </h1>
          </div>
          <ButtonsContainer className="mb-5">
            <div className="mb-5">
              <button
                className={`btn btn-block ${
                  dataType === "users" ? "btn-primary" : "btn-outlined-primary"
                }`}
                onClick={() => setSelectedData("users")}
              >
                Nuevos Usuarios
              </button>
            </div>
            <div className="mb-5">
              <button
                className={`btn btn-block ${
                  dataType === "subs" ? "btn-primary" : "btn-outlined-primary"
                }`}
                onClick={() => setSelectedData("subs")}
              >
                Nuevos Suscriptores
              </button>
            </div>
            <div>
              <button
                className={`btn btn-block ${
                  dataType === "churn" ? "btn-primary" : "btn-outlined-primary"
                }`}
                onClick={() => setSelectedData("churn")}
              >
                Nuevos Usuarios Abandono
              </button>
            </div>
            <div className="mt-5">
              <button
                className={`btn btn-block ${
                  dataType === "income" ? "btn-primary" : "btn-outlined-primary"
                }`}
                onClick={() => setSelectedData("income")}
              >
                Ingresos de Suscriptores
              </button>
            </div>
          </ButtonsContainer>
          <TimesButton>
            <TimeButton
              selected={time === "years"}
              onClick={() => setTime("years")}
            >
              Años
            </TimeButton>
            <TimeButton
              selected={time === "months"}
              onClick={() => setTime("months")}
            >
              Meses
            </TimeButton>
            <TimeButton
              selected={time === "days"}
              onClick={() => setTime("days")}
            >
              Dias
            </TimeButton>
          </TimesButton>

          {!loading && (
            <BarChart width={300} height={250} data={getArray()}>
              <XAxis dataKey="name" />
              <YAxis width={40} />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#5591F5" />
            </BarChart>
          )}
        </Container>
      </Layout>
    </>
  );
};

// Stats.getInitialProps = async (ctx) => {

// };

export default Stats;
