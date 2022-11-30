import { createContext, useContext, useEffect, useState } from "react"
import { getCliente } from "../services/cliente.service";
import { useLoadingContext } from "./loading";

const IsClientContext = createContext()

export default function IsClientProvider({ children }) {

  const [isClient, setIsClient] = useState(false)


  return (
    <IsClientContext.Provider value={{ isClient, setIsClient }} >
      {children}
    </IsClientContext.Provider>
  )
}

export function useIsClient(uid) {
  const context = useContext(IsClientContext);
  const { setLoading } = useLoadingContext()

  useEffect(() => {
    getUserData(uid)
  }, [])

  async function getUserData(uid) {
    setLoading(true)
    try {
      await getCliente(uid)
      context.setIsClient(true)
    } catch (e) {
      context.setIsClient(false)
    }
    setLoading(false)
  }
  if (!context) {
    throw new Error(`useIsClient deve ser usado dentro do IsClientProvider`);
  }

  return context;
};