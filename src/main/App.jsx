import 'semantic-ui-css/semantic.min.css';
import './App.css'
import React from 'react'
import {HashRouter} from 'react-router-dom'

import Routes from './Router'
import Logo from '../components/templates/Logo'
import Nav from '../components/templates/Nav'
import Footer from '../components/templates/Footer'

export  default  props => (
    <HashRouter>
        <div className='app'>
            <Logo/>
            <Nav/>
            <Routes/>
            <Footer/>
        </div>
    </HashRouter>

)
