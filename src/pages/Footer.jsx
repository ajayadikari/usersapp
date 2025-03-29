import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='h-15 bg-blue-300 rounded flex justify-center items-center'>
            made by ajay adikari,
            <NavLink to={'https://ajayadikari.netlify.app/'} className={"text-green-500 text-xl font-bold"}>Visit my portfolio</NavLink>
        </div>
    )
}

export default Footer
