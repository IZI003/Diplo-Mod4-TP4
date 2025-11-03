import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://rickandmortyapi.com/api/location";
const STORAGE_KEY = "rickandmorty_locations";

export const getAllLocations = async () => {

    try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
            return JSON.parse(cached);
        }

        let allLocations = [];
        let url = API_URL;
        try {
            while (url) {
                const { data } = await axios.get(url);
                allLocations.push(...data.results);
                url = data.info.next;
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(allLocations));
            toast.success("se cargo correctamente las localidades", { toastId: "localidades" });
        }
        catch (err) {
            toast.success("Error al consultar las localidades " + err, { toastId: "localidades" });
        }

        return allLocations;
    }
    catch (err) {
        toast.success("Error al consultar las localidades " + err, { toastId: "localidades" });
    }

};
