import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { UseLocalizacionContext } from "../context/LocationContext";
import { filterCharactersByLocation, getAllCharacters } from "../service/characterService";
import { UseCartContext } from "../context/CartContext";
import { UseModalContext } from "../context/ModalContext";

const CharacterList = () => {
  const { selectedLocation } = UseLocalizacionContext();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const cacheRef = useRef(null);

  const { toggleModal } = UseModalContext();
  const { addToCart } = UseCartContext();
    
  const accion = (product) => {
      addToCart(product);
      toggleModal();
    };
  const loadCharacters = useCallback(async () => {
    if (cacheRef.current) {
      setCharacters(cacheRef.current);
      setLoading(false);
      return;
    }
    const data = await getAllCharacters();
    cacheRef.current = data;
    setCharacters(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  const filteredCharacters = useMemo(() => {
    return filterCharactersByLocation(characters, selectedLocation);
  }, [characters, selectedLocation]);

  if (loading) return <p>Cargando personajes...</p>;

  if (!selectedLocation)
    return <p>Selecciona una localidad para ver sus personajes.</p>;

  return (
    <> 
    {filteredCharacters.length === 0 ? (
        <p>No hay personajes en esta localidad.</p>
      ) : (
       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 transition-colors duration-300">
          {filteredCharacters.map((char) => (
            <div
                key={char.id}
                className="shadow-lg rounded-xl p-4 flex flex-col items-center transition-colors duration-300"
                style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}>
                <img
                    src={char.image}
                    alt={char.name}
                    className="w-32 h-32 object-cover mb-2 rounded-md"
                />
                <h3 className="text-lg font-semibold">{char.name}</h3>
                <p style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}>
                    {char.name} — {char.species}
                </p>
                <button
                onClick={() => accion(char)}
                    className="mt-3 px-4 py-2 rounded-lg cursor-pointer shadow-md transition-all duration-300 transform hover:scale-105"   
                >
                    Agregar a Favoritos
                </button>
            </div>
          ))}
        </div>    
        )}
  </>
  )
};


export default CharacterList;
