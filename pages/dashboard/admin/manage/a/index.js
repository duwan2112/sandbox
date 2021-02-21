import { LawyerUpdate } from "../../../../../components/blocks/dashboard/forms/Lawyer";
import { ClientUpdate } from "../../../../../components/blocks/dashboard/forms/Client";
import { SolvedCasesUpdate } from "../../../../../components/blocks/dashboard/forms/SolvedCases";
import { AreasUpdate } from "../../../../../components/blocks/dashboard/forms/Areas";
import { BlogsUpdate } from "../../../../../components/blocks/dashboard/forms/Blogs";

export const data = [
  {
    name: "abogado",
    objectKey: "lawyers",
    slug: "lawyers",
    Form: LawyerUpdate,
    title: "abogados",
    placeholderKey: "fullName",
  },
  {
    name: "testimonio",
    objectKey: "clients",
    slug: "clients",
    Form: ClientUpdate,
    title: "que dicen nuestros clientes",
    placeholderKey: "comment",
  },
  {
    name: "caso resuelto",
    objectKey: "solvedCases",
    slug: "solvedcases",
    Form: SolvedCasesUpdate,
    title: "casos resueltos",
    placeholderKey: "title",
  },
  {
    name: "area",
    objectKey: "areas",
    slug: "areas",
    Form: AreasUpdate,
    title: "nuestras áreas",
    placeholderKey: "area",
  },
  {
    name: "entrada",
    objectKey: "blogs",
    slug: "blogs",
    Form: BlogsUpdate,
    title: "blogs",
    placeholderKey: "question",
  },
];

const GhostComponent = () => {
  return <h1>Hello world</h1>;
};

export default GhostComponent;
