import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import { useAuth } from "../../Providers/Auth";
import { Container } from "../Login/styles";
import { Link } from "react-router-dom";

export interface IRegister {
  username: string;
  password: string;
  email: string;
}

const Register = () => {
  const { loggedIn } = useAuth();

  const [error, setError] = useState<boolean>(false);

  const schema = yup.object().shape({
    username: yup.string().required("Campo Obrigatório"),
    password: yup
      .string()
      .min(4, "Mínimo de 6 dígitos")
      .required("Campo obrigatório"),
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IRegister) => loggedIn(data, setError);

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="username"
            name="username"
            size="small"
            color="primary"
            inputProps={register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>
        </div>
        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Email"
            name="email"
            size="small"
            color="primary"
            inputProps={register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          ></TextField>
        </div>

        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Senha"
            name="password"
            size="small"
            color="primary"
            inputProps={register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>
        </div>
        <p>
          Já possui uma conta? <Link to="/login">Login</Link>
        </p>
        <Button type="submit" variant="contained" color="primary" size="large">
          Enviar
        </Button>
      </form>
      {error && <span> Usuário ou senha incorretas! </span>}
    </Container>
  );
};

export default Register;
