import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
`
const DivSuperior = styled.div`
display: flex;
margin: 2rem;
`
const DivTextField = styled.div`
display: flex;
flex-direction: column;
margin-right: 2vw;
width: 100%;
`
const DivForm = styled.div`
display: flex;
flex-direction: column;
margin: auto;
`


class TelaFornecedor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			inputNome: '',
			inputFotoUrl: '',
			inputPreco: '',
			inputQtdParcelas: '',
			inputCategoria: '',
			inputDescricao: '',
			metodoPgArray:[],

			inputNomeOK: false,
			inputFotoUrlOK: false,
			inputPrecoOK: false,
			inputQtdParcelasOK: false,
			inputCategoriaOK: false,
			inputDescricaoOK: false,

			metodoPg: {
				boleto: false,
				transferencia: false,
				payPal: false,
				dinheiro: false,
				cartaoCredito: false,
			},
			metodoPgOk: false,
			dadosOk: false
		}
	}

	atualizaValorEntrada = event => {
			this.setState({
			[event.target.name]: event.target.value
		})
	}

	atualizaCheckBox = nomeInput => event => {
		let metodoPgcp = this.state.metodoPg
		Object.keys(metodoPgcp).forEach(elemento => {
			if (elemento === nomeInput) {
				metodoPgcp[elemento] = event.target.checked
			} else {
				metodoPgcp[elemento] = metodoPgcp[elemento]
			}
		})
		this.setState({
			metodoPg: metodoPgcp
		})
	}

	verificaDados = () => {
		let dadosOk = true
		Object.keys(this.state).forEach(elemento => {
			if ((elemento.indexOf('input') !== -1) && (elemento.indexOf('OK') === -1)) {
				if (this.state[elemento] === '') {
					dadosOk = false
					this.setState({
						[`${elemento}OK`]: true
					})
				} else {
					this.setState({
						[`${elemento}OK`]: false

					})
				}
			}
		})
		let erroCheckBox = true
		Object.keys(this.state.metodoPg).forEach(elemento => {
			if (this.state.metodoPg[elemento] === true) {
				erroCheckBox = false
			}
		})
		dadosOk = (dadosOk && !erroCheckBox) ? true : false
		this.setState({
			metodoPgOk: erroCheckBox,
			dadosOk: dadosOk
		})

		console.log(dadosOk)
		if (dadosOk){
			this.geraArrayPagamentos()
		} else {
			window.alert('Preencha todos os dados')
		}
	}

	geraArrayPagamentos = () => {
		let arrayPagamentos = []
		Object.keys(this.state.metodoPg).forEach(elemento => {
			if (this.state.metodoPg[elemento] === true) {
				arrayPagamentos.push(`${elemento}`)
			}
		})
		this.criaRegistroProduto(arrayPagamentos)
		console.log(arrayPagamentos)
	}

	criaRegistroProduto = (arrayPagamento) =>{
		let dataToSend = {
			name:this.state.inputNome,
			description: this.state.inputDescricao,
			price: Number(this.state.inputPreco),
			paymentMethod: arrayPagamento,
			category: this.state.inputCategoria,
			photos:[this.state.inputFotoUrl],
			installments:Number(this.state.inputQtdParcelas)
		}

		const request = axios.post('https://us-central1-future-apis.cloudfunctions.net/fourUsed/products',dataToSend)
		request.then(response => {
			console.log(response.status)
      console.log(response.statusText)
      window.alert('Produto cadastrado com sucesso!')
		}).catch(error=> {
			console.log(error.response.status)
      console.log(error.response.data.message)
		})
	}


	render() {
		console.log(this.state.dadosOk)
		return <Wrapper>
			<h1>Fornecedor</h1>
			<DivSuperior>
				<DivTextField>
					<TextField
						name="inputNome"
						required
						error={this.state.inputNomeOK}
						label="Nome do Produto"
						value={this.state.inputNome}
						onChange={this.atualizaValorEntrada}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						name='inputFotoUrl'
						required
						error={this.state.inputFotoUrlOK}
						label="Foto do Produto"
						value={this.state.inputFotoUrl}
						onChange={this.atualizaValorEntrada}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						name='inputPreco'
						required
						error={this.state.inputPrecoOK}
						label="Preço"
						value={this.state.inputPreco}
						onChange={this.atualizaValorEntrada}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						name='inputQtdParcelas'
						required
						error={this.state.inputQtdParcelasOK}
						label="Número de Parcelas"
						value={this.state.inputQtdParcelas}
						onChange={this.atualizaValorEntrada}
						margin="normal"
						variant="outlined"
					/>
					<TextField
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
					</TextField>

					<TextField
						name='inputDescricao'
						required
						error={this.state.inputDescricaoOK}
						multiline
						rows="5"
						label="Descrição do Produto"
						value={this.state.inputDescricao}
						onChange={this.atualizaValorEntrada}
						margin="normal"
						variant="outlined"
					/>
				</DivTextField>
				<DivForm>
					<FormControl required error={this.state.metodoPgOk} component="fieldset">
						<FormLabel component="legend">Formas de Pagamento</FormLabel>
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox checked={this.state.metodoPg.boleto} onChange={this.atualizaCheckBox('boleto')} value="metodoPg.boleto" />
								}
								label="Boleto"
							/>
							<FormControlLabel
								control={
									<Checkbox checked={this.state.metodoPg.transferencia} onChange={this.atualizaCheckBox('transferencia')} value="metodoPg.transferência" />
								}
								label="Transferência Eletrônica"
							/>
							<FormControlLabel
								control={
									<Checkbox checked={this.state.metodoPg.payPal} onChange={this.atualizaCheckBox('payPal')} value="metodoPg.PayPal" />
								}
								label="PayPal"
							/>
							<FormControlLabel control={
								<Checkbox checked={this.state.metodoPg.dinheiro} onChange={this.atualizaCheckBox('dinheiro')} value="metodoPg.dinheiro" />
							}
								label="Dinheiro*">

							</FormControlLabel>
							<FormControlLabel
								control={
									<Checkbox checked={this.state.metodoPg.cartaoCredito} onChange={this.atualizaCheckBox('cartaoCredito')} value="metodoPg.cartaoCredito" />
								}
								label="Cartão de Crédito"
							/>
						</FormGroup><FormHelperText>*CUIDADO: Pagamentos em dinheiro exigem encontro pessoal </FormHelperText>
					</FormControl>
				</DivForm>
			</DivSuperior>
			<Button variant='contained' color='primary' size='large' onClick={this.verificaDados}>
				Cadastrar
			</Button>
		</Wrapper>

	}
}

export default TelaFornecedor