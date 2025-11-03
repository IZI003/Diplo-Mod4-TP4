import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export { CartContext };
export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id) => {
        toast.dismiss();
    try
      {
         // Provocamos un error manualmente
       // throw new Error("Fallo simulado para test");
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        toast.info("Se elimino con exito!!", { toastId: "delete" });
       }
       catch(err)
       {
        toast.error("Surgio un error al eliminar "+ err, { toastId: "error" });
       }  
  };

const addToCart = (product) => {
        toast.dismiss(); 

  setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        toast.info("Ya existe este favoristo en la lista", { toastId: "repet" });
        return prevCart;
      }else
      {
        toast.success("Agregado a la lista de Favoritos", { toastId: "addcard" });

        return [...prevCart, { ...product}];
      }
    });


  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function UseCartContext() {
    return useContext(CartContext);
}