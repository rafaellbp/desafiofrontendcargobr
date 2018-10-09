import './Header.css'
import React from 'react'
import {Icon} from 'semantic-ui-react'

export default props => (
    <header className='header d-none d-sm-flex flex-column'>
        <h1 >
            <Icon name={props.icon}/> {props.title}
        </h1>
        <p >{props.subtitle}</p>
    </header>
)