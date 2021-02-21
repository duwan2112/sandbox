import Head from "next/head";
import Layout from "../../../../components/layout";
import { server } from "../../../../utils";
import Manager from "../../../../components/Manager";

const Panel = ({ values, userid }) => {
  return (
    <>
      <Head>
        <title>Hifive | Marketing para abogados</title>
      </Head>
      <Layout>
        <Manager initialValues={values} userid={userid} />
      </Layout>
    </>
  );
};

Panel.getInitialProps = async (ctx) => {
  const { userid } = ctx.query;

  const { ok, data } = await server.getAsync(`/users/website/${userid}`);

  if (!ok) ctx.res.redirect("/dashboard");

  return {
    values: data.initialValues,
    userid,
  };
};

export default Panel;
