import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
`

class TelaFornecedor extends React.Component{
	render() {
		return <Wrapper>
			<h1>Fornecedor</h1>
		</Wrapper>
	}
}

export default TelaFornecedor