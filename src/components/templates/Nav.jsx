import './Nav.css'
import React from 'react'
import {Link} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'

export default props => (
    <aside className='menu-area'>
        <nav className='menu'>
            <Link to="/">
                <Icon name='child'/> Apresentação
            </Link>
            <Link to="/desafio/1">
                <Icon name='hand spock outline'/> Desafio
            </Link>
        </nav>
    </aside>
)