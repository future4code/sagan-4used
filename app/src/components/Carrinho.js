import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
`

class Carrinho extends React.Component{
	
	render() {
		console.log(this.props.conteudoCarrinho)

		return <Wrapper>
			<h1>Carrinho</h1>
		</Wrapper>
	}
}

export default Carrinho