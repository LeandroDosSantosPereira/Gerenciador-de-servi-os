import React from 'react'
import { NavLink } from 'react-router-dom'

import './sidebar.css'

const Sidebar = (props) => {
  return (
		<div className="container">
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary" id="tam">
			 
	<button class="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse"  data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span> 
				Menu       
    </button>

    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="nav navbar-nav">
				<NavLink className='navbar-brand' to='/ChamadoPage'>Serviços</NavLink>
				<NavLink className='navbar-brand' to='/ClientePage'>Clientes</NavLink>
        </ul>
    </div>
				
			
		</nav>	
	
		 </div>
  )
}

export default Sidebar
