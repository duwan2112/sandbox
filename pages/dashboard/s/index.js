import { BasicUpdate } from "../../../components/blocks/dashboard/forms/Basic";
import { WelcomeUpdate } from "../../../components/blocks/dashboard/forms/Welcome";
import { AboutUsUpdate } from "../../../components/blocks/dashboard/forms/AboutUs";
import { QuestionsUpdate } from "../../../components/blocks/dashboard/forms/Questions";
import { HowItWorksUpdate } from "../../../components/blocks/dashboard/forms/HowItWorks";

const data = [
  {
    key: "basic",
    slug: "basic",
    Form: BasicUpdate,
    title: "nombre del bufete, logotipo, teléfono, email y dirección",
  },
  {
    key: "welcomeScreen",
    slug: "welcome",
    Form: WelcomeUpdate,
    title: "pantalla de bienvenida",
  },
  {
    key: "howItWorks",
    slug: "howitworks",
    Form: HowItWorksUpdate,
    title: "como funciona",
  },
  {
    key: "questions",
    slug: "questions",
    Form: QuestionsUpdate,
    title: "respondemos a tus preguntas",
  },
  {
    key: "aboutUs",
    slug: "aboutus",
    Form: AboutUsUpdate,
    title: "nosotros",
    optional: true,
  },
];

export { data };

const GhostComponent = () => {
  return <h1>Hello world</h1>;
};

export default GhostComponent;
