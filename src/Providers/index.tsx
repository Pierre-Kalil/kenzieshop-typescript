import { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { CartProvider } from "./Cart";

interface IProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: IProvidersProps) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};

export default Providers;
