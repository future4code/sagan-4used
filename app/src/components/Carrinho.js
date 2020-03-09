import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid black;
	padding: 1rem;
`

class Carrinho extends React.Component{
	
	render() {
		return <Wrapper>
			<h3>Carrinho</h3>
		</Wrapper>
	}
}

export default Carrinho