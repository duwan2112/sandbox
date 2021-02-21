import Head from "next/head";
import styled from "styled-components";
import ReactLoading from "react-loading";
import Router from "next/router";
import Layout from "../../../../../components/layout";
import { server } from "../../../../../utils";

const Container = styled.div`
  .back-arrow {
    width: 3.1rem;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    max-width: 67rem;
    padding-bottom: 3rem;
  }
`;

class Single extends React.Component {
  state = {
    isLoading: false,
  };

  submitForm = null;

  handleSubmitForm = async () => {
    if (this.submitForm && !this.state.isLoading) {
      this.setState({ isLoading: true });
      await this.submitForm();
      this.setState({ isLoading: false });
    }
  };

  bindForm = (submitForm) => {
    this.submitForm = submitForm;
  };

  render() {
    const { Form, title, initialValues, userid } = this.props;

    const { isLoading } = this.state;

    return (
      <Layout hideHeader={screen.width < 768}>
        <Head>
          <title>Hifive | Marketing para abogados</title>
        </Head>
        <Container className="container">
          <div className="mt-5 mb-5 d-md-none">
            <a>
              <img
                className="back-arrow"
                src={require("../../../../../public/static/back-arrow.png")}
                onClick={async () => {
                  await this.handleSubmitForm();
                  Router.push("/dashboard/admin");
                }}
              />
            </a>
          </div>
          <div className="form-container">
            <div className="load__row mb-4">
              <h1 className="heading">
                Edita la sección
                <br />
                <strong className="heading--blue">{title}</strong>
              </h1>
            </div>
            {Form ? (
              <Form
                bindSubmitForm={this.bindForm}
                initialValues={initialValues}
                userid={userid}
              />
            ) : (
              ""
            )}

            <div className="mt-5 mb-5">
              <button
                className="btn btn-gradient-primary btn-block btn-shadow d-flex justify-content-center"
                type="submit"
                disabled={isLoading}
                onClick={this.handleSubmitForm}
              >
                {isLoading ? (
                  <ReactLoading
                    type="spin"
                    color={"currentColor"}
                    height={30}
                    width={30}
                  />
                ) : (
                  "Guardar"
                )}
              </button>
            </div>
          </div>
        </Container>
      </Layout>
    );
  }
}

Single.getInitialProps = async (ctx) => {
  const { data } = await require("./index");

  const { id, userid } = ctx.query;

  if (!userid) {
    ctx.res.redirect("/dashboard");
  }

  const pageData = data.find((page) => page.slug === id);

  if (pageData) {
    const website = await server.getAsync(`/users/website/${userid}`);

    if (!website.data.initialValues) {
      ctx.res.redirect("/dashboard");
    }

    if (website) {
      return {
        ...pageData,
        initialValues: website.data.initialValues[pageData.key],
        userid,
      };
    }
  }
  ctx.res.redirect("/dashboard");
};

export default Single;
