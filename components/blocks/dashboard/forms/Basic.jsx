import {useState, useEffect, useContext} from "react";
import FormGroup from "./FormGroup";
import Thumbnail from "../Thumbnail";
import styled from "styled-components";
import {Field, Formik, Form, FieldArray} from "formik";
import Handler from "./Handler";
import * as yup from "yup";
import {server} from "../../../../utils";
import ReactLoading from "react-loading";
import {Alert} from "../../../contexts/index";

import logotipo from "../../../../public/static/logotipo.png";
import logotipoArrow from "../../../../public/static/logotipo-arrow.png";

import logos from "../../../Logo";

const fieldsData = {
  bufeteName: {
    label: "Nombre del bufete o abogado",
    placeholder: "Bufete Velazquez",
  },
  url: {
    label: "Direccion Web",
    placeholder: "bufetevelasque",
  },
  eslogan: {
    label: "Eslogan",
    placeholder: "Tu abogado de confianza",
    optional: true,
  },
  logo: {
    name: {placeholder: "Bufete Velazquez"},
    initials: {placeholder: "BV"},
  },
  phone: {label: "Contácto por teléfono", placeholder: "916504211"},
  whatsapp: {label: "Contácto por WhatsApp", placeholder: "625678945"},
  email: {
    label: "Contácto por email",
    placeholder: "info@bufetevelazquez.com",
  },
  direction: {
    label: "Dirección",
    placeholder: "C/Velazquez, 155, 3ºA, 28005 Madrid",
  },
};

const UploadAnother = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(110%);
`;

const LogotipoContainer = styled.div`
  position: absolute;
  top: -100px;
  left: -250px;

  .logotipo {
    width: 14.1rem;
  }

  .logotipo-arrow {
    width: 6.9rem;
  }
`;

const LogoSelectionMobile = ({setFieldValue, values}) => {
  const [selectLogo, setSelectLogo] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onImageChange = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "hifive");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/felix-lopez-tech/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setFieldValue("logo.image", file.secure_url);
    setLoading(false);
  };

  useEffect(() => {
    if (values.logo.image.length > 2) {
      setImage(values.logo.image);
    }
  }, [values]);

  return (
    <>
      <div className="mb-5">
        <a
          className="btn-link"
          role="button"
          onClick={() => setSelectLogo(!selectLogo)}
        >
          Cambiar logo
        </a>
      </div>
      <div>
        {" "}
        {selectLogo ? (
          <div className="mb-5 row">
            {logos.map((Logo, index) => (
              <LogoCheckbox
                onClick={() => {
                  setImage(null);
                  setSelectLogo(!selectLogo);
                }}
                key={`logo.image.${index}`}
                id={`logo.image.${index}`}
                name={`logo.image`}
                value={index}
              >
                <Logo
                  name={values.logo.name}
                  initials={values.logo.initials}
                  type={values.type}
                />
              </LogoCheckbox>
            ))}

            <label htmlFor="logoUpload" className="btn-link form-control-logo">
              Subir logo
              <input
                name={`logo.image`}
                type="file"
                id="logoUpload"
                className="d-none"
                accept="image/png, image/jpeg"
                onChange={async (event) => {
                  setSelectLogo(!setSelectLogo);
                  await onImageChange(event);
                }}
              />
            </label>
          </div>
        ) : (
          <div className="mb-5 form-control-logo">
            {!image ? (
              <>
                {logos
                  .filter(
                    (component, index) => index.toString() === values.logo.image
                  )
                  .map((Logo, index) => (
                    <Logo
                      key={index}
                      name={values.logo.name}
                      initials={values.logo.initials}
                      type={values.type}
                    />
                  ))}
              </>
            ) : (
              <>
                {loading ? (
                  <ReactLoading
                    type="spin"
                    color={"var(--color-primary)"}
                    height={30}
                    width={30}
                  />
                ) : (
                  <img src={image} alt="" />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const LogoSelection = ({setFieldValue, values}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onImageChange = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "hifive");
    setImage(null);
    setLoading(true);
    const res = await fetch(process.env.CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });
    const file = await res.json();
    setImage(file.secure_url);
    setFieldValue("logo.image", file.secure_url);
    setLoading(false);
  };

  useEffect(() => {
    if (values.logo.image.length > 2) {
      setImage(values.logo.image);
    }
  }, [values]);

  return (
    <>
      <div className="">
        <label
          css={`
            font-size: 16px;
            color: #000;
            margin-top: 30px;
            font-weight: 600;
          `}
          className="d-none d-md-block mb-5"
        >
          {" "}
          Elije uno
        </label>

        <div
          className="row justify-content-md-around"
          css={`
            @media ${(props) => props.theme.mediaQueries.medium} {
              width: 70rem;
              transform: translateX(-5%);
            }
          `}
        >
          {logos.map((Logo, index) => (
            <LogoCheckbox
              key={index}
              name={`logo.image`}
              value={index}
              selected={values.logo.image}
              onClick={() => {
                setImage(null);
              }}
            >
              <Logo
                name={values.logo.name}
                initials={values.logo.initials}
                type={values.type}
              ></Logo>
            </LogoCheckbox>
          ))}

          <div
            className={`form-control-logo  col-md-5 relative ${
              image ? "form-control-logo--selected" : ""
            }`}
          >
            {!image && !loading ? (
              <label
                htmlFor="logoUpload"
                className="btn-link"
                css={`
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                `}
              >
                Subir logo
                <input
                  name={`logo.image`}
                  type="file"
                  id="logoUpload"
                  className="d-none"
                  accept="image/png, image/jpeg"
                  onChange={onImageChange}
                />
              </label>
            ) : (
              <>
                {loading ? (
                  <ReactLoading
                    type="spin"
                    color={"var(--color-primary)"}
                    height={30}
                    width={30}
                  />
                ) : (
                  <>
                    <img src={image} alt="" />
                  </>
                )}
              </>
            )}
            {image && !loading && (
              <UploadAnother>
                <label
                  htmlFor="logoUpload"
                  className="btn-link"
                  css={`
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  `}
                >
                  Subir otro
                  <input
                    name={`logo.image`}
                    type="file"
                    id="logoUpload"
                    className="d-none"
                    accept="image/png, image/jpeg"
                    onChange={onImageChange}
                  />
                </label>
              </UploadAnother>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const LogoCheckbox = ({id, name, children, value, onClick, ...props}) => {
  const {selected} = props;
  return (
    <label
      className={`form-control-logo col-md-5 ${
        selected === value.toString() ? `form-control-logo--selected` : ""
      }`}
      htmlFor={id}
    >
      <Field
        name={name}
        type="radio"
        className="d-none"
        value={value}
        id={id}
        onClick={onClick}
      />
      {children}
    </label>
  );
};

const validationSchema = yup.object({
  bufeteName: yup
    .string()
    .max(20, "Maximo 20 caracteres")
    .required("Este campo es requerido"),
  eslogan: yup.string().max(40, "Maximo 40 caracteres").notRequired(),
  url: yup
    .string()
    .matches(/^[A-Za-z0-9. _-]+$/, "Formato invalido")
    .min(5, "Minimo 5 caracteres")
    .max(30, "Maximo 30 carácteres")
    .required("Este campo es requerido"),
  logo: yup.object({
    name: yup
      .string()
      .min(6, "Minimo 6 caracteres")
      .max(20, "Maximo 20 caracteres")
      .required("Este campo es requerido"),
    initials: yup.string().max(3, "Este campo solo puede tener 3 caracteres"),
  }),
  phone: yup
    .string()
    .max(16, "Maximo 20 caracteres")
    .required("Este campo es requerido"),
  whatsapp: yup
    .string()
    .max(16, "Maximo 20 caracteres")
    .required("Este campo es requerido"),
  email: yup
    .string()
    .email("El email no es valido")
    .required("Este campo es requerido"),
  direction: yup.string().required("Este campo es requerido"),
});

const ActiveSubmit = ({handleSubmit}) => {
  const {state} = useContext(Alert.AlertContext);
  useEffect(() => {
    if (state.active) handleSubmit();
  }, [state.active]);

  return null;
};

// Basic

const Basic = ({root, debug, initialValues, ...props}) => {
  const [values, setValues] = useState({
    bufeteName: "",
    eslogan: "",
    url: "",
    logo: {
      name: "",
      initials: "",
      image: "0",
    },
    type: "bufete",
    phone: "",
    whatsapp: "",
    email: "",
    direction: [""],
  });

  const {confirmationActive, state} = useContext(Alert.AlertContext);

  useEffect(() => {
    if (initialValues) setValues(initialValues);
  }, [initialValues]);
  let validating = false;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={values}
      validateOnChange={false}
      validationSchema={validationSchema}
      isValidating={false}
      onSubmit={() => {}}
    >
      {({
        handleSubmit,
        isValidating,
        touched,
        values,
        errors,
        setFieldValue,
      }) => (
        <Form>
          <ActiveSubmit handleSubmit={handleSubmit} />
          <FormGroup
            fieldData={fieldsData.bufeteName}
            name="bufeteName"
            type="text"
          />
          <div className="form-group">
            <label> Dirección web</label>
            <div className="d-flex align-items-center">
              <p style={{margin: 0}} className="text">
                www.
              </p>
              <Field
                className={`form-control ${
                  touched.url && errors.url ? `form-control--error` : ""
                } `}
                type="text"
                name="url"
                placeholder="bufetevelazquez"
                value={values.url.replace(/ /g, "").trim().toLowerCase()}
              />
              <p style={{margin: 0}} className="text">
                .hfma.es
              </p>
            </div>
            {touched.url && errors.url && (
              <span className="form-group__error">{errors.url}</span>
            )}
          </div>
          <FormGroup
            fieldData={fieldsData.eslogan}
            name="eslogan"
            type="text"
          />
          <div className="form-group" style={{marginBottom: 0}}>
            <label htmlFor="logoname">Logo</label>
            <div className="form-row">
              <div className="col-9">
                <FormGroup
                  id="logoname"
                  fieldData={fieldsData.logo.name}
                  name="logo.name"
                  type="text"
                />
              </div>
              <div className="col-3">
                <Field
                  name={`logo.initials`}
                  type="text"
                  maxLength="3"
                  placeholder={fieldsData.logo.initials.placeholder}
                  className="form-control"
                ></Field>
              </div>
            </div>
          </div>
          <div className="form-group ">
            <div className="d-flex align-items-center">
              <label>Tipo: </label>
              <span
                className="ml-3 text-capitalize"
                style={{
                  fontSize: "1.4rem",
                  lineHeight: "19px",
                  marginBottom: "0.3em",
                }}
              >
                {values.type === "bufete" ? "Abogados" : "Tu abogado"}
              </span>
            </div>
            <div className="mb-5">
              <a
                className="btn-link text-capitalize"
                role="button"
                onClick={() =>
                  setFieldValue(
                    "type",
                    values.type === "bufete" ? "abogado" : "bufete"
                  )
                }
              >
                Cambiar: {values.type === "bufete" ? "Tu abogado" : "Abogados"}
              </a>
            </div>
          </div>
          <div className="d-md-none">
            <LogoSelectionMobile
              setFieldValue={setFieldValue}
              values={values}
            />
          </div>
          <div className="d-none d-md-block position-relative">
            <LogoSelection setFieldValue={setFieldValue} values={values} />
            <LogotipoContainer>
              <img className="logotipo" src={logotipo} />
              <img className="logotipo-arrow" src={logotipoArrow} />
            </LogotipoContainer>
          </div>
          <FormGroup fieldData={fieldsData.phone} name="phone" type="tel" />
          <FormGroup
            fieldData={fieldsData.whatsapp}
            name="whatsapp"
            type="tel"
          />
          <FormGroup fieldData={fieldsData.email} name="email" type="email" />
          <FieldArray
            name="direction"
            render={(arrayHelpers) => (
              <div>
                <div className="form-group">
                  <label>Dirección</label>
                  {values.direction.map((dir, index) => (
                    <div
                      className={`${index > 0 && "mt-5"}`}
                      key={`direction.${index}`}
                    >
                      <Field
                        className="form-control"
                        placeholder="C/Velazquez, 155, 3ºA, 28005 Madrid"
                        name={`direction.${index}`}
                        type="text"
                      />

                      {index > 0 && (
                        <div className="text-right">
                          <a
                            role="button"
                            className="btn-link btn-link--black"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Eliminar
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center mb-5">
                  <a
                    className="btn-link"
                    role="button"
                    onClick={async () => {
                      arrayHelpers.push("");
                      //await props.submitFormData(values);
                    }}
                  >
                    Nueva Dirección
                  </a>
                </div>
              </div>
            )}
          />
          <Handler
            updateFormState={props.updateFormState}
            validationSchema={validationSchema}
            formName="basic"
          ></Handler>
          {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
          {debug ? <pre>{JSON.stringify(errors, null, 2)}</pre> : ""}
        </Form>
      )}
    </Formik>
  );
};

export const BasicUpdate = ({
  visible,
  debug,
  initialValues,
  userid,
  ...props
}) => {
  const {bindSubmitForm} = props;
  const [flag, setFlag] = useState(true);

  const onBasicSubmit = async (values) => {
    if (userid)
      await server.putAsync(`/users/website/${userid}`, {
        basic: {...values},
      });
    else {
      await server.putAsync("/users/website", {basic: {...values}});
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
              bufeteName: "",
              eslogan: "",
              url: "",
              logo: {
                name: "",
                initials: "",
                image: "0",
              },
              type: "bufete",
              phone: "",
              whatsapp: "",
              email: "",
              direction: [""],
            }
      }
      enableReinitialize={true}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={onBasicSubmit}
    >
      {({values, errors, setFieldValue, submitForm, handleSubmit}) => {
        useEffect(() => {
          Changeflag();
          if (flag === false) {
            bindSubmitForm(submitForm);
          }
        }, [values]);
        return (
          <form onSubmit={handleSubmit}>
            <FormGroup
              fieldData={fieldsData.bufeteName}
              name="bufeteName"
              type="text"
            />
            {!visible ? (
              <div className="form-group">
                <label>Dirección web</label>
                <div className="d-flex align-items-center">
                  <p style={{margin: 0}} className="text">
                    www.
                  </p>
                  <Field
                    className={`form-control ${
                      errors && errors.url ? `form-control--error` : ""
                    } `}
                    type="text"
                    name="url"
                    placeholder="bufetevelazquez"
                  />
                  <p style={{margin: 0}} className="text">
                    .hfma.es
                  </p>
                </div>
                {errors && errors.url && (
                  <span className="form-group__error">{errors.url}</span>
                )}
              </div>
            ) : null}

            <FormGroup
              fieldData={fieldsData.eslogan}
              name="eslogan"
              type="text"
            />

            <div className="form-group" style={{marginBottom: 0}}>
              <label htmlFor="logoname">Logo</label>
              <div className="form-row">
                <div className="col-9">
                  <FormGroup
                    id="logoname"
                    fieldData={fieldsData.logo.name}
                    name="logo.name"
                    type="text"
                  />
                </div>
                <div className="col-3">
                  <Field
                    name={`logo.initials`}
                    type="text"
                    maxLength="3"
                    placeholder={fieldsData.logo.initials.placeholder}
                    className="form-control"
                  ></Field>
                </div>
              </div>
            </div>

            <div className="form-group ">
              <div className="d-flex align-items-center">
                <label>Tipo: </label>
                <span
                  className="ml-3 text-capitalize"
                  style={{fontSize: "1.4rem"}}
                >
                  {values.type === "bufete" ? "Abogados" : "Tu abogado"}
                </span>
              </div>
              <div className="mb-5">
                <a
                  className="btn-link text-capitalize"
                  role="button"
                  onClick={() =>
                    setFieldValue(
                      "type",
                      values.type === "bufete" ? "abogado" : "bufete"
                    )
                  }
                >
                  Cambiar:{" "}
                  {values.type === "bufete" ? "Tu abogado" : "Abogados"}
                </a>
              </div>
            </div>

            <div className="d-md-none">
              <LogoSelectionMobile
                setFieldValue={setFieldValue}
                values={values}
              />
            </div>

            <div className="d-none d-md-block position-relative">
              <LogoSelection setFieldValue={setFieldValue} values={values} />
              <LogotipoContainer>
                <img className="logotipo" src={logotipo} />
                <img className="logotipo-arrow" src={logotipoArrow} />
              </LogotipoContainer>
            </div>

            <FormGroup fieldData={fieldsData.phone} name="phone" type="tel" />
            <FormGroup
              fieldData={fieldsData.whatsapp}
              name="whatsapp"
              type="tel"
            />
            <FormGroup fieldData={fieldsData.email} name="email" type="email" />
            <FieldArray
              name="direction"
              render={(arrayHelpers) => (
                <div>
                  <div className="form-group">
                    <label>Dirección</label>
                    {values.direction.map((dir, index) => (
                      <div
                        className={`${index > 0 && "mt-5"}`}
                        key={`direction.${index}`}
                      >
                        <Field
                          className="form-control"
                          placeholder="C/Velazquez, 155, 3ºA, 28005 Madrid"
                          name={`direction.${index}`}
                          type="text"
                        />

                        {index > 0 && (
                          <div className="text-right">
                            <a
                              role="button"
                              className="btn-link btn-link--black"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              Eliminar
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="text-center mb-5">
                    <a
                      className="btn-link"
                      role="button"
                      onClick={async () => {
                        arrayHelpers.push("");
                        //await props.submitFormData(values);
                      }}
                    >
                      Nueva Dirección
                    </a>
                  </div>
                </div>
              )}
            />
            {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
            {debug ? <pre>{JSON.stringify(errors, null, 2)}</pre> : ""}
          </form>
        );
      }}
    </Formik>
  );
};

export default Basic;
