import React from 'react'

import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import TelaHome from './TelaHome';
import TelaConsumidor from './TelaConsumidor';
import TelaFornecedor from './TelaFornecedor';

const styles = {
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
};

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

		const botoesHome = (
			<div>
				<Button color='secondary' onClick={() => this.mudaBotao('consumidor')}>
					Consumidor
				</Button>
				<Button color='secondary' onClick={() => this.mudaBotao('fornecedor')}>
					Fornecedor
				</Button>
			</div>
		)

		const botoesConsumidor = (
			<div>
				<Button color='secondary' onClick={() => this.mudaBotao('home')}>Home</Button>
			</div>
		)

		const botoesFornecedor = (
			<div>
				<Button color='secondary' onClick={() => this.mudaBotao('home')}>Home</Button>
			</div>
		)

		let botoes
		let telaAtual
		switch (this.state.botaoAtual) {
			case 'home':
				botoes = botoesHome
				telaAtual = <TelaHome funcao={this.mudaBotao}/>
				break;
			case 'consumidor':
				botoes = botoesConsumidor
				telaAtual = <TelaConsumidor/>
				break;
			case 'fornecedor':
				botoes = botoesFornecedor
				telaAtual = <TelaFornecedor/>
				break
			default:
				botoes = botoesHome
				telaAtual = <TelaHome funcao={this.mudaBotao}/>
				break;
		}

		const { classes } = this.props;

		return <div>
			<AppBar position='static' color='primary'>
				<Toolbar>
					<img src={require('../img/logo.png')} width='50'/>
					<Typography variant="h6" color="inherit" className={classes.grow} />
					{botoes} 
				</Toolbar>
			</AppBar>
			
			{telaAtual}

		</div>

	}
}

export default withStyles(styles)(AppContainer);
