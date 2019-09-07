import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { auth } from './base'
import ChamadoPage from './ChamadoPage'
import Sidebar from './Sidebar';
import ClientePage from './ClientePage';
import PropriedadeDetalhes from './PropriedadeDetalhes'

const containerAdmin = {
  margin: '200px'
}

class AdminPage extends Component {
  constructor( props ){
    super( props )

    this.state = {
      isAuthing: true,
      isLoggedIn: false,
      user: null
    }
  }

  componentWillMount() {
    auth.onAuthStateChanged( user => {
      this.setState({
        isAuthing: false,
        isLoggedIn: !!user,
        user: user
      })
    })
  }

  signout = () => {
    auth.signOut()
      .then( () => {
        return <Redirect to='/LoginPage' />
      })
      .catch( (e) => {
        console.log(e)
        
      })
  }

  render() {
    if( this.state.isAuthing ){
      return <p>Aguarde...</p>
    }

    if( !this.state.isLoggedIn ) {
      return <Redirect to='/LoginPage' />
    }
    
    return (
      <div>
        <div styles={containerAdmin}>
          <Sidebar signout={ this.signout } />
          <Route path={`${this.props.match.url}/proprietario`} component={ ChamadoPage } />
          <Route path={`${this.props.match.url}/propriedades/:id`} component={ PropriedadeDetalhes } />
          <Route exact={ true } path={`${this.props.match.url}/propriedades`} component={ ClientePage } />
        </div>
      </div>
    )
  }
}

export default AdminPage