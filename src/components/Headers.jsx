import { UseModalContext } from "../context/ModalContext";
import ThemeButton from "./ThemeButton";

const Headers = () => {
  const { toggleModal } = UseModalContext();

  return (
    <div className="flex flex-col items-center gap-4 py-6 text-2xl">
      <h1 className="text-3xl font-bold" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
        🏪 Tienda React
      </h1>

      <button
        onClick={toggleModal}
        className="px-4 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        Ver Favoritos
      </button>
      <ThemeButton />
    </div>
  );
};

export default Headers;
