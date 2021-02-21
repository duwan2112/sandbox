import {useState, useEffect} from "react";
import styled from "styled-components";
import {v4 as uuidv4} from "uuid";
import {Triangle} from "./Components/svgs";
import {Link} from "react-scroll";
import Separation from "./Components/Separation";
import {MobileTitle} from "./Components/Typography";
import {Search} from "./Components/svgs";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Collapse, Card, CardBody} from "reactstrap";

const Container = styled.div`
  @media ${(props) => props.theme.mediaQueries.large} {
    max-width: 100rem;
    margin: 0 auto;
  }
`;

const Wrapper = styled.div`
  padding-bottom: 3rem;
  background: #f8f8f8;
  @media ${(props) => props.theme.mediaQueries.medium} {
    padding: 10rem 0;
    padding-top: 0;
  }
`;

const StyledCases = styled.div`
  .cases {
    width: 100%;
    padding: 1rem 1rem 1rem 0;

    border-radius: 1px;
    background: white;

    &:not(:last-child) {
      margin-bottom: 0;
      border-top: 1px solid #f0f0f0;
    }
    &--noborder {
      border: none;
    }

    &__icon {
      display: none;
    }

    &__title {
      display: flex;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 30px;
      padding: 7px 0 7px 20px;
      cursor: pointer;
      transition: opacity 0.3s ease-in;

      &:hover {
        opacity: 0.5;
      }
    }

    &__mob-icon {
      margin-left: auto;
    }

    &__text {
      font-style: normal;
      margin-top: 15px;
      margin-bottom: 15px;
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
      padding-left: 10px;
    }

    &__link {
      color: ${(props) =>
        `${
          props.color === "gray"
            ? "#5591F5"
            : `var(--color-website-${props.color})`
        }`} !important;

      &:hover {
        opacity: 0.5;
      }
    }
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    .cases {
      padding: 1rem 1rem;
      border: none;
      margin: 0;
      background: white;
      border-radius: 0;
      &:not(:last-child) {
        margin-bottom: 0;
        border-top: 1px solid #f0f0f0;
      }

      &__title {
        justify-content: space-between;
        font-size: 17px;
      }
      &__text {
        padding-left: 20px;
      }
      &__mob-icon {
        display: none;
      }

      &__icon {
        display: block;
        position: relative;
        margin-right: 20px;
        svg {
          transform: rotate(-90deg);
          transition: 0.1s ease-in;
        }
        &--open {
          svg {
            transform: rotate(0deg);
            transition: 0.1s ease-in;
          }
        }
      }
    }
  }
`;

const StyledCase = styled.div`
  background: #ffffff;
  border-radius: 3px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.03);
  padding: 1.5rem 0.5rem;

  .case {
    &__link {
      color: ${(props) =>
        `${
          props.color === "gray"
            ? "#5591F5"
            : `var(--color-website-${props.color})`
        }`} !important;

      &:hover {
        opacity: 0.5;
      }
    }

    &__title {
      margin-top: 1rem;
      font-size: 1.8rem;
      font-weight: 600;
    }

    &__honors {
    }

    &__area {
      font-size: 1.4rem;
      font-weight: 600;
    }

    &__text {
      margin-top: 1rem;
      white-space: pre-line;
      font-size: 1.4rem;
      font-weight: 400;
    }
  }
  @media ${(props) => props.theme.mediaQueries.medium} {
    padding: 2rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 30px;
  justify-content: start;

  @media ${(props) => props.theme.mediaQueries.medium} {
    justify-content: center;
  }
`;

const SearchWrapper = styled.div`
  flex-basis: 100%;
  max-width: 380px;
  padding: 14px 12px;
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.01);
  @media ${(props) => props.theme.mediaQueries.medium} {
    border-radius: 4px;
    max-width: 300px;
  }
`;

const SearchInput = styled.input`
  background: #f0f0f0;
  height: 100%;
  border: none;
  outline: none;
  font-size: 12px;
  margin-left: 10px;
  width: 100%;

  &,
  &::placeholder {
    font-weight: 600;
  }

  &:focus {
    border: none;
    outline: none;
  }
`;

const SearchSelect = styled.select`
  display: none;

  @media ${(props) => props.theme.mediaQueries.medium} {
    display: block;
    flex-basis: 100%;
    max-width: 300px;
    margin-left: 20px;
    border: none;
    background: ${(props) =>
      props.color === "gray" ? `white` : `var(--color-website-${props.color})`};

    color: var(--color-website-background);
    border: 8px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 4px;
    padding: 0 10px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat, repeat;
    background-position: right 1em top 50%, 0 0;
  }

  &:focus {
    border: none;
    outline: none;
  }
`;

const SelectOption = styled.option`
  background: white;
`;

const Blogs = ({lawyers, blogs, theme, basic}) => {
  if (blogs.length <= 0) return null;

  const [areasArray, setAreasArray] = useState([]);
  const [searchArray, setSearchArray] = useState(null);
  const [openedArray, setOpenedArray] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [idBlogs, setIdBlogs] = useState(null);

  useEffect(() => {
    let areas = Array.from(new Set(blogs.map((solvedCase) => solvedCase.area)));

    const openedArray = new Array(areas.length).fill(false);

    setAreasArray(areas);
    setOpenedArray(openedArray);
  }, []);

  const openArea = (index) => {
    if (index === "search") {
      array = openedArray.map((array) => false);
      setOpenedArray(array);
      return;
    }
    let array = new Array(...openedArray);
    array = openedArray.map((arr, i) =>
      i === index && arr !== true ? true : false
    );
    setOpenedArray(array);
  };

  const onChangeSearch = (e) => {
    openArea("search");
    let areas;
    if (e.target.name === "selector") {
      areas = Array.from(
        new Set(
          blogs.filter((blog) => {
            if (blog.area.includes(e.target.value) === true) {
              return blog.area;
            }
          })
        )
      );

      if (areas.length === 0) {
        setSearchArray(null);
        setIdBlogs(null);
      } else {
        const newAreas = Array.from(
          new Set(areas.map((solvedCase) => solvedCase.area))
        );
        const newId = Array.from(
          new Set(areas.map((solvedCase) => solvedCase.id))
        );

        setSearchArray(newAreas);
        setIdBlogs(newId);
      }
    } else if (e.target.value !== "") {
      areas = Array.from(
        new Set(
          blogs.filter((blog) => {
            if (
              /* blog.area.includes(e.target.value) === true || */
              blog.answer
                .toLowerCase()
                .includes(e.target.value.toLowerCase()) === true ||
              blog.question
                .toLowerCase()
                .includes(e.target.value.toLowerCase()) === true
            ) {
              return blog.area;
            }
          })
        )
      );

      if (areas.length === 0) {
        setSearchArray(null);
        setIdBlogs(null);
      } else {
        const newAreas = Array.from(
          new Set(areas.map((solvedCase) => solvedCase.area))
        );
        const newId = Array.from(
          new Set(areas.map((solvedCase) => solvedCase.id))
        );

        setSearchArray(newAreas);
        setIdBlogs(newId);
      }
    } else {
      setSearchArray(null);
      setIdBlogs(null);
    }
  };

  return (
    <>
      <section>
        <div id="blogs" className="d-none d-md-block">
          <Separation color={theme.color} mixed={theme.mixed}>
            {lawyers.length === 1 ? (
              <>
                <h1>Consulta mi blog</h1>
                {/*  <p>
                  En mi blog podrás encontrar respuesta a muchas de las
                  preguntas que te puedan surgir. Usa el buscador para ver
                  entradas relacionadas con lo que estás buscando.
                </p> */}
              </>
            ) : (
              <>
                <h1>Consulta nuestro blog</h1>
                {/* <p>
                  En nuestro blog podrás encontrar respuesta a muchas de las
                  preguntas que te puedan surgir. Usa el buscador para ver
                  entradas relacionadas con lo que estás buscando.
                </p> */}
              </>
            )}
          </Separation>
        </div>

        <Wrapper>
          <Container id="sectionBlog" className="container">
            <div className="d-md-none">
              <MobileTitle>
                {lawyers.length === 1
                  ? "Consulta mi blog"
                  : "Consulta nuestro blog"}
              </MobileTitle>
            </div>

            <SearchContainer>
              <SearchWrapper>
                <Search />
                <SearchInput
                  onChange={onChangeSearch}
                  placeholder="Buscar en blog"
                />
              </SearchWrapper>
              <SearchSelect
                name="selector"
                onChange={onChangeSearch}
                color={theme.color}
                mixed={theme.mixed}
              >
                <SelectOption value="">Área </SelectOption>
                {areasArray.map((area) => (
                  <SelectOption value={area} key={area}>
                    {area}
                  </SelectOption>
                ))}
              </SearchSelect>
            </SearchContainer>

            {selectedCase ? (
              <StyledCase color={theme.color}>
                <a
                  role="button"
                  className="btn-link case__link"
                  onClick={() => {
                    /*       openArea(selectedCase.index); */
                    setSelectedCase(null);
                  }}
                >
                  Volver atrás
                </a>
                <h3 id="sectionBlog" className="case__title">
                  {selectedCase.question}
                </h3>
                <p className="case__text">{selectedCase.answer}</p>
              </StyledCase>
            ) : (
              <StyledCases color={theme.color}>
                {searchArray !== null ? (
                  searchArray.map((search, index) => {
                    const isOpen = openedArray[index];
                    return (
                      <>
                        <ul
                          key={index}
                          className={` mt-md-0 cases cases ${
                            isOpen && `cases--noborder`
                          }`}
                          onClick={() => openArea(index)}
                        >
                          <h3 className="cases__title">
                            {" "}
                            {search}
                            <span
                              className={`cases__icon ${
                                isOpen ? " cases__icon--open" : ""
                              }`}
                            >
                              {" "}
                              <ExpandMoreIcon style={{fontSize: "25px"}} />
                            </span>
                            {!isOpen ? (
                              <span className={`cases__mob-icon`}>+</span>
                            ) : (
                              <span className={`cases__mob-icon`}>-</span>
                            )}
                          </h3>
                        </ul>
                        <Collapse isOpen={isOpen}>
                          <Card style={{border: "none"}}>
                            <CardBody>
                              <ul
                                className="cases"
                                style={{
                                  padding: "0",
                                  marginTop: "3rem",
                                  border: "none",
                                }}
                              >
                                {blogs.map((solvedCase) => {
                                  const idValidation = idBlogs.filter(
                                    (blog) => blog === solvedCase.id
                                  );
                                  if (
                                    solvedCase.area === search &&
                                    idValidation.length === 1 &&
                                    openedArray[index]
                                  )
                                    return (
                                      <li
                                        className="cases__item"
                                        key={uuidv4()}
                                      >
                                        <p className="cases__text">
                                          {solvedCase.question}
                                          <Link
                                            href="#sectionBlog"
                                            role="button"
                                            className="btn-link cases__link"
                                            onClick={() => {
                                              setSelectedCase({
                                                index: index,
                                                ...solvedCase,
                                              });
                                            }}
                                          >
                                            {" "}
                                            · Ver respuesta
                                          </Link>
                                        </p>
                                      </li>
                                    );
                                })}
                              </ul>
                            </CardBody>
                          </Card>
                        </Collapse>
                      </>
                    );
                  })
                ) : (
                  <>
                    {areasArray.map((area, areaIndex) => {
                      const isOpen = openedArray[areaIndex];

                      return (
                        <>
                          <ul
                            key={uuidv4()}
                            className={` mt-md-0 cases cases ${
                              isOpen && `cases--noborder`
                            }`}
                            onClick={() => openArea(areaIndex)}
                          >
                            <h3 className="cases__title">
                              {area}
                              <span
                                className={`cases__icon ${
                                  isOpen ? " cases__icon--open" : ""
                                }`}
                              >
                                <ExpandMoreIcon style={{fontSize: "25px"}} />
                              </span>

                              {!isOpen ? (
                                <span className={`cases__mob-icon`}>+</span>
                              ) : (
                                <span className={`cases__mob-icon`}>-</span>
                              )}
                            </h3>
                          </ul>
                          <Collapse isOpen={isOpen}>
                            <Card style={{border: "none"}}>
                              <CardBody>
                                <ul
                                  className="cases"
                                  style={{
                                    padding: "0",
                                    border: "none",
                                  }}
                                >
                                  {blogs.map((solvedCase) => {
                                    if (
                                      solvedCase.area === area &&
                                      openedArray[areaIndex]
                                    )
                                      return (
                                        <li
                                          className="cases__item"
                                          key={uuidv4()}
                                        >
                                          <p className="cases__text">
                                            {solvedCase.question}
                                            <Link
                                              to="sectionBlog"
                                              duration={200}
                                              smooth={true}
                                              role="button"
                                              className="btn-link cases__link"
                                              onClick={() => {
                                                setSelectedCase({
                                                  index: areaIndex,
                                                  ...solvedCase,
                                                });
                                              }}
                                            >
                                              {" "}
                                              · Ver respuesta
                                            </Link>
                                          </p>
                                        </li>
                                      );
                                  })}
                                </ul>
                              </CardBody>
                            </Card>
                          </Collapse>
                        </>
                      );
                    })}
                  </>
                )}
              </StyledCases>
            )}
          </Container>
        </Wrapper>
      </section>
    </>
  );
};

export default Blogs;
