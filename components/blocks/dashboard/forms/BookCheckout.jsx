import {Form, Formik, Field, useField} from "formik";
import ReactLoading from "react-loading";
import {
  useElements,
  useStripe,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import FormGroup from "./FormGroup";
import CreditForm from "./CreditForm";
import * as yup from "yup";
import {useState, useContext} from "react";
import {server} from "../../../../utils";
import {Alert} from "../../../contexts";
import Router from "next/router";

const fieldsData = {
  photos: {
    label: "Cantidad de abogados (sesión de fotos)",
    placeholder: "5",
  },
  videos: {
    label: "Cantidad de abogados (sesión de video)",
    placeholder: "5",
  },
  direction: {
    label: "Dirección de las oficinas o despacho",
    placeholder: "Avenida de América 155 4b",
  },
  contact: {
    label: "Teléfono o email de contacto",
    placeholder: "662 389 390",
  },
};

const validationSchema = yup.object({
  photos: yup.number(),
  videos: yup.number(),
  direction: yup.string().required("Este campo es requerido"),
  contact: yup.string().required("Este campo es requerido"),
});

const TinyFormField = ({fieldData, name, type, price}) => {
  const {label, placeholder} = fieldData;
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
            min="1"
            onKeyPress={(e) => e.chartCode >= 48}
          />
        </div>
        <div className="col-3">
          <p
            css={`
              font-family: var(--quicksand);
              font-size: 1.6rem;
              line-height: 2.7rem;
            `}
          >
            <span>{price}€/sesión</span>
          </p>
        </div>
      </div>
      {meta.error && meta.touched && (
        <span className="form-group__error">{meta.error}</span>
      )}
    </div>
  );
};

// PRICES
// const SESION_PRICE = 49;
// const DESPLAZAMIENTO_PRICE = 150;
// const AMOUNT_FOR_NOT_CHARGE_TRAVELS = 150;

const BookCheckoutForm = ({debug, user, prices}) => {
  const {setToast} = useContext(Alert.AlertContext);

  const {
    fotos: PHOTO_PRICE,
    videos: VIDEO_PRICE,
    gastos: DESPLAZAMIENTO_PRICE,
    notFees: AMOUNT_FOR_NOT_CHARGE_TRAVELS,
  } = prices;

  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const getImporte = (photos, videos) => {
    if (!photos && !videos) {
      return 0;
    }

    let amount = photos * PHOTO_PRICE + videos * VIDEO_PRICE;
    if (amount >= AMOUNT_FOR_NOT_CHARGE_TRAVELS) return amount;
    else return amount + DESPLAZAMIENTO_PRICE;
  };

  const travelFees = (photos, videos) => {
    if (!photos && !videos) {
      return false;
    }

    photos = Number(photos);
    videos = Number(videos);

    return (
      photos * PHOTO_PRICE + videos * VIDEO_PRICE >=
      AMOUNT_FOR_NOT_CHARGE_TRAVELS
    );
  };

  const handleBookSubmit = async (order, {setSubmitting}) => {
    if (order.photos.length === 0 && order.videos.length === 0)
      return setToast(
        "Debes introducir una cantidad para una sesión de fotos o videos",
        "danger"
      );

    setSubmitting(true);
    setLoading(true);
    window.location.href = `mailto:marketingabogados.hfma@gmail.com?Subject=Reservacion de Sesion&body=Número de Fotos: ${
      order.photos.length === 0 ? "0" : order.photos
    }%0ANúmero de Videos: ${order.videos.length === 0 ? "0" : order.videos}%0A${
      order.direction.length !== 0
        ? `Direccion: ${order.direction}`
        : "Direccion: No proporcionada"
    }%0A${
      order.contact.length !== 0
        ? `Contacto: ${order.contact}`
        : "Contacto: No proporcionado"
    }`;

    /*   const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    console.log("change");

    if (error) {
      setToast("Hay un error con los datos de su tarjeta");
      setLoading(false);
      return;
    }
    console.log(paymentMethod);
    const {id} = paymentMethod;
    
    const { ok, data } = await server.postAsync(
      "/users/payments/sessionbooking",
      {
        userId: user._id,
        order,
        id,
      }
    ); 

    if (ok) {
      setToast(
        "Pago realizado con éxito, te enviaremos un email con más informacion",
        "success"
      );
      setTimeout(() => {
        Router.push("/dashboard");
        window.scrollTo(0, 0);
      }, 1200);
    } else {
      setToast(data);
    } */

    setSubmitting(false);
    setLoading(false);
  };

  return (
    <Formik
      initialValues={{
        photos: "",
        videos: "",
        direction: "",
        contact: "",
      }}
      validateOnChange={true}
      validationSchema={validationSchema}
      onSubmit={handleBookSubmit}
    >
      {({values, isSubmitting}) => {
        let importe = getImporte(
          values.photos ? Number(values.photos) : 0,
          values.videos ? Number(values.videos) : 0
        );

        return (
          <Form>
            <TinyFormField
              price={PHOTO_PRICE}
              name="photos"
              fieldData={fieldsData.photos}
              type="number"
            />
            <TinyFormField
              price={VIDEO_PRICE}
              name="videos"
              fieldData={fieldsData.videos}
              type="number"
            />
            <div className="mb-5">
              <p style={{color: "#676767 "}} className="">
                Desplazamiento:{" "}
                {travelFees(values.photos, values.videos)
                  ? "gratis"
                  : `${DESPLAZAMIENTO_PRICE}€`}
              </p>
            </div>
            <FormGroup
              fieldData={fieldsData.direction}
              name="direction"
              type="text"
            />
            <FormGroup
              fieldData={fieldsData.contact}
              name="contact"
              type="text"
            />

            <p
              style={{color: "black"}}
              className="text text-center text-lg-left"
            >
              Importe total: {importe} € +IVA 21%
            </p>

            {/*   <CreditForm /> */}

            {debug ? <pre>{JSON.stringify(values, null, 2)}</pre> : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-block d-flex justify-content-center"
            >
              {loading ? (
                <ReactLoading
                  type="spin"
                  color={"currentColor"}
                  height={30}
                  width={30}
                />
              ) : (
                "Reservar"
              )}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default BookCheckoutForm;
