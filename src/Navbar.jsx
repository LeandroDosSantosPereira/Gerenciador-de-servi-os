import React from 'react';
import { NavLink } from 'react-router-dom'

const Navibar = () => {
  return (
    <header className='main-header fixed flex column'>
      <nav className='navbar flex row vertical-align-row'>
        <NavLink to='/' exact={true} className={`link`}>
          <div className='brand'>
            <h5>Gerenciador de Chamados</h5>
          </div>
        </NavLink>
        <div className='navigation right'>
          <NavLink to='/LoginPage' className={`link`}>
            Login
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navibar;