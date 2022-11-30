import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export default function AuthProvider({ children }) {

  const [data, setData] = useState(null)
  const [login, setLogin] = useState(null)


  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem('login'))
    const userData = JSON.parse(localStorage.getItem('data'))
    setLogin(isLogged)
    setData(userData)
  }, [])

  useEffect(() => {
    if (login !== null) {
      localStorage.setItem('login', login)
    }
    if (data !== null) {
      localStorage.setItem('data', JSON.stringify(data))
    }
  }, [login, data])

  return (
    <AuthContext.Provider value={{ data, login, setLogin, setData }} >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`useAuth deve ser usado dentro do AuthProvider`);
  }

  return context;
};