import './Header.css'

import React from 'react'

export default props => (
    <header className='header d-none d-sm-flex flex-column'>
        <h1 >
            <i className={`fa fa-${props.icon}`}/> {props.title}
        </h1>
        <p >{props.subtitle}</p>
    </header>
)