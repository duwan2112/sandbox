import { Formik, Form, useField, Field } from "formik";
import CreditForm from "./CreditForm";
import Link from "next/link";
import FormGroup from "./FormGroup";
import Router from "next/router";
import * as yup from "yup";
import { useState, useContext } from "react";
import ReactLoading from "react-loading";
import { server } from "../../../../utils";
import {
  useElements,
  useStripe,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { Alert } from "../../../contexts";

const fieldsData = {
  areas: {
    label: "¿Cuáles son tus áreas?",
    placeholder: "Divorcios, herencias, despidos",
  },
  location: {
    label: "¿Dónde quieres anunciarte?",
    placeholder: "Madrid, Barcelona",
  },
  invest: {
    label: "¿Cuánto quieres invertir mensualmente?",
    placeholder: "100€",
  },
  fiscalName: {
    label: "Nombre fiscal",
    placeholder: "Bufete Velázquez SL",
  },
  nif: {
    label: "NIF-IVA",
    placeholder: "ES B12345678",
    optional: true,
  },
  direction: {
    label: "Dirección Fiscal",
    placeholder: "C/Velazquez 155, Madrid 28006",
  },
  email: {
    label: "Correo electrónico de contacto",
    placeholder: "adm.velazquez@gmail.com",
  },
  iban: {
    label: "Código IBAN",
    placeholder: "ES 98 2038 5778 98 3000760236",
  },
  swiftbic: {
    label: "SWIFT BIC",
    placeholder: "BSCHESMMXXX",
  },
  importe: {
    label: "Importe de comprobación",
    placeholder: "0,10€",
  },
};

function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
}

const validationSchema = yup.object({
  areas: yup.string().required("Este campo es requerido"),
  location: yup.string().required("Este campo es requerido"),
  invest: yup
    .number()
    .min(0, "Introduce un numero mayor a 0")
    .required("Este campo es requerido")
    .typeError("Este campo es requerido"),
  fiscalName: yup.string().required("Este campo es requerido"),
  nif: yup.string(),
  direction: yup.string().required("Este campo es requerido"),
  email: yup
    .string()
    .email("El email no es valido")
    .required("Este campo es requerido"),
  iban: yup.string().required("Este campo es requerido"),
  swiftbic: yup.string().required("Este campo es requerido"),
  importe: yup.number().min(0.1, "El importe debe ser mayor a 0"),
});

const TinyFormField = ({ fieldData, name, type, disabled }) => {
  const { label, placeholder } = fieldData;
  const [field, meta] = useField(name);

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="form-row align-items-center">
        <div className="col-5">
          <Field
            id={name}
            className={`form-control   ${
              meta.error && meta.touched ? "form-control--error" : ""
            } `}
            name={name}
            type={type}
            placeholder={placeholder}
            onKeyPress={(e) => e.chartCode >= 48}
          />
        </div>
      </div>
      {meta.error && meta.touched && (
        <span className="form-group__error">{meta.error}</span>
      )}
    </div>
  );
};

const CampaignCheckout = ({
  initialValues,
  status,
  activationDate,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [updateCampaign, setUpdateCampaign] = useState(false);
  const { bindSubmitChanges } = props;
  const { setToast } = useContext(Alert.AlertContext);

  const handleCampaignSubmit = async (order, { setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);

    let result;

    if (!status) {
      result = await server.postAsync("/users/v2/payments/campaign", order);
    } else if (status == "created") {
      result = await server.putAsync("/users/v2/payments/campaign", {
        action: "activate",
        payload: order,
      });
    } else if (updateCampaign) {
      result = await server.putAsync("/users/v2/payments/campaign", {
        action: "update",
        payload: order,
      });
    }

    const { ok, data } = result;

    if (ok) {
      setToast(data, "success");
      setTimeout(() => {
        Router.push("/dashboard");
      }, 2000);
    } else {
      setToast(data);
    }

    setSubmitting(false);
    setLoading(false);
  };

  const pauseCampaign = async () => {
    setLoading(true);

    const { ok, data } = await server.putAsync("/users/v2/payments/campaign", {
      action: "pause",
    });

    if (ok) {
      setToast(data, "success");
      setTimeout(() => {
        Router.push("/dashboard");
      }, 2000);
    } else {
      setToast(data);
    }

    setLoading(false);
  };

  return (
    <Formik
      initialValues={
        initialValues
          ? initialValues
          : {
              areas: "",
              location: "",
              invest: "",
              fiscalName: "",
              nif: "",
              direction: "",
              email: "",
              iban: "",
              swiftbic: "",
              importe: "",
            }
      }
      validateOnChange={true}
      validationSchema={validationSchema}
      onSubmit={handleCampaignSubmit}
    >
      {({ values, errors, isSubmitting, submitForm, handleSubmit }) => {
        bindSubmitChanges(submitForm);

        return (
          <form onSubmit={handleSubmit}>
            <FormGroup fieldData={fieldsData.areas} name="areas" type="text" />
            <p className="campaign__text">
              Cuando un usuario busque en Google un abogado para alguna de estas
              áreas les aparecerá tu anuncio
            </p>
            <FormGroup
              fieldData={fieldsData.location}
              name="location"
              type="text"
            />
            <p className="campaign__text">
              Solo se mostrará tu anuncio a los usuarios que se encuentren en
              estas zonas cuando realicen su búsqueda
            </p>
            <p className="campaign__text">
              Puedes indicar uno o varios: paises, ciudades o códigos postales
            </p>
            <FormGroup
              fieldData={fieldsData.invest}
              name="invest"
              type="number"
            />
            <p className="campaign__text">
              Google Ads funciona con todos los presupuestos publicitarios.
              Define un límite para tu presupuesto mensual y nunca tendrás que
              pagar de más. Además, puedes pausar o ajustar la inversión en
              cualquier momento. Selecciona 0€ y guarda los cambios para pausar
              tu anuncio
            </p>
            <p className="campaign__text">
              Paga solo por los resultados que obtengas; Solo pagas cuando un
              usuario hace click para visitar tu sitio web.
            </p>
            <p className="campaign__text">
              Google Ads funciona por un sistema de pujas por lo que el coste
              puede variar en función de varios factores, periódicamente te
              enviaremos un informe con las visualizaciones, los clicks y el
              coste por click de tu anuncio en Google
            </p>

            {status !== "active" || updateCampaign ? (
              <>
                <div className="form-group">
                  <label>Datos de facturación</label>
                </div>
                <FormGroup
                  fieldData={fieldsData.fiscalName}
                  name="fiscalName"
                  type="text"
                />
                <FormGroup fieldData={fieldsData.nif} name="nif" type="text" />
                <FormGroup
                  fieldData={fieldsData.direction}
                  name="direction"
                  type="text"
                />
                <FormGroup
                  fieldData={fieldsData.email}
                  name="email"
                  type="text"
                />
                <div className="form-group">
                  <label>Método de pago</label>
                </div>
                <p className="campaign__text">
                  Solo pagas tras acumular costes a través de un cargo
                  automático que te enviará Google normalmente una vez al mes.
                </p>
                <FormGroup
                  fieldData={fieldsData.iban}
                  name="iban"
                  type="text"
                />
                <FormGroup
                  fieldData={fieldsData.swiftbic}
                  name="swiftbic"
                  type="text"
                />
                <TinyFormField
                  fieldData={fieldsData.importe}
                  name="importe"
                  type="number"
                />

                {!updateCampaign && (
                  <p className="campaign__text">
                    En el plazo de 3-5 días laborales Google depositará una
                    cantidad inferior a 1€ en tu cuenta bancaria para verificar
                    que eres el propietario de la cuenta, cuando lo recibas,
                    ingresalo aquí para poder activar tu campaña de publicidad
                  </p>
                )}

                {
                  <button
                    type="submit"
                    className="btn btn-primary btn-block d-flex justify-content-center"
                    disabled={isSubmitting}
                  >
                    {loading ? (
                      <ReactLoading
                        type="spin"
                        color={"currentColor"}
                        height={30}
                        width={30}
                      />
                    ) : status == "created" ? (
                      "Confirmar importe de comprobación"
                    ) : (
                      <>
                        {!updateCampaign
                          ? "Solicitar importe de comprobación"
                          : "Guardar cambios"}
                      </>
                    )}
                  </button>
                }
                {!updateCampaign && (
                  <p className="campaign__text mt-4">
                    Pulsando este botón autorizas a Google a realizar cargos
                    automáticos en tu cuenta bancaria por tus campañas de
                    publicidad. Recuerda que nunca pagarás un importe superior
                    al indicado más arriba y que solo se te cobrará por los
                    clicks que reciba tu página web.
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="text-center">
                  <p className="campaign__text">
                    Campaña activada el {formatDate(activationDate)}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-outlined-black btn-block d-flex justify-content-center"
                  onClick={() => pauseCampaign()}
                >
                  {loading ? (
                    <ReactLoading
                      type="spin"
                      color={"currentColor"}
                      height={30}
                      width={30}
                    />
                  ) : (
                    "Pausar campaña"
                  )}
                </button>
                <p className="campaign__text mt-4">
                  La inversión mensual pasará a ser de 0€. Podrás volver a
                  activarla cuando quieras estableciendo un nuevo presupuesto
                </p>
                <button
                  className="btn btn-outlined-black btn-block"
                  onClick={() => setUpdateCampaign(true)}
                >
                  Cambiar datos de facturación
                </button>
              </>
            )}

            <div className="text-center mb-5 mt-5">
              <Link href="#">
                <a className="btn-link">Ver faq</a>
              </Link>
            </div>
            {/* {<pre>{JSON.stringify(values, 0, 2)}</pre>}
            {<pre>{JSON.stringify(errors, 0, 2)}</pre>} */}
          </form>
        );
      }}
    </Formik>
  );
};

export default CampaignCheckout;
