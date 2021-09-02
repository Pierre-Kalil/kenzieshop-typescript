// import { Dispatch, SetStateAction } from "react";
import { Redirect, Route as ReactDOMRoute } from "react-router-dom";
import { useAuth } from "../Providers/Auth";
import { ComponentType } from "react";
// Se a rota for privada e o usuário não ta logado, ele vai pro login
// Se a rota for privada e o usuário logado, ele vai pra rota
// Se a rota não for privada e o usuário estiver logado, ele não precisa ver
// Se a rota não rota for privada e o usuário não estiver logado, ele pode ver

// true true = ok
// true false = vai pro login
// false e true = dashboard
// false e false = ok

interface Icomponent {
  component: ComponentType;
  isPrivate?: boolean;
}

const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}: Icomponent) => {
  const { token } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
            }}
          />
        );
      }}
    />
  );
};

export default Route;
