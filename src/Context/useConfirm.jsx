import { createContext, useContext, useEffect, useState } from "react"

const UseConfirmContext = createContext()

export default function UseConfirmProvider({ children }) {

  const [showConfirmModal, setShowConfirmModal] = useState(false)


  return (
    <UseConfirmContext.Provider value={{ showConfirmModal, setShowConfirmModal }} >
      {children}
    </UseConfirmContext.Provider>
  )
}

export function useConfirm(pergunta) {
  const context = useContext(UseConfirmContext);

  

  if (!context) {
    throw new Error(`useConfirm deve ser usado dentro do UseConfirmProvider`);
  }

  return context;
};