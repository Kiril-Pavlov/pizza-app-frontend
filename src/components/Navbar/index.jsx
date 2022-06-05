import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='nav-container'>
      <Link to='/'>
        <div className='nav-item'>
          Home
        </div>
      </Link>
      <Link to='about'>
        <div className='nav-item'>
          About
        </div>
      </Link>
      <Link to='contact'>
        <div className='nav-item'>
          Contact
        </div>
      </Link>
    </nav>
  )
}

export default Navbar