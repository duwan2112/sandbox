import {useState, useEffect, useContext} from "react";
import {Alert, User} from "../../components/contexts";
import Head from "next/head";
import Link from "next/link";
import ReactLoading from "react-loading";
import Layout from "../../components/layout";
import {putAsync, getAsync} from "../../utils/server";
import Router from "next/router";

import InitialLoad from "../../components/InitialLoad";
import Dash from "../../components/Dashboard";
import Footer from "../../components/layout/Footer";

import {server} from "../../utils";

const Dashboard = () => {
  const {setToast} = useContext(Alert.AlertContext);
  const {user: userInfo} = useContext(User.UserContext);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({});
  const [websiteCompleted, setWebsiteCompleted] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const submitFormData = async (formData, index) => {
    const {
      questions,
      basic,
      clients,
      howItWorks,
      lawyers,
      welcomeScreen,
      solvedCases,
      blogs,
      areas,
    } = formData;
    if (
      !questions ||
      !basic ||
      !clients ||
      !howItWorks ||
      !lawyers ||
      !welcomeScreen
    ) {
      setToast(
        "No se ha podido guardar su web. Compruebe que a rellenado todos los campos obligatorios correctamente",
        "danger2"
      );
    } else {
      const {ok, data} = await putAsync("/users/website", formData);
      if (ok && !data.isCompleted) {
        if (index === 2 || index === 1) {
          setToast(
            "No se ha podido guardar su web. Compruebe que a rellenado todos los campos obligatorios correctamente",
            "danger"
          );
        } else
          setToast(
            "Tu sitio web ha sido guardado con exito! continua rellenando los campos",
            "success"
          );
      } else if (ok && data.isCompleted) {
        setToast(
          "Felicidades!, has completado la informacion necesaria para publicar tu sitio web",
          "success"
        );
        setTimeout(async () => {
          await setInitialValues(data);
          window.scrollTo(0, 0);
          setWebsiteCompleted(true);
        }, 3000);
      } else if (!ok) {
        setToast(data);
      }
    }
  };

  useEffect(() => {
    const getWebsiteData = async () => {
      let urlParams = new URLSearchParams(window.location.search);
      let userid = urlParams.get("userid");

      if (userid) {
        setUserId(userid);
      }

      const response = await server.getAsync("/auth/session");

      if (!response.data.emailVerified) return Router.push("/verify");

      const {data} = await getAsync(
        `/users/website${userid ? `/${userid}` : ""}`
      );
      if (data.user.role === "admin" && !userid) {
        Router.push("/dashboard/admin");
      }

      setWebsiteCompleted(data.initialValues.isCompleted);
      setInitialValues(data.initialValues);
      setUser(data.user);
      setLoading(false);
    };

    getWebsiteData();
  }, []);

  return (
    <>
      <Head>
        <title>Hifive | Marketing para abogados</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Layout websiteUrl={initialValues.url}>
        {!loading ? (
          <>
            {websiteCompleted ? (
              <>
                <Dash
                  submitFormData={submitFormData}
                  initialValues={initialValues}
                  user={user}
                  userid={userId}
                />
                {user && user.role === "admin" && (
                  <div className="container text-center mb-5">
                    <Link href="/dashboard/admin">
                      <a className="btn btn-link btn-link--black">
                        Panel de Administración
                      </a>
                    </Link>
                  </div>
                )}

                <Footer english />
              </>
            ) : (
              <InitialLoad
                submitFormData={submitFormData}
                initialValues={initialValues}
              />
            )}
          </>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{height: "100vh"}}
          >
            <ReactLoading
              type="spin"
              color="var(--color-primary)"
              height={50}
              width={50}
            />
          </div>
        )}
      </Layout>
    </>
  );
};

export default Dashboard;
