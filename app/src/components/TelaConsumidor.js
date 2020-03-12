import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ConteudoCartao from './ConteudoCartao';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
`

const MainDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
`

const ValuesContainer = styled.div`
display:flex;
flex-direction: column;
padding: 1vh 1vw;
align-items: center;
`

const CardsContainer = styled.div`
display: flex;
flex-wrap:wrap;
margin: auto;
padding: 5px;
`

const CategoryFilterDiv = styled.div`
border-radius: 30px;
display: flex;
justify-content: space-evenly;
width: 80vw;
margin-bottom: 8vh;
padding: 1vh 1vw;
`

const baseURL = `https://us-central1-future-apis.cloudfunctions.net/fourUsed`

class TelaConsumidor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			listaDeProdutosState: [],
			categoriaAtualState: '',
			idCardAtivo:'',
			filtroMin: '',
			filtroMax: '',
			ordem: '',
			carrinho: []
		}
	}

	componentDidMount(){
		//executa a funcao pegarProdutos quando a TelaConsumidor abre, mostrando todos os produtos
		//dentro do grid
		this.pegarProdutos()
	}

	pegarProdutos = async () =>{
		try{	
			const response = await axios.get(`${baseURL}/products`)
			//A linha acima pega a informacao do GET da API

			const listaDeProdutosVar = response.data.products
			//Definida uma variavel para armazenar as informacoes dentro do Response -> Data -> Products
			//Exatamente onde estao os dados dos produtos da API

			this.setState({
				listaDeProdutosState: listaDeProdutosVar
				//Pega as informacoes do response.data.products e as armazena no state, para podermos
				//as utilizar com menos chance de erros.
			})
		}
		catch(error){
			console.log(error)
			alert("Houve um erro na busca dos produtos.")
		}
	}

	atulizaCardAtivo = (id) =>{
		this.setState({
			idCardAtivo:id
		})
	}

	escolherCategoria = (categoria) => {
		this.setState({
			categoriaAtualState: categoria,
		})
	}

	mudouFiltroMinimo = (event) => {
		this.setState({
			filtroMin: event.target.value
		})
	}

	mudouFiltroMaximo = (event) => {
		this.setState({
			filtroMax: event.target.value
		})
	}

	mudaOrdenacao = (event) => {
		this.setState({
			ordem: event.target.value
		})
	}

	adicionaProduto = (produtoAdicionado) => {
		const copiaCarrinho = [...this.state.carrinho]

		// checo se o produto tá no carrinho
		const produtoEstaNoCarrinho = this.state.carrinho.findIndex(cadaProduto =>
			cadaProduto.produtoAdicionado.id === produtoAdicionado.id)

		// se já tá no carrinho, só adiciono 1 na quantidade (paramentro novo que to criando)
		if (produtoEstaNoCarrinho > -1) {
			copiaCarrinho[produtoEstaNoCarrinho].quantidade += 1
		} else { // se é a primeira vez
			copiaCarrinho.push({
				produtoAdicionado: produtoAdicionado,
				quantidade: 1
			})
		}

		this.setState({
			carrinho: copiaCarrinho, // atualiza conteudo do carrinho no estado
		})
		this.props.mudaCarrinho(copiaCarrinho)
}

	render() {

		let listaOrdenada
		if (this.state.ordem === 'crescente') {
			listaOrdenada = this.state.listaDeProdutosState.sort(function (a, b) {
				return a.price < b.price ? -1 : a.price > b.price ? 1 : 0
			})
		} else if (this.state.ordem === 'decrescente') {
			listaOrdenada = this.state.listaDeProdutosState.sort(function (a, b) {
				return a.price < b.price ? 1 : a.price > b.price ? -1 : 0
			})
		} else if (this.state.ordem === 'nomeZA') {
			listaOrdenada = this.state.listaDeProdutosState.sort(function (a, b) {
				return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 0
			})
		} else if (this.state.ordem === 'nomeAZ') {
			listaOrdenada = this.state.listaDeProdutosState.sort(function (a, b) {
				return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0
			})
		}
		else if (this.state.ordem === 'categoriaZA') {
			listaOrdenada = this.state.listaDeProdutosState.sort(function (a, b) {
				return a.category < b.category ? 1 : a.category > b.category ? -1 : 0
			})
		} else if (this.state.ordem === 'categoriaAZ') {
			listaOrdenada = this.state.listaDeProdutosState.sort(function (a, b) {
				return a.category < b.category ? -1 : a.category > b.category ? 1 : 0
			})
		}


let lista
		if (listaOrdenada) {
			lista = listaOrdenada
		} else {
			lista = this.state.listaDeProdutosState
		}


		let listaNaoFiltrada = lista.map((produto, index) => (
				<ConteudoCartao
				cadaProduto={produto}				
				key={index}
								id={produto.id}
								category={produto.category}
								price={produto.price}
								description={produto.description}
								paymentMethod={produto.paymentMethod}
								imagem={produto.photos[0]}
								nomeDoProduto={produto.name}
								installments={produto.installments}
								cardAtivo={this.state.idCardAtivo}
								funcaoCardAtivo={this.atulizaCardAtivo}
								adicionaProduto={this.adicionaProduto}
							/>
		))

		let listaFiltrada = lista.filter(cadaProduto => {
			let filtroBusca  = this.props.inputPesquisa
			let filtroMin = this.state.filtroMin
			let filtroMax = this.state.filtroMax
			let categoria = this.state.categoriaAtualState

			let valorDoProduto = Number(cadaProduto.price)

			// 	TODOS OS FILTROS
			if (filtroBusca && filtroMin && filtroMax && categoria) {
				return (
					cadaProduto.name.toLowerCase().includes((filtroBusca).toLowerCase()) &&
					valorDoProduto >= filtroMin &&
					valorDoProduto <= filtroMax &&
					cadaProduto.category.includes(categoria)
				)
			}

			// TRÊS
			if (filtroBusca && filtroMin && filtroMax) {
				return (
					cadaProduto.name.toLowerCase().includes((filtroBusca).toLowerCase()) &&
					valorDoProduto >= filtroMin &&
					valorDoProduto <= filtroMax
				)
			}

			if (filtroBusca && filtroMin && categoria) {
				return (
					cadaProduto.name.toLowerCase().includes((filtroBusca).toLowerCase()) &&
					valorDoProduto >= filtroMin &&
					cadaProduto.category.includes(categoria)
				)
			}

			if (filtroBusca && filtroMax && categoria) {
				return (
					cadaProduto.name.toLowerCase().includes((filtroBusca).toLowerCase()) &&
					valorDoProduto <= filtroMax &&
					cadaProduto.category.includes(categoria)
				)
			}

			if (filtroMin && filtroMax && categoria) {
				return (
					valorDoProduto >= filtroMin &&
					valorDoProduto <= filtroMax &&
					cadaProduto.category.includes(categoria)
				)
			}

			// DOIS

			if (filtroBusca && filtroMin) {
				return (
					cadaProduto.name.toLowerCase().includes((filtroBusca).toLowerCase()) &&
					valorDoProduto >= filtroMin
				)
			}
			if (filtroBusca && filtroMax) {
				return (
					cadaProduto.name.toLowerCase().includes((filtroBusca).toLowerCase()) &&
					valorDoProduto <= filtroMax
				)
			}
			if (filtroBusca && categoria) {
				return (
					cadaProduto.name.toLowerCase().includes((filtroBusca).toLowerCase()) &&
					cadaProduto.category.includes(categoria)
				)
			}
			if (filtroMin && filtroMax) {
				return (
					valorDoProduto >= filtroMin &&
					valorDoProduto <= filtroMax)
			}
			if (filtroMin && categoria) {
				return (
					valorDoProduto >= filtroMin &&
					cadaProduto.category.includes(categoria)
				)
			}
			if (filtroMax && categoria) {
				return (
					valorDoProduto <= filtroMax &&
					cadaProduto.category.includes(categoria)
				)
			}

			// SÓ UM
			if (filtroBusca) {
				return cadaProduto.name.toLowerCase().includes((filtroBusca).toLowerCase())
			}
			if (filtroMin) {
				return valorDoProduto >= filtroMin
			}
			if (filtroMax) {
				return valorDoProduto <= filtroMax
			}
			if (categoria) {
				return (
					cadaProduto.category.includes(categoria)
				)
			}


			return listaNaoFiltrada
		}).map((produto, index) => (
				<ConteudoCartao
				cadaProduto={produto}				
				key={index}
								id={produto.id}
								category={produto.category}
								price={produto.price}
								description={produto.description}
								paymentMethod={produto.paymentMethod}
								imagem={produto.photos[0]}
								nomeDoProduto={produto.name}
								installments={produto.installments}
								cardAtivo={this.state.idCardAtivo}
								funcaoCardAtivo={this.atulizaCardAtivo}
								adicionaProduto={this.adicionaProduto}
							/>
		))

		let listaDeItens
		if (this.state.categoriaAtualState || this.state.filtroMin || this.state.filtroMax || this.props.inputPesquisa) {
			listaDeItens = listaFiltrada
		} else {
			listaDeItens = listaNaoFiltrada
		}

		return (
			<Wrapper>
				<CategoryFilterDiv>
					<Button onClick={()=> this.escolherCategoria("roupas")} variant="contained" color="secondary" size="large">Roupas</Button>
					<Button onClick={()=> this.escolherCategoria("artigosDeDecoracao")} variant="contained" color="secondary" size="large">Artigos de decoração</Button>
					<Button onClick={()=> this.escolherCategoria("calcados")} variant="contained" color="secondary" size="large">Calçados</Button>
					<Button onClick={()=> this.escolherCategoria("eletronicos")} variant="contained" color="secondary" size="large">Eletrônicos</Button>
					<Button onClick={()=> this.escolherCategoria("moveis")} variant="contained" color="secondary" size="large">Móveis</Button>
				</CategoryFilterDiv>

				<MainDiv>
					<ValuesContainer>
						<TextField
							// error={this.state.inputDescricaoOK}
							label="Valor Mínimo:"
							value={this.state.filtroMin}
							onChange={this.mudouFiltroMinimo}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							// error={this.state.inputDescricaoOK}
							label="Valor Máximo:"
							value={this.state.filtroMax}
							onChange={this.mudouFiltroMaximo}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							select
							label="Ordenar por"
							name='ordem'
							value={this.state.ordem}
							onChange={this.mudaOrdenacao}
							SelectProps={{
								native: true,
							}}
							margin="normal"
							variant="outlined"
						>
							<option hidden value=''></option>
							<option value={'crescente'}>Menor Preço</option>
							<option value={'decrescente'}>Maior Preço</option>
							<option value={'nomeAZ'}>Nome (A -Z)</option>
							<option value={'nomeZA'}>Nome (Z - A)</option>
							<option value={'categoriaAZ'}>Categoria (A -Z)</option>
							<option value={'categoriaZA'}>Categoria (Z - A)</option>
							
							{/* <option value={'moveis'}>Móveis</option> */}
</TextField>
					
					</ValuesContainer>

					<CardsContainer>
						{listaDeItens}
					</CardsContainer>
				</MainDiv>

			</Wrapper>
		)
	}
}

export default TelaConsumidor;