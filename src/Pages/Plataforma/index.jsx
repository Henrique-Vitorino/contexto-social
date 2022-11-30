import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import Header from "./Components/Header";
function Plataforma() {

  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>

  )
}

export default Plataforma;