import React, {useState, useEffect, useContext} from "react";
import {Formik, Form, FieldArray, Field} from "formik";
import * as yup from "yup";
import ReactLoading from "react-loading";
import {v4 as uuidv4} from "uuid";
import FormGroup from "../../forms/FormGroup";
import styled from "styled-components";
import {server} from "../../../../../utils";
import {Alert} from "../../../../../components/contexts/index";

const Container = styled.div`
  padding-bottom: 40px;
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
`;
const fieldsData = {
  fullName: {label: "Nombre y apellido", placeholder: "Javier González"},
  experience: {label: "Años de experiencia", placeholder: "5", optional: true},
  image: {label: "Foto de perfil", placeholder: " "},
  video: {
    label: "Video de perfil",
    placeholder: "www.youtube.com/javiergonzalez",
    optional: true,
  },
  linkedin: {
    label: "Linkedin",
    placeholder: "www.linkedin/javiergonzalez.com",
    optional: true,
  },
  eslogan: {
    label: "Eslogan",
    placeholder: "Derecho de familia y penal",
    optional: true,
  },
  bio: {
    label: "Biografía",
    placeholder: `Soy Javier González, abogado en ejercicio desde enero del año 2003. Soy un abogado vocacional, un apasionado del Derecho y de la Justicia

Desde mis comienzos profesionales me vengo dedicando al Derecho de Familia y al Derecho Penal, mis dos grandes pasiones en lo que al Derecho se refiere y, dentro del Derecho Penal, especialmente a la «Violencia de género».
  
Creo en la profesión de abogado como servicio a la sociedad, creo que  las relaciones humanas son la base de la relación abogado-cliente y de mi pasión por el ejercicio de la abogacía.
  `,
    optional: true,
  },
  curriculum: {
    label: "Curriculum",
    placeholder: `Me colegié en enero de 2003 en el Real e Ilustre Colegio de Abogados de Zaragoza, y me dedico desde entonces al ejercicio libre de la profesión, con despacho propio.

Estoy especializado en las áreas de Derecho de Familia y Penal –Violencia de Género–, con amplia experiencia profesional en estos ámbitos del Derecho, tanto en la asesoría jurídica como en la actuación en procedimientos judiciales.
  
Formación universitaria:
Máster en Práctica Jurídica por la Universidad de Zaragoza (2002/2003).
Licenciado en Derecho por la Universidad de Zaragoza (1994/1999).
  `,
    optional: true,
  },
  specialities: {
    label: "Áreas de especialidad",
    placeholder: `Derecho penal - violencia de género`,
    optional: true,
  },
};
const updateValidationSchema = yup.object({
  fullName: yup.string().required("Este campo es requerido"),
  experience: yup.number().notRequired(),
  linkedin: yup.string().url("El link no es valido").notRequired(),
  eslogan: yup.string().notRequired(),
  bio: yup.string().notRequired(),
  gender: yup.string(),
  specialities: yup.array().of(yup.string().notRequired()).notRequired(),
  curriculum: yup.string().notRequired(),
  specialities: yup.string().notRequired(),
});

const ProfileUploader = ({root, value, ...props}) => {
  const name = root ? `${root}.image` : "image";
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
    if (value.image) {
      setImage(value.image);
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
              src={require("../../../../../public/static/lawyer-icon.png")}
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
export default function FormLawyers({
  initialValues,
  type,
  id,
  reload,
  setActiveForm,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const {setToast} = useContext(Alert.AlertContext);

  const sendForm = async (values) => {
    setIsLoading(true);

    const {ok, data} = await server.putAsync("/users/subareas/editSubarea", {
      subareaId: id,
      type,
      filter: "lawyers",
      data: values,
    });

    if (ok) {
      reload();
      setIsLoading(false);
      setActiveForm(null);
      setToast("Seccion de abogados actualizada", "success");
    } else {
      setToast(
        "Ocurrio un error al intentar actualizar la seccion de abogados",
        "danger"
      );
    }
  };

  return (
    <Formik
      initialValues={
        initialValues
          ? initialValues
          : {
              id: uuidv4(),
              fullName: "",
              experience: "",
              gender: "Abogado",
              image: null,
              video: "",
              linkedin: "",
              eslogan: "",
              bio: "",
              curriculum: "",
              specialities: [""],
            }
      }
      enableReinitialize={true}
      validationSchema={updateValidationSchema}
      onSubmit={(data) => sendForm(data)}
    >
      {({values, errors, handleSubmit, setFieldValue, submitForm}) => {
        return (
          <form onSubmit={handleSubmit}>
            <FormGroup
              fieldData={fieldsData.fullName}
              name="fullName"
              type="text"
            />
            <FormGroup
              fieldData={fieldsData.experience}
              name="experience"
              type="number"
            />
            <div className="form-group">
              <label>
                Género: <span>{values.gender}</span>
              </label>

              <div className="mt-4">
                <a
                  role="button"
                  className="btn-link"
                  onClick={() => {
                    setFieldValue(
                      `gender`,
                      values.gender === "Abogado" ? "Abogada" : "Abogado"
                    );
                  }}
                >
                  Cambiar: {values.gender === "Abogado" ? "Abogada" : "Abogado"}
                </a>
              </div>
            </div>
            <ProfileUploader setFieldValue={setFieldValue} value={values} />

            <FormGroup fieldData={fieldsData.video} name="video" type="text" />

            <FormGroup
              fieldData={fieldsData.linkedin}
              name="linkedin"
              type="text"
            />
            <FormGroup
              fieldData={fieldsData.eslogan}
              name="eslogan"
              type="text"
            />

            <FormGroup
              fieldData={fieldsData.bio}
              asInput="textarea"
              name="bio"
              type="text"
            />
            <FormGroup
              fieldData={fieldsData.curriculum}
              asInput="textarea"
              name="curriculum"
              type="text"
            />
            <FieldArray
              name={`specialities`}
              render={(arrayHelpers) => (
                <>
                  <div className="form-group">
                    <label>
                      Áreas de especialidad <span>(opcional)</span>
                    </label>
                    {values.specialities.map((speciality, index) => (
                      <div className="mt-5" key={`specialities.${index}`}>
                        <Field
                          className="form-control"
                          placeholder="Derecho penal - violencia de género"
                          name={`specialities.${index}`}
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
                      role="button"
                      className="btn-link"
                      onClick={() => arrayHelpers.push("")}
                    >
                      Nueva especialidad
                    </a>
                  </div>
                </>
              )}
            />
            <Container>
              <button
                type="submit"
                style={{fontSize: "1.7rem"}}
                className={`fixed btn btn-primary
              } btn-block mb-5 d-flex justify-content-center`}
              >
                <>
                  {" "}
                  {isLoading ? (
                    <ReactLoading
                      type="spin"
                      color={"currentColor"}
                      height={30}
                      width={30}
                    />
                  ) : (
                    "Guardar"
                  )}{" "}
                </>
              </button>
            </Container>
          </form>
        );
      }}
    </Formik>
  );
}
