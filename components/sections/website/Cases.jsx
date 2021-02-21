import styled, {keyframes} from "styled-components";
import {useState, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import {Triangle} from "./Components/svgs";
import {Link} from "react-scroll";
import {MobileTitle} from "./Components/Typography";
import Separation from "./Components/Separation";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Search} from "./Components/svgs";
import {Collapse, Card, CardBody} from "reactstrap";

const Wrapper = styled.div`
  padding-bottom: 3rem;
  background: #f8f8f8;
  @media ${(props) => props.theme.mediaQueries.medium} {
    padding: 10rem 0;
    padding-top: 0rem;
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
      &:hover {
        opacity: 0.5;
      }
    }
    &__mob-icon {
      margin-left: auto;
    }
    &__item {
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
      &__mob-icon {
        display: none;
      }
      &__text {
        padding-left: 20px;
      }
      &__title {
        justify-content: space-between;
        font-size: 17px;
      }
      &:not(:last-child) {
        margin-bottom: 0;
        border-top: 1px solid #f0f0f0;
      }

      &__icon {
        display: block;
        position: relative;
        margin-right: 20px;
        svg {
          transform: rotate(-90deg);
          transition: 5s ease-in;
        }
        &--open {
          svg {
            transform: rotate(0deg);
            transition: 6s ease-in;
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
    border: 1px solid red;
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

const Container = styled.div`
  @media ${(props) => props.theme.mediaQueries.large} {
    max-width: 100rem;
    margin: 0 auto;
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
  display: flex;
  align-items: center;
  border-radius: 8px;
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

const Cases = ({lawyers, solvedCases, basic, theme}) => {
  if (solvedCases.length <= 0) return null;

  const [areasArray, setAreasArray] = useState([]);
  const [searchArray, setSearchArray] = useState(null);
  const [openedArray, setOpenedArray] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [idSolvedCase, setIdSolvedCase] = useState(null);

  useEffect(() => {
    let areas = Array.from(
      new Set(solvedCases.map((solvedCase) => solvedCase.area))
    );

    const openedArray = new Array(areas.length).fill(false);

    setAreasArray(areas);
    setOpenedArray(openedArray);
  }, []);

  const openArea = (index2) => {
    if (index2 === "search") {
      array = openedArray.map((array) => false);
      setOpenedArray(array);
      return;
    }
    let array = new Array(...openedArray);
    array = openedArray.map((arr, i) =>
      i === index2 && arr !== true ? true : false
    );
    setOpenedArray(array);
  };

  const onChangeSearch = (e) => {
    openArea("search");
    let areas;
    if (e.target.name === "selector") {
      areas = Array.from(
        new Set(
          solvedCases.filter((solvedCase) => {
            if (solvedCase.area.includes(e.target.value) === true) {
              return solvedCase.area;
            }
          })
        )
      );

      if (areas.length === 0) {
        setSearchArray(null);
        setIdSolvedCase(null);
      } else {
        const newAreas = Array.from(
          new Set(areas.map((solvedCase) => solvedCase.area))
        );
        const newId = Array.from(
          new Set(areas.map((solvedCase) => solvedCase))
        );

        setSearchArray(newAreas);
        setIdSolvedCase(newId);
      }
    } else if (e.target.value !== "") {
      areas = Array.from(
        new Set(
          solvedCases.filter((solvedCase) => {
            if (
              /*   solvedCase.area.includes(e.target.value) === true || */
              solvedCase.comment
                .toLowerCase()
                .includes(e.target.value.toLowerCase()) === true ||
              solvedCase.title
                .toLowerCase()
                .includes(e.target.value.toLowerCase()) === true
            ) {
              return solvedCase.area;
            }
          })
        )
      );
      if (areas.length === 0) {
        setSearchArray(null);
        setIdSolvedCase(null);
      } else {
        const newAreas = Array.from(
          new Set(areas.map((solvedCase) => solvedCase.area))
        );
        const newId = Array.from(
          new Set(areas.map((solvedCase) => solvedCase))
        );
        setSearchArray(newAreas);
        setIdSolvedCase(newId);
      }
    } else {
      setSearchArray(null);
      setIdSolvedCase(null);
    }
  };

  return (
    <section>
      <div id="solvedCases" className="d-none d-md-block">
        <Separation color={theme.color} mixed={theme.mixed}>
          {lawyers.length !== 1 ? (
            <>
              <h1>Casos resueltos</h1>
              {/* <p>
                En {basic.bufeteName} hemos resueltos numerosos casos para
                nuestros clientes. A continuación puedes encontrar algunos de
                estos casos y cómo se resolvieron.
              </p> */}
            </>
          ) : (
            <>
              <h1>Casos resueltos</h1>
              {/* <p>
                Durante los últimos años he resuelto numerosos casos para mis
                clientes. A continuación puedes encontrar algunos de estos casos
                y cómo se resolvieron.
              </p> */}
            </>
          )}
        </Separation>
      </div>

      <Wrapper>
        <Container id="sectionCase" className="container">
          <div className="d-md-none">
            <MobileTitle>Casos resueltos</MobileTitle>
          </div>

          <SearchContainer>
            <SearchWrapper>
              <Search />
              <SearchInput
                onChange={onChangeSearch}
                placeholder="Buscar en casos"
              />
            </SearchWrapper>
            <SearchSelect
              name="selector"
              onChange={onChangeSearch}
              color={theme.color}
              mixed={theme.mixed}
            >
              <SelectOption value="">Área</SelectOption>
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
                  /* openArea("back"); */
                  setSelectedCase(null);
                }}
              >
                Volver atrás
              </a>
              <h3 className="case__title">
                {selectedCase.title}
                {selectedCase.honors && (
                  <span className="case__honors">
                    {" "}
                    - {selectedCase.honors}€
                  </span>
                )}
              </h3>
              <p className="case__text">{selectedCase.comment}</p>
            </StyledCase>
          ) : (
            <StyledCases color={theme.color}>
              {searchArray !== null ? (
                searchArray.map((search, index) => {
                  const isOpen = openedArray[index];
                  return (
                    <>
                      <ul
                        key={uuidv4()}
                        className={` mt-md-0 cases cases ${
                          isOpen && `cases--noborder`
                        }`}
                        onClick={() => openArea(index)}
                      >
                        <h3 className="cases__title">
                          {search}
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
                              style={{padding: "0", border: "none"}}
                            >
                              {solvedCases.map((solvedCase) => {
                                const idValidation = idSolvedCase.filter(
                                  (blog) =>
                                    blog.area === solvedCase.area &&
                                    blog.comment.toLowerCase() ===
                                      solvedCase.comment.toLowerCase() &&
                                    blog.title.toLowerCase() ===
                                      solvedCase.title.toLowerCase()
                                );
                                if (
                                  idValidation.length === 1 &&
                                  solvedCase.area === search &&
                                  openedArray[index]
                                )
                                  return (
                                    <li
                                      className={`cases__item ${
                                        openedArray[index]
                                          ? `cases__item-open`
                                          : `cases__item-close`
                                      } `}
                                      key={uuidv4()}
                                    >
                                      <p className="cases__text">
                                        {solvedCase.title}
                                        <Link
                                          to="sectionCase"
                                          smooth={true}
                                          duration={200}
                                          role="button"
                                          className="btn-link cases__link"
                                          onClick={() =>
                                            setSelectedCase({
                                              index: index,
                                              ...solvedCase,
                                            })
                                          }
                                        >
                                          {" "}
                                          Ver caso
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
                          className={`mt-md-0 cases cases ${
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
                              <ul style={{padding: "0", border: "none"}}>
                                {solvedCases.map((solvedCase, index) => {
                                  if (
                                    solvedCase.area === area &&
                                    openedArray[areaIndex]
                                  )
                                    return (
                                      <li
                                        className={`cases__item ${
                                          openedArray[index]
                                            ? `cases__item-open`
                                            : `cases__item-close`
                                        } `}
                                        key={uuidv4()}
                                      >
                                        <p className="cases__text">
                                          {solvedCase.title}
                                          <Link
                                            to="sectionCase"
                                            smooth={true}
                                            duration={200}
                                            role="button"
                                            className="btn-link cases__link"
                                            onClick={() =>
                                              setSelectedCase({
                                                index: areaIndex,
                                                ...solvedCase,
                                              })
                                            }
                                          >
                                            {" "}
                                            Ver caso
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
                  })}{" "}
                </>
              )}
            </StyledCases>
          )}
        </Container>
      </Wrapper>
    </section>
  );
};

export default Cases;
