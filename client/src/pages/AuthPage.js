import React, { useState, useEffect, useContext} from "react"
import { useToasts } from "react-toast-notifications";
import {NavLink} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import { AuthContext } from "../context/AuthContext";


const AuthPage = () => {
  const auth = useContext(AuthContext)
  const { addToast } = useToasts();
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ""
  })

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
    setForm({...form, [event.target.name]: event.target.value })
  }
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', "POST", {...form})
      auth.login(data.token, data.userId)
    } catch (e) {
      
    }
  }
    return (
    //   <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow mb-4">
    //   <div className="container">
    //     <a className="navbar-brand" href="/">
    //       Title
    //     </a>
    //   </div>
    // </nav>
    <>
    <h1 className="text-center mt-5">Авторизация</h1>
    <form action="/login" className="form-signin mx-auto mt-5" method="POST">
      <div className="input-group mx-auto col-md-4 mb-3 form-label-group">
        <span className="input-group-text">
        <i className="fas fa-user-circle"></i>
        </span>
        <input
          type="login"
          id="inputLogin"
          name="email"
          className="form-control"
          placeholder="Логин"
          required
          autoFocus
          onChange={changeHandler}
        />
      </div>

      <div className="input-group mx-auto col-md-4 mb-2 form-label-group">
        <span className="input-group-text">
          <i className="fa fa-key" aria-hidden="true"></i>
        </span>
        <input
          type="password"
          id="inputPassword"
          name="password"
          className="form-control"
          onChange={changeHandler}
          placeholder="Пароль"
          required
        />
      </div>

      <div className="text-center mx-auto checkbox">
        <label>
          <input type="checkbox" value="remember-me" /> Запомнить меня
        </label>
      </div>
      <button
        className="mx-auto col-md-4 btn btn-lg btn-dark btn-block"
        type="submit"
        onClick={loginHandler}
        disabled={loading}
      >
        Войти
      </button>
      <NavLink to="/register" className="text-decoration-none">
        <p
          id="btn-tooltip"
          className="text-dark text-center m-2"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Login: 123 Pass:123"
        >
          У меня нет аккаунта
        </p>
      </NavLink>
    </form>
  </>
    )
}

export default AuthPage