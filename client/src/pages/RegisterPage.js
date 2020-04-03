import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { useHttp } from "../hooks/http.hook";
import { NavLink } from "react-router-dom";

export default function RegPage() {
  const { addToast } = useToasts();
  const { loading, error, request, clearError} = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    // console.log('Error', error)
    if (error) {
    addToast(error, {
        appearance: 'error',
        autoDismiss: true,
      })
      clearError()
    }
  }, [error, addToast, clearError]);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      addToast(data.message,{
        appearance: 'success',
        autoDismiss: true,
      })
    } catch (e) {}
  };

  return (
    <>
      <h1 className="text-center mt-5">Регистрация</h1>
      <form className="form-signin mt-5">
        <div className="input-group mx-auto col-md-4 mb-3 form-label-group">
          <span className="input-group-text">
            <i className="fas fa-user-circle"></i>
          </span>
          <input
            type="login"
            id="inputLogin"
            name="login"
            className="form-control"
            placeholder="Login"
            required
            autoFocus
            onChange={changeHandler}
          />
        </div>
        <div className="input-group mx-auto col-md-4 mb-3 form-label-group">
          <span className="input-group-text">
            <i className="fas fa-at"></i>
          </span>
          <input
            type="email"
            id="inputEmail"
            name="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={changeHandler}
            required
          />
        </div>

        <div className="input-group mx-auto col-md-4 mb-3 form-label-group">
          <span className="input-group-text">
            <i className="fa fa-key" aria-hidden="true"></i>
          </span>
          <input
            type="password"
            id="inputPassword"
            name="password"
            className="form-control"
            placeholder="Пароль"
            value={form.password}
            onChange={changeHandler}
            required
          />
        </div>
        <button
          className="mx-auto col-md-4 btn btn-lg btn-dark btn-block"
          type="submit"
          onClick={registerHandler}
          disabled={loading}
        >
          Зарегистрироваться
        </button>

        <NavLink to="/auth" className="text-decoration-none">
          <p className="text-dark text-center m-2">Войти</p>
        </NavLink>
      </form>
    </>
  );
}
