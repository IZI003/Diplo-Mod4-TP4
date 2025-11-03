import axios from "axios";
import { useState, useEffect,createContext, useContext } from "react";

const DatosCardContext = createContext();

export const DatosCardProvider = ({ children }) => {
  const [datosCard, setDatos] = useState(null);
  const [error, setError] = useState(null);

 const consulta = async () => {
          try {
            const response = await axios.get('https://rickandmortyapi.com/api/character');
            setDatos(response.data);
          } catch (err) {
            setError(err);
          }
        };

  useEffect(() => {
    consulta();
  }, [datosCard]);

  const toggleDatos = () => setDatos((prev) => !prev);

  return (
    <DatosCardContext.Provider value={{ datosCard, error, toggleDatos }}>
      {children}
    </DatosCardContext.Provider>
  );
};

export function UseDatosContext() {
    return useContext(DatosCardContext);
}