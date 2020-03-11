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
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
margin: auto;
padding: 5px;
grid-column-gap: 40px;
grid-row-gap: 30px;
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
			filtroMin: '',
			filtroMax: ''
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

	render() {

		let listaOrdenada

		let listaNaoFiltrada = this.state.listaDeProdutosState.map((produto, index) => (
			<ConteudoCartao
				key={index}
				id={produto.id}
				category={produto.category}
				price={produto.price}
				description={produto.description}
				paymentMethod={produto.paymentMethod}
				imagem={produto.photos}
				nomeDoProduto={produto.name}
				installments={produto.installments}
			/>
		))

		let listaFiltrada = this.state.listaDeProdutosState.filter(cadaProduto => {
			let filtroBusca  = this.props.inputPesquisa
			let filtroMin = this.state.filtroMin
			let filtroMax = this.state.filtroMax
			let categoria = this.state.categoriaAtualState

			let valorDoProduto = cadaProduto.price

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
				key={index}
				id={produto.id}
				category={produto.category}
				price={produto.price}
				description={produto.description}
				paymentMethod={produto.paymentMethod}
				imagem={produto.photos}
				nomeDoProduto={produto.name}
				installments={produto.installments}
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
							// error={this.state.inputDescricaoOK}
							label="Ordernar Por:"
							// value={this.state.inputDescricao}
							// onChange={}
							margin="normal"
							variant="outlined"
						/>
					{/* 	<TextField
						select
						required
						label="Categoria do Produto"
						name='inputCategoria'
						value={this.state.inputCategoria}
						onChange={this.atualizaValorEntrada}
						SelectProps={{
							native: true, 
						}}
						margin="normal"
						variant="outlined"
					>
						<option hidden value=''></option>
						<option value={'roupas'}>Roupas</option>
						<option value={'artigosDeDecoracao'}>Artigos de decoração</option>
						<option value={'calcados'}>Calçados</option>
						<option value={'eletronicos'}>Eletrônicos</option>
						<option value={'moveis'}>Móveis</option>
					</TextField> */}
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