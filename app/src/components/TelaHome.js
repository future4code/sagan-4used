import React from 'react'
import styled from 'styled-components'

import Button from '@material-ui/core/Button';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
`

const LogoPrincipal = styled.img`
	width: 20%;
	@media screen and (max-device-width: 1200px) {
		width: 40%;
  	}
	@media screen and (max-device-width: 800px) {
		width: 60%;
  	}
`

const DivDosBotoes = styled.div`
	display: flex;
	width: 60%;
	justify-content: space-between;

	@media screen and (max-device-width: 1200px) {
		width: 80%;
  	}
`

function TelaHome(props) {

	return (<Wrapper>

		<LogoPrincipal src={require('../img/logo2.png')} alt='Logo'/>

		<DivDosBotoes>
			<Button  variant='contained' color='primary' onClick={() => props.funcao('consumidor')}>
				Consumidor
			</Button>
			<Button variant='contained' color='primary' onClick={() => props.funcao('fornecedor')}>
				Fornecedor
			</Button>
		</DivDosBotoes>

	</Wrapper>)

}

export default TelaHome;