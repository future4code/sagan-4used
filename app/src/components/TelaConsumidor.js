import React from 'react'
import styled from 'styled-components'

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import Carrinho from './Carrinho';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
`

const ButtonCart = styled(Button)`
	position: fixed;
	top: 1;
	right: 2vw;
`

const DivComCarrinho = styled.div`
	display: flex;
	flex-direction: row-reverse;

	@media screen and (max-device-width: 1200px) {
		flex-direction: column;
  	}
`

const DivSeCarrinho = styled.div`
	display: flex;
	min-width: 80vw;
`


class TelaConsumidor extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			carrinho: false
		}
	}

	apareceDesapareceCarrinho = () => {
		this.setState({ carrinho: !this.state.carrinho})
	}

	render() {
		return <Wrapper>
			<ButtonCart 
				color='secondary' 
				variant='fab'
				onClick={this.apareceDesapareceCarrinho} 
			>
				<Icon>shopping_cart</Icon>
			</ButtonCart>

			<h1>Consumidor</h1>

			<DivComCarrinho>
				{this.state.carrinho && <Carrinho/>}
			
				<DivSeCarrinho>
					QQ coisa
				</DivSeCarrinho>

			</DivComCarrinho>



		</Wrapper>
	}
}

export default TelaConsumidor