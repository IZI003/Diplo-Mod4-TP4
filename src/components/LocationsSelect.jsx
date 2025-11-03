import { useEffect, useRef, useState, useCallback } from "react";
import { UseLocalizacionContext } from "../context/LocationContext";
import { getAllLocations } from "../service/locationService";

const LocationsSelect = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const cacheRef = useRef(null);
  const { selectedLocation, setSelectedLocation } = UseLocalizacionContext();

  const loadLocations = useCallback(async () => {
    setSelectedLocation("Earth (Evil Rick's Target Dimension)"); // solo para que no quede la pantalla vacia selecciono como default una de las dimenciones

    if (cacheRef.current) {
      setLocations(cacheRef.current);
      setLoading(false);
      return;
    }
    const data = await getAllLocations();
    cacheRef.current = data;
    setLocations(data);
    setLoading(false);
  },[setSelectedLocation]);

  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  const handleChange = (e) => setSelectedLocation(e.target.value);

  if (loading) return <p>Cargando localidades...</p>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 transition-colors duration-300">
      <h3>Seleccionar Localidad</h3>
      <select 
      value={selectedLocation} 
      onChange={handleChange} 
      className="shadow-lg rounded-xl p-2 flex flex-col items-center transition-colors duration-300 mt-3 px-4 py-2 "
      style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}>
        <option value="">-- Selecciona una localidad --</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.name}>
            {loc.name} 
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationsSelect;
