import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { IProduct } from "../../pages/Home";

interface ICartContextProviderProps {
  children: ReactNode;
}

interface ICartContextProviderData {
  cart: IProduct[];
  setCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const CartContext = createContext<ICartContextProviderData>(
  {} as ICartContextProviderData
);

export const CartProvider = ({ children }: ICartContextProviderProps) => {
  const [cart, setCart] = useState<IProduct[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
