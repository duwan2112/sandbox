import styled from "styled-components";
import CallingIcon from "../../../../public/static/call-icon.png";
import EmailIcon from "../../../../public/static/email-icon.png";

const Button = styled.a`
  height: 5rem;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--poppins);
  text-align: center;
  color: var(--color-white) !important;
  background: linear-gradient(
    102.83deg,
    #307dfe 4.95%,
    #3881fc 28.77%,
    #5591f5 71.76%
  );
  border-radius: 5px;
  border: none;

  span {
    margin-left: 30px;
    width: 30px;
    height: 30px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

const Email = styled.p`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  text-align: center;

  a {
    margin-right: 1rem;
    margin-left: 0.5rem;
  }

  span {
    width: 30px;
    height: 30px;
    img {
      width: 100%;
      height: 100%;
      object-fit: center;
    }
  }
`;

const StyledContactButton = styled.div`
  width: 35rem;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 5rem;
  text-align: center;
`;

const ContactButton = ({ phone, email }) => {
  return (
    <StyledContactButton className="d-none d-md-block">
      <Button className="btn btn-primary">
        Llámanos {phone}
        <span>
          <img src={CallingIcon} alt="" />
        </span>
      </Button>
      <Email>
        Email:{" "}
        <a href={`mailto:${email}`} className="btn-link btn-link--black">
          {email}
        </a>
        <span>
          <img src={EmailIcon} alt="" />
        </span>
      </Email>
    </StyledContactButton>
  );
};

export default ContactButton;
