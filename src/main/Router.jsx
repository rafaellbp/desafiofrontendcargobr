import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import Home from '../components/apresentacao/Apresentacao'
import Desafio from '../components/desafio/Desafio'

export default props => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/desafio/:page' component={Desafio}/>
        <Redirect from='*' to='/'/>
    </Switch>
)