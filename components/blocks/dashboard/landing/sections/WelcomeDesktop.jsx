import React, {useState} from "react";
import styled from "styled-components";
import CheckBox from "../../forms/Checkbox";
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 450px;
  margin: 0;
  padding: 0 10rem;

  box-sizing: border-box;

  @media (max-width: 968px) {
    padding: 0 1rem;
  }
  .welcome-title {
    font-weight: 700;
    font-size: 3.3rem;
    margin: 0;
  }
  .welcome-subtitle {
    padding: 2rem 0 4rem 0;

    font-weight: 400;
    font-size: 1.8rem;
    line-height: 25px;
    margin: 0;
  }
  .container-info {
    color: rgba(0, 0, 0, 0.8);
  }
  .contact {
    font-weight: 600;
    font-size: 2rem;

    letter-spacing: -0.02em;
  }
  .number {
    font-weight: 700;
    font-size: 4.5rem;

    letter-spacing: 0.03em;
  }
  .email,
  .whatsapp {
    font-weight: 600;
    font-size: 1.9rem;
  }
`;

const Contact = styled.div`
  display: flex;
  height: 400px;
  justify-content: flex-end;
  margin-top: 3rem;

  .container-form {
    width: 320px;
    margin-bottom: 5rem;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.02);
  }
  .form {
    background: white;
    height: 75%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 2rem;
    .call {
      font-weight: 400;
      font-size: 2.7rem;
      letter-spacing: -0.04rem;
      padding-bottom: 3rem;
    }
    .input-form {
      width: 100%;
      background: #ededed;
      border: none;
      height: 50px;
      margin-bottom: 1rem;
      padding-left: 2rem;
      font-size: 1.7rem;
      border-radius: 5px;
      &:focus {
        outline: none;
      }
    }
    .text-form {
      padding-top: 2rem;
      padding-left: 2rem;
      font-size: 1.2rem;
      span {
        margin-top: 0.1rem;
        padding-left: 1rem;
      }
    }
  }
  .submit {
    background: #17243e;
    height: 25%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      background: #f0f0f0;
      width: 90%;
      height: 50%;
      border-radius: 35px;
      border: none;
      font-size: 15px;
      letter-spacing: -0.02rem;
      font-weight: 400;
      &:focus {
        outline: none;
      }
    }
  }
`;

export default function WelcomeDesktop({email, principal, interviews}) {
  const [form, setForm] = useState({number: "", question: "", checkbox: false});

  const onChangeForm = (e) => {
    console.log(e.target);
    setForm({...form, [e.target.name]: e.target.value});
  };
  const submitForm = () => {
    if (form.number.trim() && form.question.trim() && form.checkbox) {
      window.location.href = `mailto:${email}?Subject=${form.question}&body=Número Telefónico: ${form.number}`;
    }
  };
  return (
    <Container className="row">
      <div className="col-6">
        {" "}
        <h1 className="welcome-title">{principal.title}</h1>
        <h3 className="welcome-subtitle">{principal.description}</h3>
        <div className="container-info">
          <h4 className="contact">
            {(interviews.phone !== "" ||
              interviews.email !== "" ||
              interviews.whatsapp !== "") &&
              `Contáctanos`}
          </h4>
          <p className="number">{interviews.phone}</p>
          <p className="email">{interviews.email}</p>
          <p className="whatsapp">
            {" "}
            {interviews.whatsapp !== "" && `Whatsapp: ${interviews.whatsapp}`}
          </p>
        </div>
      </div>
      <Contact className="col-6">
        <div className="container-form row">
          <div className="col-12 form">
            <h4 className="call">Solicitar Llamada</h4>
            <form action="">
              <input
                name="number"
                value={form.number}
                onChange={onChangeForm}
                placeholder="Telefono"
                className="input-form"
                type="text"
              />

              <input
                name="question"
                value={form.question}
                onChange={onChangeForm}
                placeholder="Pregunta"
                className="input-form"
                type="text"
              />

              <div className="d-flex text-form">
                <div
                  style={{cursor: "pointer"}}
                  onClick={() => {
                    onChangeForm({
                      target: {name: "checkbox", value: !form.checkbox},
                    });
                  }}
                >
                  {" "}
                  <CheckBox color={"gray"} checked={form.checkbox} />{" "}
                </div>
                <span>Acepto la politica de privacidad</span>{" "}
              </div>
            </form>
          </div>
          <div className="col-12 submit">
            {" "}
            <button onClick={submitForm}>Solicitar Llamada Gratuita</button>
          </div>
        </div>{" "}
      </Contact>
    </Container>
  );
}
