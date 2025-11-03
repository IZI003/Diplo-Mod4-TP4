import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://rickandmortyapi.com/api/character";
const STORAGE_KEY = "rickandmorty_characters";

export const getAllCharacters = async () => {
    try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) return JSON.parse(cached);

        let allCharacters = [];
        let url = API_URL;
        try {
            while (url) {
                const { data } = await axios.get(url);
                allCharacters.push(...data.results);
                url = data.info.next;
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(allCharacters));
            toast.success("Los personajes se cargaron correctamente", { toastId: "Characters" });

        }
        catch (err) {
            toast.error("Error al consultar las localidades " + err, { toastId: "Characters" });
        }
        return allCharacters;
    }
    catch (err) {
        toast.error("Error al consultar Los personajes" + err, { toastId: "Characters" });
    }
};

export const filterCharactersByLocation = (characters, locationName) => {
    if (!locationName) return [];
    return characters.filter(
        (ch) => ch.location && ch.location.name === locationName
    );
};
