import {useState, useEffect, useContext} from "react";
import {Formik, Form, FieldArray, Field} from "formik";
import FormGroup from "./FormGroup";
import Handler from "./Handler";
import * as yup from "yup";
import ReactLoading from "react-loading";
import {Alert} from "../../../contexts/index";
import {server} from "../../../../utils";

const fieldsData = {
  presentation: {
    label: "Presentación",
    placeholder:
      "Bufete Velazquez es un Despacho de Abogados Mercantilista especializado en Derecho Empresarial, Derecho de Marcas y Patentes, Propiedad Intelectual y Reclamaciones Civiles habilitado antes los Tribunales Judiciales Nacionales y Europeos",
  },
  video: {
    label: "Video de presentacion",
    placeholder: "www.youtube.com/javiergonzalez",
    optional: true,
  },
  imageTeam: {label: "Foto del equipo", placeholder: "", optional: true},
};

const validationSchema = yup.object({
  presentation: yup.string().required("Este campo es requerido"),
  video: yup.string().notRequired(),
});

const ImageUploader = ({value, name, ...props}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {setFieldValue} = props;

  const onImageChange = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "hifive");
    setLoading(true);
    const res = await fetch(process.env.CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });
    const file = await res.json();
    setImage(file.secure_url);
    setFieldValue(name, file.secure_url);
    setLoading(false);
  };

  useEffect(() => {
    if (value && value.imageTeam) {
      setImage(value.imageTeam);
    }
  }, [value]);

  return (
    <div className="form-group">
      <div>
        <label htmlFor={name}>Foto de perfil</label>
      </div>
      {!image && !loading ? (
        <>
          <label className="form-image-upload" htmlFor={name}>
            <img
              className="form-image-upload__icon"
              src={require("../../../../public/static/team-icon.png")}
            />
            <span className="form-image-upload__add"></span>
          </label>
          <input
            className="d-none"
            type="file"
            name={name}
            id={name}
            accept="img/png, img/jpeg"
            onChange={onImageChange}
          />
        </>
      ) : (
        <div className="form-image-upload">
          {loading ? (
            <ReactLoading
              type="spin"
              color={"var(--color-primary)"}
              height={30}
              width={30}
            />
          ) : (
            <img src={image} className="form-image-upload__thumbnail" />
          )}
          <span
            className="form-image-upload__remove"
            onClick={() => {
              setImage(null);
              setFieldValue(name, null);
            }}
          ></span>
        </div>
      )}
    </div>
  );
};

const ErrorSend = () => {
  const {setToast} = useContext(Alert.AlertContext);
  useEffect(() => {
    setToast(
      "No se ha podido guardar su seccion. Compruebe que a rellenado todos los campos obligatorios correctamente",
      "danger"
    );
  }, [setToast]);
  return null;
};

const AboutUs = ({debug, initialValues, ...props}) => {
  const [values, setValues] = useState({
    presentation: "",
    video: [""],
    imageTeam: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const {setToast} = useContext(Alert.AlertContext);
  useEffect(() => {
    if (initialValues) setValues(initialValues);
  }, [initialValues]);
  let validating = false;
  return (
    <>
      <Formik
        initialValues={values}
        enableReinitialize={true}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          props.updateFormState({["aboutUs"]: {...values}});
          setToast("Tu seccion ha sido guardado con exito!", "success");
        }}
      >
        {({values, setFieldValue, isValidating, errors}) => {
          return (
            <Form>
              {isValidating ? (validating = true) : null}
              {validating === true && Object.entries(errors).length !== 0 ? (
                <>
                  <ErrorSend />
                  {(validating = false)}
                </>
              ) : null}
              <FormGroup
                asInput="textarea"
                fieldData={fieldsData.presentation}
                name="presentation"
                type="text"
              />{" "}
              <FieldArray
                name="video"
                render={(arrayHelpers) => (
                  <div>
                    <div className="form-group">
                      <label>Video de presentacion</label>
                      {values.video.map((dir, index) => (
                        <div
                          className={`${index > 0 && "mt-5"}`}
                          key={`video.${index}`}
                        >
                          <Field
                            className="form-control"
                            placeholder="www.youtube.com/javiergonzalez"
                            name={`video.${index}`}
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
                        Nuevo video
                      </a>
                    </div>
                  </div>
                )}
              />
              <ImageUploader
                value={values}
                name="imageTeam"
                setFieldValue={setFieldValue}
              />
              <div className="mt-5 mb-5 form-container">
                <button
                  className="btn btn-gradient-primary btn-block btn-shadow d-flex justify-content-center"
                  type="submit"
                  onClick={() => {
                    setIsLoading(true);

                    setTimeout(() => {
                      setIsLoading(false);
                    }, 1000);
                  }}
                >
                  {isLoading === true ? (
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
              {/*  <Handler
                updateFormState={props.updateFormState}
                formName="aboutUs"
                validationSchema={validationSchema}
              /> */}
              {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export const AboutUsUpdate = ({debug, initialValues, userid, ...props}) => {
  const {bindSubmitForm} = props;
  const [flag, setFlag] = useState(true);

  const onAboutUsSubmit = async (values) => {
    if (userid)
      await server.putAsync(`/users/website/${userid}`, {
        aboutUs: {...values},
      });
    else {
      await server.putAsync("/users/website", {aboutUs: {...values}});
    }
  };

  const Changeflag = () => {
    setFlag(false);
  };

  return (
    <>
      <Formik
        initialValues={
          initialValues
            ? initialValues
            : {presentation: "", video: [""], imageTeam: null}
        }
        onSubmit={onAboutUsSubmit}
      >
        {({values, setFieldValue, submitForm, handleSubmit}) => {
          useEffect(() => {
            Changeflag();
            if (flag === false) {
              bindSubmitForm(submitForm);
            }
          }, [values]);

          return (
            <form onSubmit={handleSubmit}>
              <FormGroup
                asInput="textarea"
                fieldData={fieldsData.presentation}
                name="presentation"
                type="text"
              />
              <FieldArray
                name="video"
                render={(arrayHelpers) => (
                  <div>
                    <div className="form-group">
                      <label>Video de presentacion</label>
                      {values.video.map((dir, index) => (
                        <div
                          className={`${index > 0 && "mt-5"}`}
                          key={`video.${index}`}
                        >
                          <Field
                            className="form-control"
                            placeholder="www.youtube.com/javiergonzalez"
                            name={`video.${index}`}
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
                        Nuevo video
                      </a>
                    </div>
                  </div>
                )}
              />

              <ImageUploader
                value={values}
                name="imageTeam"
                setFieldValue={setFieldValue}
              />
              {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : ""}
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default AboutUs;
