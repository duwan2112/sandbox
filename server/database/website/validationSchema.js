const yup = require("yup");

const validationSchema = yup.object({
  basic: yup.object({
    bufeteName: yup.string().max(20).required(),
    eslogan: yup.string().max(40).notRequired(),
    url: yup
      .string()
      .matches(/^[A-Za-z0-9._-]+$/)
      .min(5)
      .max(30)
      .required(),
    logo: yup.object({
      name: yup.string().min(6).max(20).required(),
      initials: yup.string(),
    }),
    phone: yup.string().max(16).required(),
    whatsapp: yup.string().max(16).required(),
    email: yup.string().email().required(),
    direction: yup.array().of(yup.string().required()).required(),
  }),
  welcomeScreen: yup.object({
    optionOne: yup.string().when("selected", {
      is: "optionOne",
      then: yup.string().required(),
    }),
    optionTwo: yup.string().when("selected", {
      is: "optionTwo",
      then: yup.string().required(),
    }),
    selected: yup.string().required(),
  }),
  lawyers: yup.array().of(
    yup.object({
      fullName: yup.string().required(),
      experience: yup.string().notRequired(),
      video: yup.string().url().notRequired(),
      linkedin: yup.string().url().notRequired(),
      eslogan: yup.string().notRequired(),
      gender: yup.string().notRequired(),
      bio: yup.string().notRequired(),
      curriculum: yup.string().notRequired(),
      specialities: yup.array().of(yup.string().notRequired()).notRequired(),
    })
  ),
  howItWorks: yup.object({
    stepOne: yup.string().required(),
    stepTwo: yup.string().required(),
    stepThree: yup.string().required(),
  }),
  clients: yup.array().of(
    yup.object({
      name: yup.string().required(),
      location: yup.string().required(),
      comment: yup.string().max(700).required(),
    })
  ),
  questions: yup.object({
    cases: yup.string().required(),
  }),
});

module.exports = validationSchema;
