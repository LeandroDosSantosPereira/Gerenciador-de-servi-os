	import React, { Component } from 'react'

	import { base } from './base'
	import InputField from './InputField'
	import './chamado.css'
	import { Object } from 'core-js';
    import Sidebar from './Sidebar';

	export default class chamadoPage extends Component {
	constructor(props) {
	super(props)

	this.search = ''

	this.state = {
	  chamados: [],
	  clientes: [],
	  handle: this.handleSave,
	  key: null,
	  search: null
	}

	this.handlechamados = this.handlechamados.bind(this)
	this.handleRemove = this.handleRemove.bind(this)
	this.handleSave = this.handleSave.bind(this)
	this.handleFetch = this.handleFetch.bind(this)
	}

	componentDidMount() {
	base.syncState('chamados', {
	  context: this,
	  state: 'chamados',
	  asArray: true,
	  queries: {
		orderByChild: 'titulo_chamado'
	  }
	})

	base.syncState('clientes', {
	  context: this,
	  state: 'clientes',
	  asArray: true,
	  queries: {
		orderByChild: 'nome'
	  }
	})
	}

	handleFetch(posicao) {
	console.log(posicao)
	this.titulo_chamado.value = this.state.chamados[posicao].titulo_chamado
	this.cpf_cnpj.value = this.state.chamados[posicao].cpf_cnpj
	this.cliente.value = this.state.chamados[posicao].cliente
	this.setState({
	  handle: this.handleUpdate,
	  key: this.state.chamados[posicao].key,
	  isUpdating: true
	})
	}

	handlechamados(key, chamado) {		
		return (	
		<tr key={key}>
				<td>{chamado.titulo_chamado}</td>
				<td>{chamado.cpf_cnpj}</td>
				<td>{chamado.no}</td>
				<td className="actions">
						<button id ="bt1"   href="edit.html" onClick={() => this.handleFetch(key)}>Editar</button>
						<button id ="bt2"   onClick={() => this.handleRemove(key)}  href="#" data-toggle="modal" data-target="#delete-modal">Excluir</button>
			    </td>
		</tr>
	  
		)
	}

	handleRemove(key) {
	base.remove('chamados/' + this.state.chamados[key].key, error => {
	  console.log(error)
	})
	}

	handleSave(event, valor) {
		var e = document.getElementById("cliente");
		var itemSelecionado = e.options[e.selectedIndex].text;

	event.preventDefault()
  const titulo_chamado = this.titulo_chamado.value
	const cpf_cnpj = this.cpf_cnpj.value
	const cliente =this.cliente.value
	const no =itemSelecionado
	let chamado = ''
	this.state.key ?
	  base.update('chamados/' + this.state.key, {
		data: { titulo_chamado, cpf_cnpj,cliente,no },
		then: error => {
		  if (!error) {
			this.setState({
			  handle: this.handleSave,
			  key: null,
			  isUpdating: false
			})
		  }
		}
	  })
	  :
	  chamado = base.push('chamados', {
		data: {
		  titulo_chamado,
			cpf_cnpj,
			cliente,
			no,
		  clientes: {
			[this.state.clientes[cliente].key]: this.state.clientes[cliente].nome
		  }
		}
	  })

	console.log(this.state.clientes[cliente].key)
	const chamados = {
	  [chamado.key]: titulo_chamado
	}
	base.update('clientes/' + this.state.clientes[cliente].key, {
	  data: {
		chamados
	  }
	})

	this.titulo_chamado.value = ''
	this.cpf_cnpj.value = ''
	this.cliente.value = ''
	

	}

	handleSearch = () => {
	this.setState({
	  search: this.search.value
	})
	}

	handleCarregarclientesNoOption = (posicao) => {
	const cliente = this.state.clientes[posicao]
	return (
	  <option key={posicao} value={posicao}>{cliente.nome}</option>
	)
	}

  valor() {
		var e = document.getElementById("cliente");
		var itemSelecionado = e.options[e.selectedIndex].text;
		
	}

     

	
    

	render() {
		
	console.log(this.search)
	return (  
	  <div className='container'>
	   <Sidebar/>
		 
		<form onSubmit={this.handleSave} className='form-group col-md-6'>

		  <div id="esp"></div>
       <h4>Gerenciar serviços</h4>
		  <InputField refValue={ref => this.titulo_chamado = ref}
			typeValue="text"
			idValue="titulo_chamado"
			requiredValue={true}
			labelText='Nome do serviço'
			spanWidth='120px' />

		  <InputField
			refValue={ref => this.cpf_cnpj = ref}
			typeValue="text"
			idValue="cpf_cnpj"
			requiredValue={true}
			labelText='Descrição'
			spanWidth='80px' />
		  
		   
		  <select ref={ref => this.cliente = ref} name="cliente" id="cliente" required={true}>
            {
		
			  Object
				.keys(this.state.clientes)
				.map(posicao => this.handleCarregarclientesNoOption(posicao))
			
			}
			
		  </select>
		  
		  <div>
		  <button className='btn btn-primary' type='submit'> Salvar</button>
			
		 </div>
		 
		</form>

		<div className='container-fluid'>

		  <InputField
			refValue={ref => this.search = ref}
			keyup={this.handleSearch}
			idValue='search'
			typeValue='text'
			requiredValue={true}
			labelText='Pesquisa'
			spanWidth='70px' />
			  
			<div id="list" className=" row col-md-12">

				<div className="table-responsive col-md-12">
					<table className="table table-striped" cellspacing="0" cellpadding="0">
						<thead>
							<tr>
								<th>Nome</th>
								<th>Descrição</th>
								<th>Cliente</th>
								<th className="actions"></th>
							 </tr>
						</thead>
						<tbody>
			 			{			
							Object
							  .keys(this.state.chamados)
							  .map(key => {
								if (this.state.chamados[key].titulo_chamado.indexOf(this.search.value) !== -1) {
								  return this.handlechamados(key, this.state.chamados[key])
								}
								})
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
