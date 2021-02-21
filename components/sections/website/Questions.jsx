import styled from "styled-components";
import {Formik, Form, Field} from "formik";
import * as yup from "yup";
import FormGroup from "../../blocks/dashboard/forms/FormGroup";
import Checkbox from "../../blocks/dashboard/forms/Checkbox";

const Container = styled.div`
  margin: 0 auto;
  background: #f8f8f8;
  padding: 3rem;
  border-radius: 12px;
  width: 90%;
  .sub-text {
    font-weight: bold;
  }
  .heading-text {
    display: flex;
    flex-direction: column;
  }
  .form-control {
    background: #eeeeee;
    border-radius: 2px;
    border: none;
    height: 50px;
  }

  @media ${(props) => props.theme.mediaQueries.medium} {
    .btn {
      position: relative;
      width: 506px;
      height: 58px;
      border-radius: 0;
      top: 10px;
      margin: 0 auto;
    }
    .heading-text {
      display: inherit;
      font-family: "Poppins", sans-serif;
      font-size: 64px;
      font-style: normal;
      line-height: 50px;
      font-weight: bold;

      letter-spacing: -3px;
      height: 135px;
    }
    .web-text {
      font-family: "Poppins", sans-serif;
      color: rgba(0, 0, 0, 0.7);
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 36px;
    }
    .politics-text {
      display: flex;
      align-items: center;
      font-family: "Poppins", sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 17px;
      line-height: 25px;
      padding-left: 19.01px;
      height: 40px;
    }
    .form-questions {
      margin-top: 44px;
      label {
        position: relative;
        top: 5px;

        padding: 0;
        margin: 0;
      }
      .form-control {
        background: #eeeeee;
        border-radius: 0;
        border: none;
        height: 60px;
      }
      .form-group {
        text-align: start;
        margin: 0 auto;
        width: 509px;
        margin-bottom: 14px;
      }
    }
    text-align: center;

    width: 100%;
  }
`;

const Wrapper = styled.section`
  padding: 4rem 0;
  background: #f8f8f8;
  @media ${(props) => props.theme.mediaQueries.medium} {
    box-shadow: inherit;
    padding: 20rem 0;
    margin: 0;
  }
`;

const Button = styled.button`
  background: ${(props) =>
    `${
      props.color === "gray" ? "#56A6E6" : `var(--color-website-${props.color})`
    }`};

  &:hover,
  &:focus {
    color: white;
  }
`;

const validationSchema = yup.object({
  phone: yup.string().required("Este campo es requerido"),
  case: yup.string().required("Este campo es requerido"),
  accept: yup.boolean().oneOf([true], "Debe aceptar la política de privacidad"),
});

const Questions = ({lawyers, questions, theme, type, basic}) => {
  return (
    <Wrapper>
      <Container className="content-questions">
        <div>
          <h1 className="heading-text mt-0">
            {lawyers.length > 1 ? "Respondemos a " : "Respondo a "}
            <span className="sub-text">tus preguntas</span>
          </h1>
          <p className="web-text">
            {lawyers.length > 1
              ? "Te llamamos y respondemos a tus preguntas"
              : "Te llamo y respondo a tus preguntas"}
          </p>
        </div>

        <div className="form-questions mt-4">
          <Formik
            initialValues={{phone: "", case: "", accept: false}}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              window.location.href = `mailto:${basic.email}?Subject=${values.case}&body=Número Telefónico: ${values.phone}`;
            }}
          >
            {({isSubmitting, values, errors, handleChange}) => {
              return (
                <Form>
                  <FormGroup
                    type="tel"
                    name="phone"
                    fieldData={{
                      label: "Teléfono de contacto",
                      placeholder: "",
                    }}
                  />
                  <FormGroup
                    type="text"
                    name="case"
                    fieldData={{
                      label: "Tu caso",
                      placeholder: `${questions.cases}`,
                    }}
                  />
                  <div className="form-group">
                    <Field
                      type="checkbox"
                      name="accept"
                      id="acceptCheckBox"
                      className="d-none"
                    />
                    <label
                      htmlFor="acceptCheckBox"
                      className="web-text d-flex align-items-center"
                    >
                      <Checkbox
                        color={theme.color}
                        checked={values.accept}
                        onChange={handleChange}
                      />
                      <span className="politics-text" style={{marginLeft: 8}}>
                        Acepto la política de privacidad
                      </span>
                    </label>
                    <span className="politics-error form-group__error">
                      {errors.accept}
                    </span>
                  </div>

                  <Button
                    color={theme.color}
                    mixed={theme.mixed}
                    type="submit"
                    className=" btn btn-block"
                  >
                    {lawyers.length > 1
                      ? "Pregúntanos gratis"
                      : "Pregúntame gratis"}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Questions;
