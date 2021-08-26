import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
// import { IToken } from "../../types/auth";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { IForm } from "../../pages/Login";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthProviderData {
  token: string;
  signIn: (
    userData: IForm,
    setError?: Dispatch<SetStateAction<boolean>>
  ) => void;
}

const AuthContext = createContext<IAuthProviderData>({} as IAuthProviderData);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const history = useHistory();
  const token = localStorage.getItem("token") || "";

  const [auth, setAuth] = useState<string>(token);

  const signIn = (
    userData: IForm,
    setError?: Dispatch<SetStateAction<boolean>>
  ) => {
    axios
      .post("https://kenzieshop2.herokuapp.com/login", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.access);
        setAuth(response.data.access);
        history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider value={{ token: auth, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
