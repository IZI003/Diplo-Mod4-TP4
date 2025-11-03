import { useState, useEffect,createContext, useContext } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedLocation")) || [];
  });
  
    useEffect(() => {
    localStorage.setItem("selectedLocation", JSON.stringify(selectedLocation));
    document.documentElement.classList.toggle("selectedLocation", selectedLocation);
  }, [selectedLocation]);

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export function UseLocalizacionContext() {
    return useContext(LocationContext);
}