import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './chamado.css'
import { base } from './base'
import InputField from './InputField'
import Sidebar from './Sidebar'

export default class clientePage extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      clientes: [], // estado armazena os dados do bd
      chamados:[],
      chave: ''
    }
  }

  componentDidMount() {
    // sincroniza com a pasta clientes de realtime database no firebase com a app
    base.syncState('clientes', {
      context: this,
      state: 'clientes',
      asArray: true
    })
  }

    // pega os dados do item selecionado e coloca no formulário
  handleGet = (cliente) => {
    this.nome.value = cliente.nome
    this.entidade.value = cliente.entidade
    this.sobrenome.value = cliente.sobrenome
    this.setState({
      chave: cliente.key
    })
  }

  // método para salvar as informações da cliente no bd
  handleSave = ( event ) => {
    // interrompe o fluxo padrão de envio
    event.preventDefault()
    // peagando os dados dos campos
    const nome = this.nome.value
    const entidade = this.entidade.value
    const sobrenome = this.sobrenome.value
    let data = new Date();
    data = data.getFullYear() ;    

    this.state.chave ?
      base.update('clientes/' + this.state.chave, {
        data:{
          nome,
          entidade,
          sobrenome,
          data
        },
        then: () => {
          this.setState({
            chave: ''
          })
        }
      })
    :
      base.push('clientes', {
        data:{
          nome,
          entidade,
          sobrenome,
          data
        }
      })
    
    this.nome.value = ''
    this.entidade.value = ''
    this.sobrenome.value = ''
    
  }

  // exclui o item selecionado
  handleRemove = ( chave ) => {
    base.remove('clientes/' + chave, error => {
      console.log(error)
    })
  }

  // lista todas as clientes
  handleclientes = ( clientes ) => {
    console.log(clientes)
    return (
	  <tr key={clientes.key}>
				<td>{clientes.nome}</td>
				<td>{clientes.sobrenome}</td>
				<td>{clientes.entidade}</td>
                {/* <td>{clientes.data}</td> */}
				<td className="actions">
						<button id ="bt1"  href="edit.html" onClick={ () => this.handleGet( clientes ) }>Editar</button>
						<button id ="bt2"  onClick={ () => this.handleRemove( clientes.key ) }  href="#" data-toggle="modal" data-target="#delete-modal">Excluir</button>
			    </td>
		</tr>
    )
  }

  render() {
    return (
      <div className='container-fluid'>
       <Sidebar/>
        {/* Formulário de cadastro e edição */}
        <form onSubmit={ this.handleSave } className='form-group col-md-6'>
        <div id="esp"></div>
        <h4>Gerenciar clientes</h4>
          {/* nome */}
          <InputField
            refValue={ref => this.nome = ref}
            typeValue="text"
            idValue="nome"
            requiredValue={true}
            labelText='Nome'
            spanWidth='80px' />
   
          {/* nome */}
          <InputField
            refValue={ref => this.sobrenome = ref}
            typeValue="text"
            idValue="sobrenome"
            requiredValue={true}
            labelText='Endereço'
            spanWidth='120px' />
            {/* entidade */}
          <InputField
            refValue={ref => this.entidade = ref}
            typeValue="text"
            idValue="entidade"
            requiredValue={true}
            labelText='Telefone'
            spanWidth='130px' />
            
            <button className='btn btn-primary' type='submit'>Salvar</button>
        </form>
		   <div className='container'>
			<div id="list" className=" row col-md-12">

				<div className="table-responsive col-md-12">
					<table className="table table-striped" cellspacing="0" cellpadding="0">
						<thead>
							<tr>					
              	<th>Nome</th>
								<th>Endereço</th>
								<th>Telefone</th>
							
								<th className="actions"></th>
							 </tr>
						</thead>
						<tbody>
							{ 
								Object.keys( this.state.clientes ).map( ( chave ) => 
                { return this.handleclientes( this.state.clientes[chave] ) } )
							}
						</tbody>
					 </table>			 
				 </div>
			 </div> 
		</div>
      </div>
    )
  }
}
