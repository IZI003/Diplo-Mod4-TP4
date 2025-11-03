import { useEffect, useState } from "react";
import Headers from "../components/Headers";
import CartModal from "../components/CartModal";
import Footer from "../components/Footer";
import { LocationProvider } from "../context/LocationContext";
import LocationsSelect from "../components/LocationsSelect";
import CharacterList from "../components/CharacterList";
import { CartProvider } from "../context/CartContext";
import { ToastContainer } from "react-toastify";
import { UseThemeContext } from "../context/ThemeContext";
import { PacmanLoader } from "react-spinners";

const Home = () => {
  const { darkMode } = UseThemeContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo mínimo de carga (por ejemplo, 1 segundo)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: "var(--bg-color)" }}
      >
        <PacmanLoader 
        color="#36d7b7" 
        size={20}
         />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <Headers />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
      <CartProvider>
        <LocationProvider>
          <div style={{ padding: "2rem" }}>
            <LocationsSelect />
            <hr />
            <CharacterList />
          </div>
        </LocationProvider>
        <CartModal />
      </CartProvider>
      <Footer />
    </div>
  );
};

export default Home;
