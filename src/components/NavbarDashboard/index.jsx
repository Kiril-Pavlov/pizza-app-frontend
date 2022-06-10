import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='dash-nav-container'>
      <Link to='/admin'>
        <div className='dash-nav-item'>
          Add Pizza
        </div>
      </Link>
      <Link to='/edit'>
        <div className='dash-nav-item'>
          Edit pizza
        </div>
      </Link>
      <Link to='/tag-manager'>
        <div className='dash-nav-item'>
          Manage Tags
        </div>
      </Link>
      <Link to='/orders'>
        <div className='dash-nav-item'>
          Orders
        </div>
      </Link>
    </nav>
  )
}

export default Navbar