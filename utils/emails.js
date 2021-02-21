const EMAILS = {
  PASSWORD_RESET: {
    id: "passwordreset",
    subject: "Reset password",
    path: "passwordreset"
  },
  EMAIL_VERIFICATION: {
    id: "emailverify",
    subject: "Email verification",
    path: "verify"
  }
};

const getEmailData = id => {
  const emails = Object.entries(EMAILS);
  for (const [email, data] of emails) {
    if (id === data.id) return { ...data };
  }
  return null;
};

module.exports = { EMAILS, getEmailData };
