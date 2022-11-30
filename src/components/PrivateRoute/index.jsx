import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";

function PrivateRoute({ children }) {
  const { login } = useAuth()
  if (login) {
    return (
      children
    )
  } else {
    return (
      <Navigate to='/' replace></Navigate>
    )
  }

}

export default PrivateRoute