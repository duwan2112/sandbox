import Head from "next/head";
import styled from "styled-components";
import ReactLoading from "react-loading";
import Router from "next/router";
import Link from "next/link";
import {v4 as uuidv4} from "uuid";
import Layout from "../../../components/layout";
import {server} from "../../../utils";
import {Alert} from "../../../components/contexts";

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
  }
`;

const Item = ({
  item,
  name,
  placeholderKey,
  selectItem,
  setDeleteItem,
  deleteItemIndex,
  index,
}) => {
  const isDelete = index === deleteItemIndex;
  return (
    <>
      <div className="form-group">
        <label className="text-capitalize mb-3">{name}</label>
        <input
          className={`form-control 
            ${isDelete ? "form-control--error" : ""}
          `}
          type="text"
          readOnly={true}
          value={item[placeholderKey]}
        />
        <div className="d-flex justify-content-between mt-3 pl-4 pr-4">
          <a
            role="button"
            className="btn-link btn-link--form "
            onClick={() => selectItem({data: item, index})}
          >
            Editar {name}
          </a>
          <a
            role="button"
            className="btn-link btn-link--black btn-link--form"
            onClick={() => setDeleteItem(index)}
          >
            {isDelete ? "Cancelar" : "Borrar"}
          </a>
        </div>
      </div>
    </>
  );
};

class PageArray extends React.Component {
  static contextType = Alert.AlertContext;

  state = {
    isLoading: false,
    isFormOpen: false,
    selectedItem: {data: null, index: null},
    deleteItem: null,
    setToast: null,
  };

  submitForm = null;

  handleSubmitForm = () => {
    if (!this.state.isFormOpen) {
      if (this.props.userid) {
        return Router.push(`/dashboard?userid=${this.props.userid}`);
      }

      return Router.push("/dashboard");
    } else if (this.submitForm) {
      this.submitForm();
    }
  };

  bindSubmitForm = (submitForm) => {
    this.submitForm = submitForm;
  };

  selectItem = (item) => {
    this.setState({
      selectedItem: {...item},
      isFormOpen: true,
      deleteItem: null,
    });
  };

  setDeleteItem = (index) => {
    if (index === this.state.deleteItem) this.setState({deleteItem: null});
    else this.setState({deleteItem: index});
  };

  closeForm = () => {
    this.setState({
      selectedItem: {data: null, index: null},
      isFormOpen: false,
    });
  };

  componentDidMount = () => {
    const {setToast} = this.context;
    this.setState({setToast: setToast});
  };

  handleAddNew = () => {
    const {slug, initialValues} = this.props;

    if (slug === "lawyers" && this.props.user.sub) {
      const lawyers = initialValues.length;

      if (lawyers >= this.props.user.allowedLawyers) {
        this.state.setToast(
          "No puedes añadir mas abogados, te sugerimos cambiar tu plan"
        );
        return;
      }
    }

    this.setState({isFormOpen: true, deleteItem: null});
  };

  render() {
    const {isLoading, isFormOpen, selectedItem, deleteItem} = this.state;
    const {
      title,
      name,
      placeholderKey,
      slug,
      initialValues,
      Form,
      objectKey,
      userid,
    } = this.props;

    const editItem = (data) => {
      initialValues[selectedItem.index] = data;
    };

    const removeItem = (pos) => {
      initialValues.splice(pos, 1);
    };

    const addItem = (data) => {
      initialValues.splice(0, 0, data);
    };

    const onFormSubmit = async (data, operation) => {
      this.setState({isLoading: true});

      if (operation === "create") {
        addItem(data);
        this.closeForm();
      } else if (operation === "update") {
        editItem(data);
        this.closeForm();
      } else if (operation === "remove") {
        const copy = new Array(...initialValues);
        copy.splice(data, 1);
        await server.putAsync(`/users/website${userid ? `/${userid}` : ""}`, {
          [objectKey]: copy,
        });
        removeItem(data);
        this.setState({isLoading: false, deleteItem: null});
        return;
      }

      const {ok} = await server.putAsync(
        `/users/website${userid ? `/${userid}` : ""}`,
        {
          [objectKey]: initialValues,
        }
      );

      this.setState({isLoading: false});
    };

    return (
      <Layout hideHeader={screen.width <= 786}>
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
                  // await this.handleSubmitForm();
                  if (this.props.userid) {
                    Router.push(`/dashboard?userid=${this.props.userid}`);
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
            {!isFormOpen ? (
              <>
                <div>
                  <button
                    className="btn btn-primary btn-block"
                    onClick={this.handleAddNew}
                  >
                    Añadir {name}
                  </button>
                </div>
                {slug === "lawyers" ? (
                  <div className="mt-4 mb-5 text-center">
                    <Link href="/dashboard/book">
                      <a className="btn-link">Reservar sesión de fotos</a>
                    </Link>
                  </div>
                ) : null}
                <ul className="mt-5">
                  {initialValues.map((value, index) => (
                    <>
                      <Item
                        key={index}
                        index={index}
                        item={value}
                        name={name}
                        placeholderKey={placeholderKey}
                        selectItem={this.selectItem}
                        setDeleteItem={this.setDeleteItem}
                        deleteItemIndex={deleteItem}
                        onFormSubmit={onFormSubmit}
                      />
                    </>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <div className="d-flex text-center">
                  <div className="invisible mr-auto">ajskdja</div>
                  <p className="text">
                    {selectedItem.data ? "Editar" : "Nuevo"} {name}
                  </p>
                  <a
                    role="button"
                    className="btn-link btn-link--danger ml-auto"
                    onClick={this.closeForm}
                  >
                    cancelar
                  </a>
                </div>
                <Form
                  initialValues={selectedItem.data}
                  onFormSubmit={onFormSubmit}
                  bindSubmitForm={this.bindSubmitForm}
                />
              </>
            )}

            <div className="mt-5 mb-5">
              {deleteItem != null ? (
                <button
                  className="fixed btn btn-black btn-block btn-shadow d-flex justify-content-center"
                  type="submit"
                  onClick={() => {
                    onFormSubmit(deleteItem, "remove");
                  }}
                >
                  {isLoading ? (
                    <ReactLoading
                      type="spin"
                      color={"currentColor"}
                      height={30}
                      width={30}
                    />
                  ) : (
                    "Eliminar"
                  )}
                </button>
              ) : (
                <>
                  {initialValues.length > 0 || isFormOpen ? (
                    <button
                      className="fixed btn btn-gradient-primary btn-block btn-shadow d-flex justify-content-center"
                      type="submit"
                      onClick={this.handleSubmitForm}
                      disabled={isLoading}
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
                  ) : null}
                </>
              )}
            </div>
          </div>
        </Container>
      </Layout>
    );
  }
}

PageArray.getInitialProps = async (ctx) => {
  const {data} = await require("./index");
  const {id, userid} = ctx.query;
  console.log(userid);
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
        initialValues: website.data.initialValues[pageData.objectKey],
        user: website.data.user,
        userid: userid,
      };
    }
  }
  ctx.res.redirect("/dashboard");
};

export default PageArray;
