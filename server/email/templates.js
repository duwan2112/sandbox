const {EMAILS} = require("../../utils/emails");

const getTemplate = (redirectUrl, typeId) => {
  return `
  <div style="font-family: Poppins, sans-serif; font-size: 22px; max-width: 620px; margin:0 auto; text-align: center; color:black;">
    <figure>
      <img
        src="https://hifive.felixlopz.now.sh/_next/static/images/logo-vec-big-7af6522e74f6aa841b9d8312e3f84fff.png"
        alt="hifive logo"
      />
    </figure>
    <p>
      <strong style=" display: block; margin-bottom: 40px;">
        ${
          typeId === EMAILS.PASSWORD_RESET.id
            ? `¿Has olvidado tu contraseña? Recuperala`
            : `Crea tu web hoy con nosotros!`
        }
      </strong>
      ${
        typeId === EMAILS.PASSWORD_RESET.id
          ? `Por favor haz click en el botón de abajo para crear una nueva contraseña`
          : `Por favor haz click en el botón de abajo para verificar tu email`
      }  
    </p>
    <a
      href="${redirectUrl}"
      style="display: inline-block;
              margin-top: 70px;
              text-decoration: none;
              color: #5591f5;
              font-weight: 500;
              font-size: 18px;
              line-height: 22px;
              border: 2px solid #5591f5;
              padding: 0.9em 6em;
              border-radius: 8px;
              transition: all 0.3s ease;"
    >
      ${
        typeId === EMAILS.PASSWORD_RESET.id
          ? `Crear contraseña`
          : `Verificar email`
      }  
    </a >
  </div>
  `;
};

const cancelSubscriptionTemplete = (email, url) => {
  return `
   <div> Un usuario cancelo su subscription, por favor verifica si tiene una campaña de marketing activa 
     <p> Informacion del usuario </p> 
     <span> Email: ${email}  </span>
      <span> Url de la web: ${url}  </span>  
    </div> 
  `;
};

module.exports = {getTemplate, cancelSubscriptionTemplete};
