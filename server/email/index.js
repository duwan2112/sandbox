const sgMail = require("@sendgrid/mail");
const {getTemplate, cancelSubscriptionTemplete} = require("./templates");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (type, token, dest) => {
  return new Promise(async (resolve, reject) => {
    const redirectUrl = `${process.env.WEB_URL}/${type.path}/${token}`;
    const msg = {
      to: dest,
      from: process.env.EMAIL_FROM,
      subject: type.subject,
      html: getTemplate(redirectUrl, type.id),
    };

    try {
      await sgMail.send(msg);
      resolve({
        ok: true,
        data: `Un mensaje a sido enviado al correo:  ${dest}`,
      });
    } catch (error) {
      reject({ok: false, data: `Error enviando el correo`});
    }
  });
};

const sendCancelSubscription = async (email, url) => {
  return new Promise(async (resolve, reject) => {
    const msg = {
      to: "marketingabogados.hfma@gmail.com",
      from: process.env.EMAIL_FROM,
      subject: "Subscription cancel ",
      html: cancelSubscriptionTemplete(email, url),
    };

    try {
      await sgMail.send(msg);
      resolve({ok: true, data: `An email was sent`});
    } catch (error) {
      reject({ok: false, data: `Error sending the email`});
    }
  });
};

module.exports = {sendEmail, sendCancelSubscription};
