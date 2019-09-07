import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { auth } from './base'
import Navbar from './Navbar'
import './login.css'
import InputField from './InputField';

class LoginPage extends Component {
  constructor( props ) {
    super( props )

    this.email = null
    this.passwd = null

    this.state = {
      isLogging: false,
      isLoggedIn: false,
      error: false
    }

    auth.onAuthStateChanged( user => {
      if(user) {
        this.setState({
          isLoggedIn: true
        })
      }
    })

    this.handleSubmit = this.handleSubmit.bind( this )
  }

  handleSubmit( event ) {
    event.preventDefault()
    this.setState({
      error: false,
      isLogging: true
    })
    auth.signInWithEmailAndPassword( this.email.value, this.passwd.value )
      .then( () => {
        this.setState({
          isLoggedIn: true
        })
      })
      .catch( () => {
        this.setState({
          error: true,
          isLogging: false
        })
      })
  }

  render() {
    if( this.state.isLoggedIn ) {
      return <Redirect to='/ChamadoPage' />
    }
    return (
      <div>
        <Navbar />
        <div className='login' >
          <form onSubmit={this.handleSubmit} className="login-wrapper  flex column justify-center">
				<div className="login">
					<h1>Login</h1>
					
						<InputField refValue={ ref => this.email = ref }
										 idValue='email'
										 typeValue='text'
										 requiredValue={ true }
										 labelText='E-mail'
										 spanWidth='60px' />


							 <InputField refValue={ ref => this.passwd = ref }
										 idValue='pass'
										 typeValue='password'
										 requiredValue={ true }
										 labelText='Senha'
										 spanWidth='60px' />

							 { this.state.error && <p>E-mail e/ou senha inválido(s)!</p> }
						<button disabled={ this.state.isLogging } type="submit" className="btn btn-primary btn-block btn-large">Logar</button>
				</div>
           </form>
        </div>
	  </div>
    )
  }
}

export default LoginPage