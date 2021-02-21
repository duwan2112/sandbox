import Head from "next/head";
import styled from "styled-components";
import ReactLoading from "react-loading";
import Router from "next/router";
import {v4 as uuidv4} from "uuid";
import Layout from "../../../components/layout";
import {server} from "../../../utils";
import {BlogsUpdate} from "../../../components/blocks/dashboard/forms/Blogs";
import {useState} from "react";
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

const removeDuplicates = (data) => {
  return data.filter((value, index) => data.indexOf(value) === index);
};

const getIndexOfValue = (arr, area, question) => {
  return arr.findIndex(
    (item) => item.area === area && item.question === question
  );
};

const Item = ({
  data,
  name,
  placeholderKey,
  selectFunction,
  setDeleteItem,
  deleteItemId,
  changeArea,
}) => {
  const isDelete = data.id ? data.id === deleteItemId : false;

  const [valueData, setValueData] = useState(data);

  const handleChange = (e) => {
    if (!placeholderKey) {
      setValueData(e.target.value);
      changeArea(e.target.value, data);
    }
  };

  return (
    <>
      <div className="form-group">
        <label className="text-capitalize mb-3">{name}</label>
        <input
          onChange={handleChange}
          className={`form-control 
            ${isDelete ? `form-control--error` : ""}
          `}
          type="text"
          value={placeholderKey ? data[placeholderKey] : valueData}
        />
        <div className="d-flex justify-content-between mt-3 pl-4 pr-4">
          <a
            role="button"
            className="btn-link btn-link--form "
            onClick={() => selectFunction(placeholderKey ? data : valueData)}
          >
            Editar {name}
          </a>
          {placeholderKey && (
            <a
              role="button"
              className="btn-link btn-link--black btn-link--form"
              onClick={() => setDeleteItem(data.id)}
            >
              {isDelete ? "Cancelar" : "Borrar"}
            </a>
          )}
        </div>
      </div>
    </>
  );
};

class Blogs extends React.Component {
  state = {
    loading: false,
    isFormOpen: false,
    selectedArea: "",
    selectedItem: null,
    formValues: null,
    deleteItem: null,
    values: [],
    areas: [],
    changeArea: null,
    flag: true,
  };

  submitForm = null;

  handleChangeArea = (data, oldData) => {
    this.setState({
      changeArea: this.state.changeArea.map((area) => {
        if (area.area === oldData) {
          area.changeArea = data.trim();
        }
        return area;
      }),
      flag: false,
    });
    this.editAreas(this.state.changeArea);
  };

  handleSubmitForm = async () => {
    if (!this.state.isFormOpen) {
      if (!this.state.flag) {
        await this.onFormSubmit("hello", "none");
      }
      if (this.props.userid) {
        return Router.push(`/dashboard?userid=${this.props.userid}`);
      }
      Router.push("/dashboard");
      return;
    }

    if (this.submitForm) {
      this.submitForm();
    }
  };

  bindSubmitForm = (submitForm) => {
    this.submitForm = submitForm;
  };

  // Initializing the values

  initArrays = (initialValues) => {
    this.setState({
      values: new Array(...initialValues),
      changeArea: new Array(
        ...removeDuplicates(
          initialValues.map((blog) => {
            const areaNew = {area: blog.area, changeArea: blog.area};
            return areaNew;
          })
        )
      ),
      areas: new Array(
        ...removeDuplicates(initialValues.map((blog) => blog.area))
      ),
    });
  };

  componentDidMount = () => {
    const {initialValues} = this.props;
    this.props.initialValues.forEach((value) => {
      if (!value.id) {
        value.id = uuidv4();
      }
    });
    this.initArrays(initialValues);
  };

  toggleForm = () => {
    this.setState({
      areas: new Array(
        ...removeDuplicates(
          this.state.changeArea.map((blog) => blog.changeArea)
        )
      ),
      changeArea: new Array(
        ...removeDuplicates(
          this.state.changeArea.map((blog) => {
            blog.area = blog.changeArea;
            return blog;
          })
        )
      ),
    });

    if (!this.state.isFormOpen) {
      if (!this.state.selectedArea) {
        this.setState({formValues: null, isFormOpen: true});
      } else if (this.state.selectedArea && !this.state.selectedItem) {
        this.setState({
          formValues: {
            area: this.state.selectedArea,
            question: "",
            answer: "",
          },
          isFormOpen: true,
        });
      } else if (this.state.selectedArea && this.state.selectedItem) {
        this.setState({
          formValues: {...this.state.selectedItem},
          isFormOpen: true,
        });
      }
    } else {
      this.setState({
        formValues: null,
        isFormOpen: false,
        selectedItem: null,
      });
    }
  };

  selectArea = (area) => {
    this.setState({
      selectedArea: area,
      areas: new Array(
        ...removeDuplicates(
          this.state.changeArea.map((blog) => blog.changeArea)
        )
      ),
      changeArea: new Array(
        ...removeDuplicates(
          this.state.changeArea.map((blog) => {
            blog.area = blog.changeArea;
            return blog;
          })
        )
      ),
    });
  };

  selectItem = async (item) => {
    await this.setState({
      selectedItem: item,
      deleteItem: null,
    });
    this.toggleForm();
  };

  selectDeleteItem = (data) => {
    if (data === this.state.deleteItem) {
      this.setState({deleteItem: null});
    } else {
      this.setState({deleteItem: data});
    }
  };

  // FORM AND DATA HANDLING
  editItem = (data) => {
    const index = this.props.initialValues.findIndex(
      (blog) => blog.id === this.state.selectedItem.id
    );
    data.id = this.state.selectedItem.id;
    this.props.initialValues[index] = data;
  };

  removeItem = (pos) => {
    this.props.initialValues.splice(pos, 1);
  };

  addItem = (data) => {
    this.props.initialValues.splice(0, 0, data);
  };

  editAreas = (data) => {
    const valuesNew = this.props.initialValues.map((value, index) => {
      value.area = data[index].changeArea;
      return value;
    });
  };

  onFormSubmit = async (data, operation) => {
    this.setState({loading: true});

    if (operation === "create") {
      data.id = uuidv4();
      this.addItem(data);
    } else if (operation === "update") {
      this.editItem(data);
    } else if (operation === "remove") {
      const index = this.props.initialValues.findIndex(
        (blog) => blog.id === data
      );
      this.removeItem(index);
    } else if (operation === "none") {
      this.editAreas(this.state.changeArea);
    }

    const {ok, data: information} = await server.putAsync(
      `/users/website/sections${
        this.props.userid ? `/${this.props.userid}` : ""
      }`,
      {
        data: operation === "none" ? this.props.initialValues : data,
        type: operation,
        filter: "blogs",
      }
    );

    console.log(ok);
    console.log(information);

    if (ok) {
      if (operation === "remove") {
        this.setState({
          deleteItem: null,
        });
      }

      if (
        this.props.initialValues.filter(
          (item) => item.area === this.state.selectedArea
        ).length <= 0
      ) {
        this.setState({
          selectedArea: null,
        });
      }

      this.props.initialValues.forEach((value) => {
        if (!value.id) {
          value.id = uuidv4();
        }
      });
      this.initArrays(this.props.initialValues);
    }

    if (this.state.isFormOpen) this.toggleForm();

    this.setState({loading: false});
  };

  render() {
    const {
      loading,
      isFormOpen,
      selectedItem,
      deleteItem,
      selectedArea,
    } = this.state;

    return (
      <Layout hideHeader={screen.width <= 786}>
        <Head>
          <title>Hifive | Marketing para abogados</title>
        </Head>
        <Container className="container">
          {/* NATIVE BACK ARROW */}

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

          {/* HEADING */}
          <div className="form-container">
            <div className="load__row mb-4">
              <h1 className="heading">
                Edita la sección
                <br />
                <strong className="heading--blue">nuestro blog</strong>
              </h1>
            </div>

            {/* OPEN THE FORM */}
            {!isFormOpen ? (
              <>
                <div>
                  <button
                    className="btn btn-primary btn-block"
                    onClick={this.toggleForm}
                  >
                    Añadir {!selectedArea ? "área" : "entrada"}
                  </button>
                </div>

                {selectedArea ? (
                  <>
                    <div className="d-flex text-center mt-5">
                      <div className="invisible mr-auto">ajskdja</div>

                      <p className="text">{selectedArea}</p>
                      <a
                        role="button"
                        className="btn-link ml-auto"
                        onClick={() => {
                          this.setState({
                            selectedArea: "",
                            deleteItem: null,
                          });
                        }}
                      >
                        volver
                      </a>
                    </div>

                    <ul>
                      {this.state.values
                        .filter((value) => value.area === selectedArea)
                        .map((item) => (
                          <Item
                            key={item.id}
                            selectFunction={this.selectItem}
                            setDeleteItem={this.selectDeleteItem}
                            deleteItemId={this.state.deleteItem}
                            placeholderKey="question"
                            data={item}
                            name="entrada"
                          />
                        ))}
                    </ul>
                  </>
                ) : (
                  <ul className="mt-5">
                    {this.state.areas.map((value, index) => (
                      <Item
                        key={value}
                        data={value}
                        name={"área"}
                        selectFunction={this.selectArea}
                        changeArea={this.handleChangeArea}
                      />
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <>
                <div className="d-flex text-center">
                  <div className="invisible mr-auto">ajskdja</div>
                  <p className="text">
                    {selectedItem ? "Editar" : "Nueva"}{" "}
                    {!selectedArea ? "área" : "entrada"}
                  </p>
                  <a
                    role="button"
                    className="btn-link btn-link--danger ml-auto"
                    onClick={this.toggleForm}
                  >
                    cancelar
                  </a>
                </div>
                <BlogsUpdate
                  initialValues={this.state.formValues}
                  onFormSubmit={this.onFormSubmit}
                  bindSubmitForm={this.bindSubmitForm}
                />
              </>
            )}

            {/* BUTTONS SECTION */}
            <div className="mt-5 mb-5">
              {deleteItem != null ? (
                <button
                  className="fixed btn btn-black btn-block btn-shadow d-flex justify-content-center"
                  type="submit"
                  onClick={() => {
                    this.onFormSubmit(deleteItem, "remove");
                  }}
                >
                  {loading ? (
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
                  {this.state.areas.length >= 0 || isFormOpen || loading ? (
                    <button
                      className="fixed btn btn-gradient-primary btn-block btn-shadow d-flex justify-content-center"
                      type="submit"
                      onClick={this.handleSubmitForm}
                      disabled={loading}
                    >
                      {loading ? (
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

Blogs.getInitialProps = async (ctx) => {
  const {userid} = ctx.query;
  const {ok, data} = await server.getAsync(
    `/users/website${userid ? `/${userid}` : ""}`
  );
  if (ok) {
    return {initialValues: data.initialValues.blogs, userid: userid};
  }

  ctx.res.redirect("/dashboard");
};

export default Blogs;
