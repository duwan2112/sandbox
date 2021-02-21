import {useState, useEffect, useContext} from "react";
import FormGroup from "./FormGroup";
import {Formik, Form, Field} from "formik";
import Handler from "./Handler";
import * as yup from "yup";
import {server} from "../../../../utils";
import ReactLoading from "react-loading";
import {Alert} from "../../../contexts/index";

import styled from "styled-components";

const fieldsData = {
  optionOne: {
    label: "Frase de bienvenida",
    placeholder: "Tu equipo de abogados y asesores juridicos",
  },
  optionTwo: {
    label: "¡Hola! ¿En qué necesitas ayuda?",
    placeholder: "Me estoy divorciando y necesito ayuda en el proceso",
  },
};

const validationSchema = yup.object({
  optionOne: yup.string().when("selected", {
    is: "optionOne",
    then: yup.string().required("Este campo es requerido"),
  }),
  optionTwo: yup.string().when("selected", {
    is: "optionTwo",
    then: yup.string().required("Este campo es requerido"),
  }),
  selected: yup.string().required(),
});

const colors = [
  {
    color: "gray",
    mixed: true,
  },
  {
    color: "blue",
    mixed: true,
  },
  {
    color: "orange",
    mixed: true,
  },
  {
    color: "green",
    mixed: true,
  },
  {
    color: "purple",
    mixed: false,
  },
  {
    color: "aqua",
    mixed: false,
  },
];

const backgrounds = [
  "page-background-0.png",
  "page-background-1.png",
  "page-background-2.png",
];

const Seprarator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #c4c4c4;
`;

const StyledColorCheckBox = styled.div`
  cursor: pointer;
  margin-bottom: 2rem;
  position: relative;
  width: 10rem;
  height: 10rem;
  border-radius: 10px;
  ${(props) => {
    if (props.color) {
      let value;
      if (props.mixed) {
        value = `linear-gradient(90deg, var(--color-website-${
          props.color
        }) 50%, var(--color-website-${
          props.color === "gray" ? "background2" : "background"
        }) 50%);`;
      } else {
        value = `var(--color-website-${props.color})`;
      }
      return `background: ${value}`;
    } else if (props.background) {
      return `background-image: url(${require(`../../../../public/static/${props.background}`)})`;
    }
  }};

  box-shadow: ${(props) =>
    props.selected ? "0px 0px 19px -1px rgba(85,145,245,0.54)" : ""};

  &:not(:last-child) {
    margin-right: 1.5rem;
  }

  img {
    display: ${(props) => (props.selected ? "" : " none")};
    position: absolute;
    right: -5px;
    top: -5px;
    object-fit: cover;
    width: 30px;
    height: 30px;
    /* display: none; */
  }
`;

// Color selection

const ContainerColor = styled.div`
  width: 80%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const ColorSelection = ({setFieldValue, values, name}) => {
  return (
    <div className="form-group">
      <label className="mb-4">Elige un color</label>
      <ContainerColor className="d-flex flex-row flex-wrap">
        {colors.map((item) => (
          <ColorCheckBox
            key={item.color}
            color={item.color}
            mixed={item.mixed}
            selected={values[name]}
            onClick={() => {
              setFieldValue("mobileColor", item);
              setFieldValue("desktopColor", item);
            }}
          />
        ))}
      </ContainerColor>
    </div>
  );
};

const ColorCheckBox = ({color, mixed, selected, ...props}) => {
  return (
    <StyledColorCheckBox
      color={color}
      mixed={mixed}
      selected={selected && selected.color === color}
      {...props}
    >
      <img src={require("../../../../public/static/selected.png")} alt="" />
    </StyledColorCheckBox>
  );
};

// Background Selection
const BackgroundSelection = ({setFieldValue, values, name}) => {
  return (
    <div className="form-group">
      <label className="mb-4">Elige una imagen de fondo</label>
      <div className="d-flex flex-row flex-wrap">
        {backgrounds.map((background, index) => (
          <BackgroundCheckBox
            key={background}
            background={background}
            selected={values[name]}
            onClick={() => setFieldValue(name, background)}
          />
        ))}
      </div>
    </div>
  );
};

const BackgroundCheckBox = ({background, selected, ...props}) => {
  return (
    <StyledColorCheckBox
      background={background}
      selected={selected && selected === background}
      {...props}
    >
      <img src={require("../../../../public/static/selected.png")} alt="" />
    </StyledColorCheckBox>
  );
};

const ActiveSubmit = ({handleSubmit}) => {
  const {state} = useContext(Alert.AlertContext);
  useEffect(() => {
    if (state.active) handleSubmit();
  }, [state.active]);

  return null;
};

const Welcome = ({debug, initialValues, ...props}) => {
  const [values, setValues] = useState({
    optionOne: "",
    optionTwo: "",
    selected: "optionOne",
    mobileColor: {color: "gray", mixed: true},
    background: "page-background-0.png",
    desktopColor: {color: "gray", mixed: true},
  });

  const {confirmationActive, state} = useContext(Alert.AlertContext);

  useEffect(() => {
    if (initialValues) setValues(initialValues);
  }, [initialValues]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={values}
      validateOnChange={false}
      validationSchema={validationSchema}
      isValidating={false}
      onSubmit={() => {}}
    >
      {({handleSubmit, isValidating, errors, values, setFieldValue}) => (
        <Form>
          <ActiveSubmit handleSubmit={handleSubmit} />

          {/* <div className="load__row mb-5 mt-5">
            <h2 className="load__title load__title--bold">En smartphone</h2>
          </div> */}
          <div className="form-group d-flex align-items-center">
            <Field
              type="radio"
              name="selected"
              value="optionOne"
              id="optionOneRadio"
            />
            <label
              style={{marginBottom: "0"}}
              htmlFor="optionOneRadio"
              className="load__title load__title--bold "
            >
              <span style={{marginLeft: 8, color: "black"}}>Opción 1</span>
            </label>
          </div>
          <FormGroup
            fieldData={fieldsData.optionOne}
            name="optionOne"
            type="text"
            asInput
          />
          <div className="form-group d-flex align-items-center">
            <Field
              type="radio"
              name="selected"
              value="optionTwo"
              id="optionTwoRadio"
            />
            <label
              style={{marginBottom: "0"}}
              htmlFor="optionTwoRadio"
              className="load__title load__title--bold "
            >
              <span style={{marginLeft: 8, color: "black"}}>Opción 2</span>
            </label>
          </div>
          <FormGroup
            fieldData={fieldsData.optionTwo}
            name="optionTwo"
            type="text"
            asInput
          />
          <ColorSelection
            setFieldValue={setFieldValue}
            values={values}
            name="mobileColor"
          />
          {/*  <Seprarator />
          <div className="load__row mb-5 mt-5">
            <h2 className="load__title load__title--bold">En ordenador</h2>
          </div> */}
          <BackgroundSelection
            setFieldValue={setFieldValue}
            values={values}
            name="background"
          />

          {/*   <ColorSelection
            setFieldValue={setFieldValue}
            values={values}
            name="desktopColor"
          /> */}

          <Handler
            updateFormState={props.updateFormState}
            validationSchema={validationSchema}
            formName="welcomeScreen"
          />
          {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
        </Form>
      )}
    </Formik>
  );
};

export const WelcomeUpdate = ({debug, initialValues, userid, ...props}) => {
  const {bindSubmitForm} = props;
  const [flag, setFlag] = useState(true);
  const onWelcomeSubmit = async (values) => {
    if (userid)
      await server.putAsync(`/users/website/${userid}`, {
        welcomeScreen: {...values},
      });
    else {
      await server.putAsync("/users/website", {welcomeScreen: {...values}});
    }
  };
  const Changeflag = () => {
    setFlag(false);
  };

  return (
    <Formik
      initialValues={
        initialValues
          ? initialValues
          : {
              optionOne: "",
              optionTwo: "",
              selected: "optionOne",
              mobileColor: {color: "blue", mixed: true},
              background: "page-background-1.png",
              desktopColor: {color: "blue", mixed: true},
            }
      }
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={onWelcomeSubmit}
    >
      {({values, submitForm, handleSubmit, setFieldValue}) => {
        useEffect(() => {
          Changeflag();
          if (flag === false) {
            bindSubmitForm(submitForm);
          }
        }, [values]);

        return (
          <form onSubmit={handleSubmit}>
            {/*   <div className="load__row mb-5 mt-5">
              <h2 className="load__title load__title--bold">En smartphone</h2>
            </div> */}
            <div className="form-group d-flex align-items-center">
              <Field
                type="radio"
                name="selected"
                value="optionOne"
                id="optionOneRadio"
              />
              <label
                htmlFor="optionOneRadio"
                className="load__title load__title--bold "
              >
                <span style={{marginLeft: 8, color: "black"}}>Opción 1</span>
              </label>
            </div>
            <FormGroup
              fieldData={fieldsData.optionOne}
              name="optionOne"
              type="text"
              asInput
            />
            <div className="form-group d-flex align-items-center">
              <Field
                type="radio"
                name="selected"
                value="optionTwo"
                id="optionTwoRadio"
              />
              <label
                htmlFor="optionTwoRadio"
                className="load__title load__title--bold "
              >
                <span style={{marginLeft: 8, color: "black"}}>Opción 2</span>
              </label>
            </div>
            <FormGroup
              fieldData={fieldsData.optionTwo}
              name="optionTwo"
              type="text"
              asInput
            />
            <ColorSelection
              setFieldValue={setFieldValue}
              values={values}
              name="mobileColor"
            />
            {/*  <Seprarator />
            <div className="load__row mb-5 mt-5">
              <h2 className="load__title load__title--bold">En ordenador</h2>
            </div> */}
            <BackgroundSelection
              setFieldValue={setFieldValue}
              values={values}
              name="background"
            />

            {/* <ColorSelection
              setFieldValue={setFieldValue}
              values={values}
              name="desktopColor"
            /> */}
            {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
          </form>
        );
      }}
    </Formik>
  );
};

export default Welcome;
