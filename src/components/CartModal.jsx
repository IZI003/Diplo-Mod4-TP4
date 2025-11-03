import { UseCartContext } from "../context/CartContext";
import { UseModalContext } from "../context/ModalContext";

const CartModal = () => {
  const { IsmodalOpen, toggleModal } = UseModalContext();
  const { cart, removeFromCart } = UseCartContext();

  if (!IsmodalOpen) return null;

  return (
   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-9  mx-6 w-full ">
  <div
    className="font-bold rounded-2xl p-8 mx-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl transition-colors duration-300"
     style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
  >
    <div className="text-4xl p-4 pb-6 pt-6">
        <h1 className="font-extrabold mb-6 text-center  tracking-wide border-b pb-3 border-indigo-500">
        Favoritos
        </h1>
    </div>
    {Array.isArray(cart) && cart.length > 0 ?(
      <div className="space-y-4 m-4 p-4">
        {
        cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-4 justify-between rounded-xl shadow-md transition-colors duration-300" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-sm opacity-80">{item.species}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-3 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-lg">No hay tarjetas en la lista</p>
    ) }

    {/* 🔹 Botón de cerrar con estilo más moderno y más separación */}
    <div className="flex justify-center mt-6">
      <button
        onClick={toggleModal}
        className="px-6 py-3 rounded-xl text-lg font-semibold cursor-pointer shadow-md transition-all duration-300 transform hover:scale-105"
      >
        ✖️ Cerrar
      </button>
    </div>
  </div>
</div>
  );
};

export default CartModal;
