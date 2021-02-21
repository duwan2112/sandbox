import Users from "../pages/Users/index";
import Login from "../pages/Login/Login";
import Preaprobado from "../pages/Preaprobado/Preaprobado";
const authProtectedRoutes = [
  {
    path: "/preapr",
    component: Preaprobado,
  },
];

const publicRoutes = [
  {path: "/users", component: Users},
  {path: "/login", component: Login},
];

export {authProtectedRoutes, publicRoutes};
