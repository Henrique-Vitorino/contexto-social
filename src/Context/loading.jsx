import { createContext, useContext, useState } from "react"

const LoadingContext = createContext()

export default function LoadingProvider({ children }) {

  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }} >
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoadingContext() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error(`useLoadingContext deve ser usado dentro do LoadingProvider`);
  }

  return context;
};