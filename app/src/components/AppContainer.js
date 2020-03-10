import React from 'react'

import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';

import TelaHome from './TelaHome';
import TelaConsumidor from './TelaConsumidor';
import TelaFornecedor from './TelaFornecedor';
import Carrinho from './Carrinho';


const styles = theme => ({
	grow: {
		flexGrow: 1
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit,
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 120,
			'&:focus': {
				width: 200,
			},
		},
	},
});

class AppContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			botaoAtual: ''
		}
	}

	mudaBotao = (pagina) => {
		this.setState({ botaoAtual: pagina })
	}

	render() {

		const { classes } = this.props;

		const botoesConsumidor = (
			<>
				<div className={classes.grow} />
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder="Pesquisar..."
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
					/>
				</div>
				<div className={classes.grow} />
				<div>
					<Button color='secondary' onClick={() => this.mudaBotao('carrinho')}>Carrinho</Button>
					<Button color='secondary' onClick={() => this.mudaBotao('home')}>Home</Button>
				</div>
			</>
		)

		const botoesFornecedor = (
			<>
				<div className={classes.grow} />
				<div>
					<Button color='secondary' onClick={() => this.mudaBotao('home')}>Home</Button>
				</div>
			</>
		)

		const botoesCarrinho = (
			<>
				<div className={classes.grow} />
				<div>
					<Button color='secondary' onClick={() => this.mudaBotao('consumidor')}>VOLTAR</Button>
				</div>
			</>
		)

		let botoes
		let telaAtual
		switch (this.state.botaoAtual) {
			case 'home':
				telaAtual = <TelaHome funcao={this.mudaBotao} />
				break;
			case 'consumidor':
				botoes = botoesConsumidor
				telaAtual = <TelaConsumidor />
				break;
			case 'fornecedor':
				botoes = botoesFornecedor
				telaAtual = <TelaFornecedor />
				break
			case 'carrinho':
				botoes = botoesCarrinho
				telaAtual = <Carrinho />
				break
			default:
				telaAtual = <TelaHome funcao={this.mudaBotao} />
				break;
		}



		return <div>
			<AppBar position='static' color='primary'>
				<Toolbar>
					<img src={require('../img/logo.png')} width='50' />
					{botoes}
				</Toolbar>
			</AppBar>

			{telaAtual}

		</div>

	}
}

export default withStyles(styles)(AppContainer);
