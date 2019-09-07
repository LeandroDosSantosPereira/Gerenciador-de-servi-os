import React from 'react'

import { base } from './base'

class PropriedadeDetalhes extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      propriedade: {}
    }
  }

  componentDidMount() {
    base.fetch(`/propriedades/${this.props.match.params.id}`, {
      context: this,
      state: 'propriedades',
      asArray: false,
      then: ( data ) => {
        
        if(data.matricula) {
          this.setState({
            propriedade: data
          })
        }else {
          alert('Propriedade não encontrada!')
        }
      }
    })
  }

  render() {

    return (
      <div className='flex row'>
        <div className='flex column vertical-align-row list-wrapper'>
          <h2>Nome da propriedade: {this.state.propriedade.nome_propriedade}</h2>
          <h3>Matrícula da propriedade: {this.state.propriedade.matricula}</h3>
          <h3>Tamanho da propriedade: {this.state.propriedade.tamanho}</h3>
        </div>
      </div>
    )
  }
}

export default PropriedadeDetalhes
