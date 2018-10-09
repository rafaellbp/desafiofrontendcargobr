import './Nav.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default props => (
    <aside className='menu-area'>
        <nav className='menu'>
            <Link to="/">
                <i className='fa fa-child'/> Apresentação
            </Link>
            <Link to="/desafio/1">
                <i className='fa fa-hand-spock-o'/> Desafio
            </Link>
        </nav>
    </aside>
)