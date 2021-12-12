import React from 'react'
import { NavBar } from './navBar'

export const PageTemplate = ({children}) => {
    return (
        <div>
            <NavBar/>
            {children}
        </div>
    )
}