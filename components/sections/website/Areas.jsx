import {useState, useEffect} from "react";
import Separation from "./Components/Separation";
import styled from "styled-components";
import {v4 as uuidv4} from "uuid";
import {Triangle} from "./Components/svgs";
import {Link} from "react-scroll";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {MobileTitle} from "./Components/Typography";
import {Search} from "./Components/svgs";
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
      &__title {
        justify-content: space-between;
        font-size: 17px;
      }
      &__text {
        padding-left: 20px;
      }
      &:not(:last-child) {
        margin-bottom: 0;
        border-top: 1px solid #f0f0f0;
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
      font-size: 1.4rem;
      font-weight: 400;
      white-space: pre-line;
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

const Areas = ({lawyers, areas, theme, basic}) => {
  if (areas.length <= 0) return null;
  const [areasArray, setAreasArray] = useState([]);
  const [openedArray, setOpenedArray] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchArray, setSearchArray] = useState(null);
  const [idSolvedCase, setIdSolvedCase] = useState(null);

  useEffect(() => {
    let areas2 = Array.from(new Set(areas.map((area) => area.area)));

    const openedArray = new Array(areas.length).fill(false);

    setOpenedArray(openedArray);
    setAreasArray(areas2);
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
    let areasNew;
    if (e.target.name === "selector") {
      areasNew = Array.from(
        new Set(
          areas.filter((areasp) => {
            if (areasp.area.includes(e.target.value) === true) {
              return areasp;
            }
          })
        )
      );
      if (areasNew.length === 0) {
        setSearchArray(null);
        setIdSolvedCase(null);
      } else {
        const newAreas = Array.from(
          new Set(areasNew.map((solvedCase) => solvedCase.area))
        );
        const newId = Array.from(
          new Set(areasNew.map((solvedCase) => solvedCase))
        );
        setSearchArray(newAreas);
        setIdSolvedCase(newId);
      }
    } else if (e.target.value !== "") {
      areasNew = Array.from(
        new Set(
          areas.filter((areasp) => {
            const SearchCases = areasp.cases.filter((casep) => {
              if (
                casep.subarea
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) === true ||
                casep.comment
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) === true
              ) {
                return casep;
              }
            });
            if (SearchCases.length > 0) {
              return SearchCases;
            }
          })
        )
      );
      if (areasNew.length === 0) {
        setSearchArray(null);
        setIdSolvedCase(null);
      } else {
        const newAreas = Array.from(
          new Set(areasNew.map((solvedCase) => solvedCase.area))
        );
        const newId = Array.from(
          new Set(areasNew.map((solvedCase) => solvedCase))
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
    <>
      <section>
        <div id="areas" className="d-none d-md-block">
          <Separation color={theme.color} mixed={theme.mixed}>
            {lawyers.length === 1 ? (
              <>
                <h1>Mis Áreas</h1>
                {/*  <p>
                  Aquí podrás ver todas las áreas que cubro, busca tu caso en el
                  buscador para saber si cubro el área que te interesa.
                </p> */}
              </>
            ) : (
              <>
                <h1>Nuestras Áreas</h1>
                {/*  <p>
                  Aquí podrás ver todas las áreas que cubrimos, busca tu caso en
                  el buscador para saber si cubrimos el área que te interesa.
                </p> */}
              </>
            )}
          </Separation>
        </div>
        <Wrapper>
          <Container id="sectionArea" className="container">
            <div className="d-md-none">
              <MobileTitle>
                {lawyers.length === 1 ? "Mis áreas" : "Nuestras áreas"}
              </MobileTitle>
            </div>

            <SearchContainer>
              <SearchWrapper>
                <Search />
                <SearchInput
                  onChange={onChangeSearch}
                  placeholder="Buscar en áreas"
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
                    /*    openArea("back"); */
                    setSelectedCase(null);
                  }}
                >
                  Volver atrás
                </a>
                <h3 className="case__title">{selectedCase.cases[0].subarea}</h3>
                <p className="case__text">{selectedCase.cases[0].comment}</p>
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
                                {areas.map((solvedCase) => {
                                  const idValidation = idSolvedCase.filter(
                                    (blog) =>
                                      blog.area.toLowerCase() ===
                                        solvedCase.area.toLowerCase() &&
                                      blog.cases[0].subarea.toLowerCase() ===
                                        solvedCase.cases[0].subarea.toLowerCase() &&
                                      blog.cases[0].comment.toLowerCase() ===
                                        solvedCase.cases[0].comment.toLowerCase()
                                  );

                                  if (
                                    openedArray[index] &&
                                    solvedCase.area === search &&
                                    idValidation.length === 1
                                  )
                                    return (
                                      <li
                                        className="cases__item"
                                        key={uuidv4()}
                                      >
                                        <p className="cases__text">
                                          {solvedCase.cases[0].subarea}
                                          {console.log(solvedCase.cases[0])}
                                          {solvedCase.cases[0].comment.trim() && (
                                            <Link
                                              href="#sectionArea"
                                              role="button"
                                              className="btn-link cases__link"
                                              onClick={() => {
                                                setSelectedCase({
                                                  area: solvedCase.area,
                                                  index: index,
                                                  ...solvedCase,
                                                });
                                              }}
                                            >
                                              {" "}
                                              Ver más
                                            </Link>
                                          )}
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
                            className={` mt-md-0 cases ${
                              isOpen && `cases--noborder`
                            }`}
                            onClick={() => openArea(areaIndex)}
                          >
                            <h3 className="cases__title">
                              {" "}
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
                                  {areas.map((solvedCase) => {
                                    if (
                                      openedArray[areaIndex] &&
                                      solvedCase.area === area
                                    )
                                      return (
                                        <li
                                          className="cases__item"
                                          key={uuidv4()}
                                        >
                                          <p className="cases__text">
                                            {solvedCase.cases[0].subarea}
                                            {solvedCase.cases[0].comment.trim()
                                              .length !== 0 && (
                                              <Link
                                                to="sectionArea"
                                                duration={200}
                                                smooth={true}
                                                role="button"
                                                className="btn-link cases__link"
                                                onClick={() => {
                                                  setSelectedCase({
                                                    area: area.area,
                                                    index: areaIndex,
                                                    ...solvedCase,
                                                  });
                                                }}
                                              >
                                                {" "}
                                                Ver más
                                              </Link>
                                            )}
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

export default Areas;
