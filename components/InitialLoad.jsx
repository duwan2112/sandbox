import React, {useState, useEffect, useContext, createRef} from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
import {Alert} from "./contexts/index";
//Forms
import Basic from "./blocks/dashboard/forms/Basic";
import Welcome from "./blocks/dashboard/forms/Welcome";
import {LawyerArray} from "./blocks/dashboard/forms/Lawyer";
import HowItWorks from "./blocks/dashboard/forms/HowItWorks";
import {ClientArray} from "./blocks/dashboard/forms/Client";
import Questions from "./blocks/dashboard/forms/Questions";
import {SolvedCasesArray} from "./blocks/dashboard/forms/SolvedCases";
import {BlogArray} from "./blocks/dashboard/forms/Blogs";
import {AreasArray} from "./blocks/dashboard/forms/Areas";
import AboutUs from "./blocks/dashboard/forms/AboutUs";

const Container = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  max-width: 40rem;

  .load {
    &__title {
      font-family: var(--quicksand);
      font-size: 2rem;
      span {
        color: #ffa16f;
      }

      &--bold {
        font-weight: var(--bold);
      }
    }
    &__row {
      h1 {
        font-weight: 500 !important;
        line-height: 50px;
        font-size: 25px;
        letter-spacing: -1px;
      }
    }
    &__text {
      font-family: var(--quicksand);
      font-size: 15px;
      line-height: 1.9rem;
      margin-bottom: 2em;
      padding: 0;
    }
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    max-width: 51rem;
    padding-bottom: 10rem;
    padding-top: 0rem;

    .load {
      &__title {
        font-size: 2.4rem;
        line-height: 3.1rem;
        margin-bottom: 0.7em;
      }
      &__row {
        h1 {
          margin-top: 7rem;
          font-size: 42px;
        }
        .heading--blue {
          font-size: 40px;
        }
      }
      &__text {
        padding: 0;
        font-size: 1.8rem;
        margin-bottom: 3em;
      }
    }
  }
`;

const InitialLoad = ({submitFormData, initialValues}) => {
  const [isLoading, setIsLoading] = useState({});
  const [formState, setFormState] = useState({});
  const {active} = useContext(Alert.AlertContext);

  const SubmitFormData = async (buttonIndex) => {
    await submitFormData(formState, buttonIndex);
    if (buttonIndex) setIsLoading((prev) => ({...prev, [buttonIndex]: false}));
  };

  const handleSubmitFormData = async (buttonIndex) => {
    active(true);
    if (buttonIndex) setIsLoading((prev) => ({...prev, [buttonIndex]: true}));
    setTimeout(() => {
      SubmitFormData(buttonIndex);
      active(false);
    }, 1000);
  };

  const updateFormState = (values) => {
    //this line is for Url (Direccion web), because this line cannot white space
    if (values.basic) {
      const newValueBasicUrl = values.basic.url.replace(/ /g, "").toLowerCase();
      values.basic.url = newValueBasicUrl.trim();
    }

    if (values.lawyers) {
      values = values.lawyers;
    }
    if (values.clients) {
      values = values.clients;
    }
    if (values.solvedCases) {
      values = values.solvedCases;
    }
    if (values.blogs) {
      values = values.blogs;
    }
    if (values.areas) {
      values = values.areas;
    }
    //**********/
    setFormState(Object.assign(formState, values));
  };

  return (
    <Container className="container">
      <div className="load__row">
        <h1 className="heading ">Completa el formulario</h1>
      </div>
      <div className=" ">
        <p className="load__text container-fluid">
          Estás a un paso de crear tu web.
          <br /> Solo necesitas subir tus datos <br /> ¡y wala!
        </p>
      </div>

      <div className="">
        <Basic
          updateFormState={updateFormState}
          initialValues={initialValues.basic}
          handleSubmitFormData={handleSubmitFormData}
          submitFormData={submitFormData}
        />
      </div>

      <div className="load__row ">
        <h1 className="heading">
          Edita la sección
          <br />
          <strong className="heading--blue">pantalla de bienvenida</strong>
        </h1>
      </div>

      <div className="">
        <Welcome
          updateFormState={updateFormState}
          initialValues={initialValues.welcomeScreen}
          handleSubmitFormData={handleSubmitFormData}
          submitFormData={submitFormData}
        />
      </div>

      <div className="load__row ">
        <h1 className="heading">
          Incluye a los
          <br />
          <strong className="heading--blue">abogados</strong>
        </h1>
      </div>
      <div className="">
        <LawyerArray
          updateFormState={updateFormState}
          initialValues={initialValues.lawyers}
          handleSubmitFormData={handleSubmitFormData}
          submitFormData={submitFormData}
        />
      </div>

      <div className="load__row ">
        <h1 className="heading">
          Edita la sección
          <br />
          <strong className="heading--blue">como funciona</strong>
        </h1>
      </div>
      <div className="">
        <HowItWorks
          updateFormState={updateFormState}
          initialValues={initialValues.howItWorks}
          handleSubmitFormData={handleSubmitFormData}
          submitFormData={submitFormData}
        />
      </div>

      <div className="load__row">
        <h1 className="heading">
          Edita la sección
          <br />
          <strong className="heading--blue">que dicen nuestros clientes</strong>
        </h1>
      </div>
      <div className="">
        <ClientArray
          updateFormState={updateFormState}
          initialValues={initialValues.clients}
          handleSubmitFormData={handleSubmitFormData}
          submitFormData={submitFormData}
        />
      </div>

      <div className="load__row ">
        <h1 className="heading">
          Edita la sección
          <br />
          <strong className="heading--blue">respondemos a tus preguntas</strong>
        </h1>
      </div>
      <div className="">
        <Questions
          updateFormState={updateFormState}
          initialValues={initialValues.questions}
          handleSubmitFormData={handleSubmitFormData}
          submitFormData={submitFormData}
        />
      </div>

      <div className="load__row ">
        <h1 className="heading">
          Secciones
          <br />
          <strong className="heading--gray">opcionales</strong>
        </h1>
      </div>
      <div className="load__row ">
        <p className="load__text">
          ¡Has completado la información necesaria para publicar tu web pero
          puedes seguir añadiendo más secciones. Si prefieres añadir estas
          secciones más tarde pulsa el siguiente botón para guardar tu web e ir
          al menú principal
        </p>
      </div>
      <div className="mt-5 mb-5 form-container">
        <button
          className="btn btn-gradient-primary btn-block btn-shadow d-flex justify-content-center"
          type="submit"
          onClick={() => {
            handleSubmitFormData(2);
          }}
        >
          {isLoading[2] ? (
            <ReactLoading
              type="spin"
              color={"currentColor"}
              height={30}
              width={30}
            />
          ) : (
            "Guardar mi web | Menú principal"
          )}
        </button>
      </div>
      <div className="load__row ">
        <h1 className="heading">
          Edita la sección
          <br />
          <strong className="heading--blue">
            casos resueltos <span>(opcional)</span>
          </strong>
        </h1>
      </div>

      <div className="">
        <SolvedCasesArray
          updateFormState={updateFormState}
          initialValues={initialValues.solvedCases}
          handleSubmitFormData={handleSubmitFormData}
          submitFormData={submitFormData}
        />
      </div>

      <div className="load__row ">
        <h1 className="heading">
          Edita la sección
          <br />
          <strong className="heading--blue">
            nuestro blog <span>(opcional)</span>
          </strong>
        </h1>
      </div>
      <div className="">
        <BlogArray
          updateFormState={updateFormState}
          initialValues={initialValues.blogs}
          handleSubmitFormData={handleSubmitFormData}
          submitFormData={submitFormData}
        />
      </div>

      <div className="load__row ">
        <h1 className="heading">
          Edita la sección
          <br />
          <strong className="heading--blue">
            nuestras areás<span> (opcional)</span>
          </strong>
        </h1>
      </div>

      <div className="">
        <AreasArray
          updateFormState={updateFormState}
          initialValues={initialValues.areas}
          handleSubmitFormData={handleSubmitFormData}
          submitFormData={submitFormData}
        />
      </div>

      <div className="load__row ">
        <h1 className="heading">
          Edita la sección
          <br />
          <strong className="heading--blue">
            nosotros<span> (opcional)</span>
          </strong>
        </h1>
      </div>
      <div className="">
        <AboutUs
          updateFormState={updateFormState}
          initialValues={initialValues.aboutUs}
          handleSubmitFormData={handleSubmitFormData}
          submitFormData={submitFormData}
        />
      </div>

      <div className="load__row ">
        <h1 className="heading">
          Has terminado!
          <br />
          <strong className="heading--gray">tu web</strong>
        </h1>
      </div>
      <div className="load__row ">
        <p className="load__text">
          ¡Ya puedes guardar y publicar tu web! Podrás modificarla cuando
          quieras
        </p>
      </div>
      <div className="mt-5 form-container">
        <button
          className="btn btn-gradient-primary btn-block btn-shadow d-flex justify-content-center"
          type="submit"
          onClick={() => handleSubmitFormData(1)}
        >
          {isLoading[1] ? (
            <ReactLoading
              type="spin"
              color={"currentColor"}
              height={30}
              width={30}
            />
          ) : (
            "Guardar mi web"
          )}
        </button>
      </div>
    </Container>
  );
};

export default InitialLoad;
