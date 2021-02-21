import Head from "next/head";
import styled from "styled-components";
import ReactLoading from "react-loading";
import Router from "next/router";
import Layout from "../../../components/layout";
import {server} from "../../../utils/";

const Container = styled.div`
  padding-bottom: 40px;
  .back-arrow {
    width: 3.1rem;
  }

  .fixed {
    position: fixed;
    max-width: 27rem;
    margin: 10px auto;
    left: 0;
    right: 0;
    bottom: 0;
    @media ${(props) => props.theme.mediaQueries.medium} {
      position: fixed;
      bottom: 0;
      max-width: 37rem;
      right: 0;
      left: inherit;
      margin: 10px;
    }
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
    if (!this.state.isLoading) {
      if (this.submitForm) {
        this.setState({isLoading: true});
        await this.submitForm();
        this.setState({isLoading: false});
      }
      if (this.props.userid) {
        return Router.push(`/dashboard?userid=${this.props.userid}`);
      }
      Router.push("/dashboard");
    }
  };

  bindForm = (submitForm) => {
    this.submitForm = submitForm;
  };

  render() {
    const {Form, title, initialValues, visible, userid} = this.props;
    const {isLoading} = this.state;

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
                src={require("../../../public/static/back-arrow.png")}
                onClick={async () => {
                  await this.handleSubmitForm();
                  if (this.props.userid) {
                    return Router.push(
                      `/dashboard?userid=${this.props.userid}`
                    );
                  }
                  Router.push("/dashboard");
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
                visible={visible}
                userid={userid}
              />
            ) : (
              ""
            )}

            <div className="mt-5 mb-5">
              <button
                className=" fixed btn btn-gradient-primary btn-block btn-shadow d-flex justify-content-center"
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
  const {data} = await require("./index");

  const {id, userid} = ctx.query;

  const pageData = data.find((page) => page.slug === id);

  if (pageData) {
    const website = await server.getAsync(
      `/users/website${userid ? `/${userid}` : ""}`
    );

    if (!website.data.initialValues) {
      ctx.res.redirect("/dashboard");
    }

    if (website) {
      return {
        ...pageData,
        visible: website.data.initialValues.visible,
        initialValues: website.data.initialValues[pageData.key],
        userid: userid,
      };
    }
  }
  ctx.res.redirect("/dashboard");
};

export default Single;
