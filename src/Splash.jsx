import React, { Component } from 'react';
import {Switch , Route, Link} from 'react-router-dom';
import './chamado.css'

// SPLASH SCREEN

class Splash extends Component {
  render() {
   
    
    function chamar()
    {    
    window.location.href = "/ChamadoPage";
    
    }
    
    var n = 0;    
    window.setInterval(function(){
      n++;
      if(n==5){
      chamar();
              }
    },1000);
   

    return (
     <div id="splash">     
    <img id="ico" src="imagens/logo.png"/>     
     </div>
    );
  }
}

export default Splash;