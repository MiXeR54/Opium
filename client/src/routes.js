import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import LinksPage from './pages/LinksPage'
import AuthPage from './pages/AuthPage'
import DetailPage from './pages/DetailPage'
import CreatePage from './pages/CreatePage'
import RegPage from "./pages/RegisterPage"

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/links" exact component={LinksPage}/>
                <Route path="/create" exact component={CreatePage}/>
                <Route path="/detail:id" component={DetailPage}/>
                <Redirect to="/create"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact component={AuthPage}/>
            <Route path="/register" exact component={RegPage}/>
            <Redirect to="/"/>
        </Switch>
    )
}