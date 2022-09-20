import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useDispatch, useSelector} from "react-redux";
import { useForm } from "react-hook-form";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import styles from "./Login.module.scss";

export const Login = () => {
  // обьяснение авторизован или нет пользователь
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  // вытаскиваю функции из react-hook-form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    // обьясняю что валидация будет происходить если же эти поля поменялись
    mode: 'onChange',
  });
  // функция котороя будет выполнятся только если react-hook-form понял что валидация прошла успешно
  const onSubmit = (values) => {
    dispatch(fetchAuth(values));
  };

if (isAuth) {
  return <Navigate to='/' />;
}

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          // обьясняю что если email рендерится - то сразу их регистрируем в useForm
          {...register("email", { required: "Укажите почту" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
                 // обьясняю что если password рендерится - то сразу их регистрируем в useForm
          {...register("password", { required: "Укажите пароль" })}
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
