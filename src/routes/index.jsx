
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login";
import Plataforma from "../Pages/Plataforma";
import Painel from "../Pages/Plataforma/Pages/Painel";
import EsqueciSenha from './../Pages/EsqueciSenha/index';
import Home from "../Pages/Home";
import GerenciarEventos from "../Pages/Plataforma/Pages/GerenciarEventos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,

  },
  {
    path: "/plataforma",
    element: <PrivateRoute><Plataforma /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "painel",
        element: <Painel />,
      },
      {
        path: "eventos",
        element: <GerenciarEventos />,
      },
    ],
  },
]);

export default router