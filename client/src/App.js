import React from "react";
import {ToastProvider} from 'react-toast-notifications'
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import {AuthContext} from './context/AuthContext'

function App() {
  const {token, login, logout, userId} = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth);
  return (
    <AuthContext.Provider value={{token, login, logout, isAuth, userId}}>
    <ToastProvider>
      <BrowserRouter>{routes}</BrowserRouter>
    </ToastProvider>
    </AuthContext.Provider>
  );
}

export default App;
