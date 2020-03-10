import React from 'react'
import styled from 'styled-components'

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

	atualizaValorEntrada = nomeInput => event => {
		this.setState({
			[nomeInput]: event.target.value
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
		this.geraArrayPagamentos()

	}

	geraArrayPagamentos = () => {
		let arrayPagamentos = []
		Object.keys(this.state.metodoPg).forEach(elemento => {
			if (this.state.metodoPg[elemento] === true) {
				arrayPagamentos.push(`${elemento}`)
			}
		})
		console.log(arrayPagamentos)
	}

	render() {
		console.log(this.state.dadosOk)
		return <Wrapper>
			<h1>Fornecedor</h1>
			<TextField
				required
				error={this.state.inputNomeOK}
				label="Nome do Produto"
				value={this.state.inputNome}
				onChange={this.atualizaValorEntrada('inputNome')}
				margin="normal"
				variant="outlined"
			/>
			<TextField
				required
				error={this.state.inputFotoUrlOK}
				label="Foto do Produto"
				value={this.state.inputFotoUrl}
				onChange={this.atualizaValorEntrada('inputFotoUrl')}
				margin="normal"
				variant="outlined"
			/>
			<TextField
				required
				error={this.state.inputPrecoOK}
				label="Preço"
				value={this.state.inputPreco}
				onChange={this.atualizaValorEntrada('inputPreco')}
				margin="normal"
				variant="outlined"
			/>
			<TextField
				required
				error={this.state.inputQtdParcelasOK}
				label="Número de Parcelas"
				value={this.state.inputQtdParcelas}
				onChange={this.atualizaValorEntrada('inputQtdParcelas')}
				margin="normal"
				variant="outlined"
			/>
			<TextField
				required
				error={this.state.inputCategoriaOK}
				label="Categoria do Produto"
				value={this.state.inputCategoria}
				onChange={this.atualizaValorEntrada('inputCategoria')}
				margin="normal"
				variant="outlined"
			/>
			<TextField
				required
				error={this.state.inputDescricaoOK}
				multiline
				rows="5"
				label="Descrição do Produto"
				value={this.state.inputDescricao}
				onChange={this.atualizaValorEntrada('inputDescricao')}
				margin="normal"
				variant="outlined"
			/>
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
			<Button variant='contained' color='primary' size='large' onClick={this.verificaDados}>
				Cadastrar
			</Button>
		</Wrapper>

	}
}

export default TelaFornecedor